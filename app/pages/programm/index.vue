<template>
  <div class="p-4 md:p-6 max-w-5xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Programm</h2>
    <USeparator color="primary" class="mb-4"/>

    <p class="prose text-neutral-700 max-w-5xl text-sm leading-relaxed">
      Das Programm Schlierefäscht 2027 entsteht Schritt um Schritt. Alle definitiv
      gebuchten Konzerte und Events werden fortlaufend auf unserer Webseite
      aufgeschaltet. Sehr gerne weisen wir auch an dieser Stelle darauf hin, dass der <strong>Zutritt zu
      sämtlichen Konzerten kostenlos ist und keine Tickets für den Eintritt benötigt werden</strong>.
      Das wird ermöglicht durch die grosszügige Unterstützung der Stadt Schlieren und
      unserer grossen
      <NuxtLink to="/sponsoren">Sponsorenfamily.</NuxtLink>
      Ihnen allen gilt unser grosser Dank.
    </p>

    <div class="my-4 flex flex-col sm:flex-row gap-3 items-end">
      <USelect
          v-model="selectedDate"
          value-key="id"
          label-key="name"
          :items="dateOptions"
          placeholder="Filter nach Datum"
          class="w-full sm:w-56"
      />
      <USelect
          v-model="selectedStage"
          value-key="id"
          label-key="name"
          :items="stageOptions"
          placeholder="Filter nach Bühne"
          class="w-full sm:w-56"
      />
      <UButton
          v-if="selectedDate || selectedStage"
          variant="ghost"
          icon="i-lucide-x"
          @click="resetFilters"
      />
    </div>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Daten.</div>
    <div v-else-if="status === 'success' && rows.length === 0" class="text-sm text-neutral-500">Keine Einträge gefunden.</div>

    <LoadingSpinner v-if="status === 'pending' || status === 'idle'"/>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="!pending && rows.length > 0">
        <!-- Upcoming entries: chronological, so the next one in the future sits on top.
             No column header — each day divider labels the group instead. -->
        <template v-for="row in upcomingRows" :key="row.key">
          <USeparator v-if="row.newDay" color="primary" position="start" class="mt-6 mb-2">
            <span class="flex items-baseline gap-2 whitespace-nowrap">
              <span class="text-sm font-bold uppercase tracking-wide text-fest-blue">{{ formatWeekday(row.entry.fromDate) }}</span>
              <span class="text-xs text-neutral-500">{{ formatDateShort(row.entry.fromDate) }}</span>
            </span>
          </USeparator>
          <ProgrammEntryRow
              :row="row"
              :grid-class="rowGrid"
          />
        </template>

        <!-- Past entries, grouped separately and shown most-recent first. -->
        <template v-if="pastRows.length">
          <h3 class="mt-8 mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">Vergangene</h3>
          <template v-for="row in pastRows" :key="row.key">
            <USeparator v-if="row.newDay" color="neutral" position="start" class="mt-6 mb-2">
              <span class="flex items-baseline gap-2 whitespace-nowrap text-neutral-400">
                <span class="text-sm font-bold uppercase tracking-wide">{{ formatWeekday(row.entry.fromDate) }}</span>
                <span class="text-xs">{{ formatDateShort(row.entry.fromDate) }}</span>
              </span>
            </USeparator>
            <ProgrammEntryRow
                :row="row"
                :grid-class="rowGrid"
                past
            />
          </template>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {AttractionRefDTO, ProgrammEntryDTO, ProgrammPointDTO} from '~~/shared/types/rest'
import formatDate from '~/utils/format-date'
import formatDateShort from '~/utils/format-date-short'
import formatWeekday from '~/utils/format-weekday'

// Shared column template so every row aligns (Titel · Tag · Datum · Zeit · Bühne).
// Every column is left-aligned (grid items default to start), including Zeit.
const rowGrid = 'grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-x-3 sm:gap-x-4'

const config = useRuntimeConfig()
// The backend pre-joins and chronologically sorts every programm point (date, then
// start time, then attraction name), so we only filter here — no client-side assembly.
const {data, pending, status, error} = useFetch<ProgrammPointDTO[]>(
    `${config.public.apiBaseUrl}/api/programm`,
    {server: false}
)

const selectedDate = ref<string | undefined>(undefined)
const selectedStage = ref<string | undefined>(undefined)

const resetFilters = () => {
  selectedDate.value = undefined
  selectedStage.value = undefined
}

const dateOptions = computed(() => {
  const dates = new Set<string>()
  data.value?.forEach(p => {
    if (p.entry.fromDate) dates.add(p.entry.fromDate)
  })
  return Array.from(dates).sort().map(date => ({id: date, name: formatDate(date)}))
})

const stageOptions = computed(() => {
  const map = new Map<string, string>()
  data.value?.forEach(p => {
    if (p.entry.location) map.set(p.entry.location.externalId, p.entry.location.name)
  })
  return Array.from(map.entries())
      .map(([id, name]) => ({id, name}))
      .sort((a, b) => a.name.localeCompare(b.name))
})

interface ProgrammRow {
  key: string
  attraction: AttractionRefDTO
  entry: ProgrammEntryDTO
}

// Flags the first row of each day so the template can slip a day divider in front of it.
// Runs after the past/upcoming split (and the past reversal), so the flags follow the order
// the rows are actually rendered in.
function withDayMarkers(list: ProgrammRow[]) {
  let previousDate: string | undefined
  return list.map(row => {
    const newDay = row.entry.fromDate !== previousDate
    previousDate = row.entry.fromDate
    return {...row, newDay}
  })
}

// Apply the active date/stage filters to the already-sorted programm points.
// Each entry is tagged past/upcoming by the backend (ProgrammEntryDTO.past).
const rows = computed<ProgrammRow[]>(() => {
  const result: ProgrammRow[] = []
  for (const point of data.value ?? []) {
    const entry = point.entry
    if (selectedDate.value && entry.fromDate !== selectedDate.value) continue
    if (selectedStage.value && entry.location?.externalId !== selectedStage.value) continue
    result.push({
      key: `${point.attraction.externalId}|${entry.fromDate}|${entry.fromTime ?? ''}|${entry.location.externalId}`,
      attraction: point.attraction,
      entry,
    })
  }
  return result
})

// Upcoming stays in the backend's ascending order (next one first); past is reversed
// so the most recently finished entry sits at the top of its group.
const upcomingRows = computed(() => withDayMarkers(rows.value.filter(r => !r.entry.past)))
const pastRows = computed(() => withDayMarkers(rows.value.filter(r => r.entry.past).reverse()))

useSeoMeta({
  title: 'Programm · Schliere lacht',
  description: 'Programm und Auftritte am Schlierefäscht.',
})
</script>
