<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Gastro</h2>
    <USeparator color="primary" class="mb-4"/>

    <div class="mb-4 flex flex-col sm:flex-row gap-4 items-end">
      <UInput v-model="search" placeholder="Suchen…" icon="i-lucide-search" class="flex-1"/>
      <USelect
          v-model="selectedTag"
          value-key="id"
          label-key="name"
          :items="tagOptions"
          placeholder="Filter nach Kategorie"
          class="w-full sm:w-48"
      />
      <UButton
          v-if="search || selectedTag"
          variant="ghost"
          icon="i-lucide-x"
          @click="resetFilters"
      />
    </div>

    <div v-if="pending" class="text-sm text-neutral-500">Lade Gastro…</div>
    <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden.</div>
    <div v-else-if="filtered.length === 0" class="text-sm text-neutral-500">Keine Einträge gefunden.</div>

    <div v-else>
      <UPageList divide>
        <UPageCard
            v-for="item in filtered"
            :key="item.externalId"
            variant="ghost"
            :to="`/gastro/${item.externalId}`"
        >
          <template #body>
            <div class="flex items-center gap-2 mb-1">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold shrink-0" style="background-color: #7ca6d8">{{ item.externalId }}</span>
              <span class="font-semibold text-fest-blue">{{ item.name }}</span>
            </div>
            <div class="flex flex-wrap gap-1 not-prose">
              <UBadge v-for="tag in item.tags" :key="tag.id" size="sm" color="primary" variant="outline">
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

const config = useRuntimeConfig()
const {data, pending, error} = await useFetch<AttractionDTO[]>(
    `${config.public.apiBaseUrl}/api/gastro`,
    {server: false}
)

const search = ref<string | undefined>(undefined)
const selectedTag = ref<number | undefined>(undefined)

const resetFilters = () => {
  search.value = undefined
  selectedTag.value = undefined
}

const tagOptions = computed(() => {
  const map = new Map<number, string>()
  data.value?.forEach(item => item.tags?.forEach(t => map.set(t.id, t.name)))
  return Array.from(map.entries())
      .map(([id, name]) => ({id, name}))
      .sort((a, b) => a.name.localeCompare(b.name))
})

const filtered = computed(() => {
  let result = [...(data.value ?? [])].sort((a, b) => a.externalId.localeCompare(b.externalId))
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(item => item.name.toLowerCase().includes(q))
  }
  if (selectedTag.value) {
    result = result.filter(item => item.tags?.some(t => t.id === selectedTag.value))
  }
  return result
})

useSeoMeta({
  title: 'Gastro · Schliere lacht',
  description: 'Gastronomieangebot am Schlierefäscht.',
})
</script>
