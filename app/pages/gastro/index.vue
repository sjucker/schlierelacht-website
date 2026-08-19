<template>
  <div class="p-4 md:p-6 max-w-3xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Gastro</h2>
    <USeparator color="primary" class="mb-4"/>

    <p class="prose text-neutral-700 max-w-5xl text-sm leading-relaxed mb-4">
      Nachstehend werden Sie die Auflistung der Festwirtschaften und Marktstände am
      Schlierefäscht 2027 finden. Diese Liste wird bis zum Fest ergänzt und komplettiert.
    </p>

    <div class="mb-4 flex flex-col sm:flex-row gap-3 items-end">
      <UInput
          v-model="search"
          placeholder="Name, Betreiber oder Nr. suchen…"
          icon="i-lucide-search"
          class="w-full sm:w-72"
      />
      <UButton
          v-if="search"
          variant="ghost"
          icon="i-lucide-x"
          @click="resetFilters"
      />
    </div>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Daten.</div>
    <LoadingSpinner v-else-if="status === 'pending' || status === 'idle'"/>
    <Transition
        enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100">
      <div v-if="status === 'success'">
        <div v-if="filtered.length === 0" class="text-sm text-neutral-500">Keine Einträge gefunden.</div>

        <div v-else>
          <!-- Header row -->
          <div
              :class="rowGrid"
              class="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 border-b border-neutral-300">
            <div>Nr.</div>
            <div class="truncate">Name</div>
            <div class="truncate">Betreiber</div>
          </div>

          <!-- Rows -->
          <NuxtLink
              v-for="item in filtered"
              :key="item.externalId"
              :to="`/gastro/${item.externalId}`"
              :class="rowGrid"
              class="px-2 py-2 text-sm items-center border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
          >
            <div class="text-neutral-600 whitespace-nowrap">{{ item.externalId }}</div>
            <div class="font-semibold text-fest-blue truncate">{{ item.name }}</div>
            <div class="text-neutral-600 truncate">{{ item.operator }}</div>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {AttractionDTO} from '~~/shared/types/rest'

// Shared column template so the header and every row align (Nr. · Name · Betreiber).
const rowGrid = 'grid grid-cols-[3rem_1fr_1fr] gap-x-3 sm:gap-x-4'

const config = useRuntimeConfig()
const {data, status, error} = useFetch<AttractionDTO[]>(
    `${config.public.apiBaseUrl}/api/attraction?type=FOOD`,
    {server: false}
)

const search = ref('')

const resetFilters = () => {
  search.value = ''
}

const sorted = computed(() =>
    [...(data.value ?? [])].sort((a, b) => a.externalId.localeCompare(b.externalId)))

// Free-text filter over the three visible columns (Nr. · Name · Betreiber).
const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return sorted.value

  return sorted.value.filter(item =>
      `${item.externalId} ${item.name} ${item.operator ?? ''}`.toLowerCase().includes(term))
})

useSeoMeta({
  title: 'Gastro · Schliere lacht',
  description: 'Gastronomieangebot am Schlierefäscht.',
})
</script>
