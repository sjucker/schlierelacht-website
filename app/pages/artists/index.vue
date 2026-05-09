<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Künstler</h2>
    <USeparator color="primary" class="mb-4"/>

    <div class="mb-4 flex flex-col sm:flex-row gap-4 items-end">
      <UInput v-model="search" placeholder="Suchen…" icon="i-lucide-search" class="flex-1"/>
      <USelect
          v-model="selectedTag"
          value-key="id"
          label-key="name"
          :items="tagOptions"
          placeholder="Filter nach Stil"
          class="w-full sm:w-48"
      />
      <USelect
          v-model="selectedDate"
          value-key="id"
          label-key="name"
          :items="dateOptions"
          placeholder="Filter nach Datum"
          class="w-full sm:w-48"
      />
      <UButton
          v-if="search || selectedTag || selectedDate"
          variant="ghost"
          icon="i-lucide-x"
          @click="resetFilters"
      />
    </div>

    <div v-if="pending" class="text-sm text-neutral-500">Lade Künstler…</div>
    <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden.</div>
    <div v-else-if="filtered.length === 0" class="text-sm text-neutral-500">Keine Künstler gefunden.</div>

    <div v-else>
      <UPageList divide>
        <UPageCard
            v-for="artist in filtered"
            :key="artist.externalId"
            variant="ghost"
            :to="`/artists/${artist.externalId}`"
        >
          <template #body>
            <div class="font-semibold text-fest-blue">{{ artist.name }}</div>
            <div class="text-sm text-black">{{ getArtistDescription(artist) }}</div>
            <div class="flex flex-wrap gap-1 not-prose">
              <UBadge v-for="tag in artist.tags" :key="tag.id" size="sm" color="primary" variant="outline">
                {{ tag.name }}
              </UBadge>
            </div>
          </template>
        </UPageCard>
      </UPageList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {AttractionDTO} from '~~/shared/types/rest'
import formatDate from '~/utils/format-date'

const config = useRuntimeConfig()
const {data, pending, error} = useFetch<AttractionDTO[]>(
    `${config.public.apiBaseUrl}/api/artist`,
    {server: false}
)

const search = ref<string | undefined>(undefined)
const selectedTag = ref<number | undefined>(undefined)
const selectedDate = ref<string | undefined>(undefined)

const resetFilters = () => {
  search.value = undefined
  selectedTag.value = undefined
  selectedDate.value = undefined
}

const tagOptions = computed(() => {
  const map = new Map<number, string>()
  data.value?.forEach(a => a.tags?.forEach(t => map.set(t.id, t.name)))
  return Array.from(map.entries())
      .map(([id, name]) => ({id, name}))
      .sort((a, b) => a.name.localeCompare(b.name))
})

const dateOptions = computed(() => {
  const dates = new Set<string>()
  data.value?.forEach(a => a.programm?.forEach(p => {
    if (p.fromDate) dates.add(p.fromDate)
  }))
  return Array.from(dates).sort().map(date => ({id: date, name: formatDate(date)}))
})

const filtered = computed(() => {
  let result = [...(data.value ?? [])].sort((a, b) => a.name.localeCompare(b.name))
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(a => a.name.toLowerCase().includes(q))
  }
  if (selectedTag.value) {
    result = result.filter(a => a.tags?.some(t => t.id === selectedTag.value))
  }
  if (selectedDate.value) {
    result = result.filter(a => a.programm?.some(p => p.fromDate === selectedDate.value))
  }
  return result
})

useSeoMeta({
  title: 'Künstler · Schliere lacht',
  description: 'Künstlerinnen und Künstler am Schlierefäscht.',
})
</script>
