<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Künstler</h2>
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
    <div v-else-if="!pending && filtered.length === 0" class="text-sm text-neutral-500">Keine Künstler gefunden.</div>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <UPageList v-if="!pending" divide>
        <UPageCard
            v-for="artist in filtered"
            :key="artist.externalId"
            variant="ghost"
            :to="`/programm/${artist.externalId}`"
        >
          <template #body>
            <div class="flex flex-col sm:flex-row sm:gap-4 sm:items-start">
              <NuxtImg
                  v-if="mainImage(artist)"
                  provider="cloudflare"
                  loading="lazy"
                  :src="cloudflareUrl(mainImage(artist)!.cloudflareId)"
                  :alt="artist.name"
                  class="w-full h-28 sm:w-64 sm:shrink-0 object-cover rounded mb-3 sm:mb-0"
              />
              <div>
                <div class="font-semibold text-fest-blue">{{ artist.name }}</div>
                <div
                    v-for="entry in sortedProgramm(artist)"
                    :key="entry.location.externalId + entry.fromDate"
                    class="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {{ formatDate(entry.fromDate) }}
                  <template v-if="entry.fromTime"> · {{ formatTime(entry.fromTime) }}</template>
                  · {{ entry.location.name }}
                </div>
              </div>
            </div>
          </template>
        </UPageCard>
      </UPageList>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {type AttractionDTO, type ImageDTO, ImageType, type ProgrammEntryDTO} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'
import formatDate from '~/utils/format-date'
import formatTime from '~/utils/format-time'

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

function mainImage(artist: AttractionDTO): ImageDTO | undefined {
  return artist.images?.find(i => i.type === ImageType.MAIN)
}

function sortedProgramm(artist: AttractionDTO): ProgrammEntryDTO[] {
  return [...(artist.programm ?? [])].sort((a, b) =>
      a.fromDate.localeCompare(b.fromDate) || (a.fromTime ?? '').localeCompare(b.fromTime ?? '')
  )
}

function earliestEntry(entries: ProgrammEntryDTO[]): ProgrammEntryDTO | undefined {
  return entries.reduce<ProgrammEntryDTO | undefined>((best, e) => {
    if (!best) return e
    const d = e.fromDate.localeCompare(best.fromDate)
    return d < 0 || (d === 0 && (e.fromTime ?? '') < (best.fromTime ?? '')) ? e : best
  }, undefined)
}

const today = new Date().toISOString().slice(0, 10)

const filtered = computed(() => {
  let result = [...(data.value ?? [])]

  if (selectedDate.value) {
    result = result.filter(a => a.programm?.some(p => p.fromDate === selectedDate.value))
  }
  if (selectedStage.value) {
    result = result.filter(a => a.programm?.some(p => p.location?.externalId === selectedStage.value))
  }

  result.sort((a, b) => {
    const aUpcoming = earliestEntry((a.programm ?? []).filter(p => p.fromDate >= today))
    const bUpcoming = earliestEntry((b.programm ?? []).filter(p => p.fromDate >= today))

    if (aUpcoming && bUpcoming) {
      return aUpcoming.fromDate.localeCompare(bUpcoming.fromDate) ||
          (aUpcoming.fromTime ?? '').localeCompare(bUpcoming.fromTime ?? '')
    }
    if (aUpcoming) return -1
    if (bUpcoming) return 1

    const aFirst = earliestEntry(a.programm ?? [])
    const bFirst = earliestEntry(b.programm ?? [])
    if (!aFirst && !bFirst) return a.name.localeCompare(b.name)
    if (!aFirst) return 1
    if (!bFirst) return -1
    return aFirst.fromDate.localeCompare(bFirst.fromDate) ||
        (aFirst.fromTime ?? '').localeCompare(bFirst.fromTime ?? '')
  })

  return result
})

useSeoMeta({
  title: 'Künstler · Schliere lacht',
  description: 'Künstlerinnen und Künstler am Schlierefäscht.',
})
</script>
