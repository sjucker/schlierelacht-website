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

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden.</div>
    <div v-else-if="!pending && rows.length === 0" class="text-sm text-neutral-500">Keine Einträge gefunden.</div>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="!pending && rows.length > 0">
        <!-- Header row -->
        <div :class="rowGrid" class="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 border-b border-neutral-300">
          <div class="truncate">Titel</div>
          <div>Tag</div>
          <div>Datum</div>
          <div>Zeit</div>
          <div class="truncate">Bühne</div>
        </div>

        <!-- Performance rows -->
        <NuxtLink
            v-for="row in rows"
            :key="row.key"
            :to="`/programm/${row.artist.externalId}`"
            :class="rowGrid"
            class="px-2 py-2 text-sm items-center border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
        >
          <div class="font-semibold text-fest-blue truncate">{{ row.artist.name }}</div>
          <div class="text-neutral-600 whitespace-nowrap">{{ weekday(row.entry.fromDate) }}</div>
          <div class="text-neutral-600 whitespace-nowrap">{{ dateOnly(row.entry.fromDate) }}</div>
          <div class="text-neutral-600 whitespace-nowrap">{{ row.entry.fromTime ? formatTime(row.entry.fromTime) : '' }}</div>
          <div class="text-neutral-600 truncate">{{ row.entry.location.name }}</div>
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {AttractionDTO, ProgrammEntryDTO} from '~~/shared/types/rest'
import formatDate from '~/utils/format-date'
import formatTime from '~/utils/format-time'

// Shared column template so the header and every row align (Titel · Tag · Datum · Zeit · Bühne).
const rowGrid = 'grid grid-cols-[2fr_1fr_1fr_auto_1.5fr] gap-x-3 sm:gap-x-4'

const config = useRuntimeConfig()
const {data, pending, error} = useFetch<AttractionDTO[]>(
    `${config.public.apiBaseUrl}/api/artist`,
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
  data.value?.forEach(a => a.programm?.forEach(p => {
    if (p.fromDate) dates.add(p.fromDate)
  }))
  return Array.from(dates).sort().map(date => ({id: date, name: formatDate(date)}))
})

const stageOptions = computed(() => {
  const map = new Map<string, string>()
  data.value?.forEach(a => a.programm?.forEach(p => {
    if (p.location) map.set(p.location.externalId, p.location.name)
  }))
  return Array.from(map.entries())
      .map(([id, name]) => ({id, name}))
      .sort((a, b) => a.name.localeCompare(b.name))
})

interface ProgrammRow {
  key: string
  artist: AttractionDTO
  entry: ProgrammEntryDTO
}

// Flatten every artist's programm entries into one chronologically sorted list of
// performance rows, honouring the active date/stage filters.
const rows = computed<ProgrammRow[]>(() => {
  const result: ProgrammRow[] = []
  for (const artist of data.value ?? []) {
    for (const entry of artist.programm ?? []) {
      if (selectedDate.value && entry.fromDate !== selectedDate.value) continue
      if (selectedStage.value && entry.location?.externalId !== selectedStage.value) continue
      result.push({
        key: `${artist.externalId}|${entry.fromDate}|${entry.fromTime ?? ''}|${entry.location.externalId}`,
        artist,
        entry,
      })
    }
  }
  result.sort((a, b) =>
      a.entry.fromDate.localeCompare(b.entry.fromDate) ||
      (a.entry.fromTime ?? '').localeCompare(b.entry.fromTime ?? '') ||
      a.artist.name.localeCompare(b.artist.name)
  )
  return result
})

// "Tag" column: weekday name, e.g. "Mittwoch".
function weekday(date: string): string {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return ''
  const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  return new Intl.DateTimeFormat('de-CH', {weekday: 'long'}).format(d)
}

// "Datum" column: just the date, e.g. "03.09.2027".
function dateOnly(date: string): string {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return date
  return `${day}.${month}.${year}`
}

useSeoMeta({
  title: 'Programm · Schliere lacht',
  description: 'Programm und Auftritte am Schlierefäscht.',
})
</script>
