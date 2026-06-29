<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Programm</h2>
    <USeparator color="primary" class="mb-4"/>

    <div class="mb-4 flex flex-col sm:flex-row gap-3 items-end">
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
      <div v-if="!pending && rows.length > 0" class="lg:max-w-3xl">
        <!-- Upcoming entries: chronological, so the next one in the future sits on top.
             Hidden entirely (incl. the column header) when nothing is upcoming. -->
        <template v-if="upcomingRows.length">
          <!-- Header row (desktop only) -->
          <div :class="rowGrid" class="hidden md:grid px-2 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 border-b border-neutral-300">
            <div class="truncate">Titel</div>
            <div>Tag</div>
            <div>Datum</div>
            <div>Zeit</div>
            <div class="truncate">Bühne</div>
          </div>

          <ProgrammEntryRow
              v-for="row in upcomingRows"
              :key="row.key"
              :row="row"
              :grid-class="rowGrid"
          />
        </template>

        <!-- Past entries, grouped separately and shown most-recent first. -->
        <template v-if="pastRows.length">
          <h3 class="mt-8 mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">Vergangene</h3>
          <ProgrammEntryRow
              v-for="row in pastRows"
              :key="row.key"
              :row="row"
              :grid-class="rowGrid"
              past
          />
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {AttractionRefDTO, ProgrammEntryDTO, ProgrammPointDTO} from '~~/shared/types/rest'
import formatDate from '~/utils/format-date'

// Shared column template so the header and every row align (Titel · Tag · Datum · Zeit · Bühne).
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
const upcomingRows = computed(() => rows.value.filter(r => !r.entry.past))
const pastRows = computed(() => rows.value.filter(r => r.entry.past).reverse())

useSeoMeta({
  title: 'Programm · Schliere lacht',
  description: 'Programm und Auftritte am Schlierefäscht.',
})
</script>
