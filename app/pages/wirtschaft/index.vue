<template>
  <div class="p-4 md:p-6 max-w-5xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Wirtschaft &amp; Gewerbe</h2>
    <USeparator color="primary" class="mb-4"/>

    <p class="prose text-neutral-700 max-w-5xl text-sm leading-relaxed">
      Vor und am Schlierefäscht 2027 finden diverse interessante Sponsoren-Events und
      Wirtschafts-Anlässe statt. Wir wünschen viele spannende Networking Gelegenheiten
      und Begegnungen.
    </p>
    <p class="prose text-neutral-700 max-w-5xl text-sm leading-relaxed mt-2 font-semibold">
      Sponsoring Team Schlierelacht 2027
    </p>

    <div v-if="error" class="mt-6 text-sm text-red-600">Fehler beim Laden der Daten.</div>
    <div v-else-if="status === 'success' && rows.length === 0" class="mt-6 text-sm text-neutral-500">
      Zurzeit sind keine Anlässe aufgeschaltet.
    </div>

    <LoadingSpinner v-if="status === 'pending' || status === 'idle'"/>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
                enter-to-class="opacity-100">
      <div v-if="status === 'success' && rows.length > 0">
        <!-- Upcoming events: chronological, next one on top; each day divider labels its group. -->
        <template v-for="row in upcomingRows" :key="row.key">
          <USeparator v-if="row.newDay" color="primary" position="start" class="mt-6 mb-2">
            <span class="flex items-baseline gap-2 whitespace-nowrap">
              <span class="text-sm font-bold uppercase tracking-wide text-fest-blue">{{
                  formatWeekday(row.entry.fromDate)
                }}</span>
              <span class="text-xs text-neutral-500">{{ formatDateShort(row.entry.fromDate) }}</span>
            </span>
          </USeparator>
          <ProgrammEntryRow :row="row" :grid-class="rowGrid" base-path="/wirtschaft"/>
        </template>

        <!-- Past events, grouped separately and shown most-recent first. -->
        <template v-if="pastRows.length">
          <h3 class="mt-8 mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">Vergangene</h3>
          <template v-for="row in pastRows" :key="row.key">
            <USeparator v-if="row.newDay" color="neutral" position="start" class="mt-6 mb-2">
              <span class="flex items-baseline gap-2 whitespace-nowrap text-neutral-400">
                <span class="text-sm font-bold uppercase tracking-wide">{{ formatWeekday(row.entry.fromDate) }}</span>
                <span class="text-xs">{{ formatDateShort(row.entry.fromDate) }}</span>
              </span>
            </USeparator>
            <ProgrammEntryRow :row="row" :grid-class="rowGrid" base-path="/wirtschaft" past/>
          </template>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {AttractionRefDTO, ProgrammEntryDTO, ProgrammPointDTO} from '~~/shared/types/rest'
import apiPath from '~/utils/api-path'
import formatDateShort from '~/utils/format-date-short'
import formatWeekday from '~/utils/format-weekday'

// Shared column template so every row aligns (Name · Tag · Datum · Zeit · Ort) — same as the programm list.
const rowGrid = 'grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-x-3 sm:gap-x-4'

const config = useRuntimeConfig()
// The backend pre-joins and chronologically sorts the event programm points (date, then start time,
// then name) and flags each past/upcoming, exactly like /api/programm — so we only split here.
const {data, status, error} = useFetch<ProgrammPointDTO[]>(
    `${config.public.apiBaseUrl}${apiPath('event')}`,
    {server: false}
)

interface EventRow {
  key: string
  attraction: AttractionRefDTO
  entry: ProgrammEntryDTO
  newDay?: boolean
}

const rows = computed<EventRow[]>(() =>
    (data.value ?? []).map(point => ({
      key: `${point.attraction.externalId}|${point.entry.fromDate}|${point.entry.fromTime ?? ''}|${point.entry.location.externalId}`,
      attraction: point.attraction,
      entry: point.entry,
    })))

// Flags the first row of each day so the template can slip a day divider in front of it.
function withDayMarkers(list: EventRow[]) {
  let previousDate: string | undefined
  return list.map(row => {
    const newDay = row.entry.fromDate !== previousDate
    previousDate = row.entry.fromDate
    return {...row, newDay}
  })
}

// Upcoming keeps the backend's ascending order; past is reversed so the most recent sits on top.
const upcomingRows = computed(() => withDayMarkers(rows.value.filter(r => !r.entry.past)))
const pastRows = computed(() => withDayMarkers(rows.value.filter(r => r.entry.past).reverse()))

useSeoMeta({
  title: 'Wirtschaft & Gewerbe · Schliere lacht',
  description: 'Sponsoren-Events und Wirtschafts-Anlässe rund um das Schlierefäscht.',
})
</script>
