<template>
  <div class="p-4 md:p-6">
    <div class="flex items-center justify-between">
      <h2>Locations</h2>
      <UButton to="/" icon="i-lucide-home" variant="subtle">Home</UButton>
    </div>

    <USeparator color="primary" class="mb-4"/>

    <div class="mb-4">
      <UInput v-model="search" placeholder="Ort suchen…" icon="i-lucide-search" block/>
    </div>

    <div v-if="pending" class="text-sm text-gray-500">Lade Orte…</div>
    <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden der Orte.</div>

    <div v-else-if="locations.length === 0" class="text-sm text-gray-500">Keine Orte gefunden.</div>

    <div v-else class="grid md:grid-cols-2 gap-4">
      <UPageList divide>
        <UPageCard
            v-for="(location, index) in locations"
            :key="index"
            variant="ghost"
            :to="`/locations/${location.externalId}`">
          <template #body>
            <UUser
                :name="location.name"
                :description="location.type"
                size="xl"/>
          </template>
        </UPageCard>
      </UPageList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {LocationDTO} from "~/../shared/types/rest";

const search = ref('')

const config = useRuntimeConfig()

const {data, pending, error} = await useFetch<LocationDTO[]>(
    `${config.public.apiBaseUrl}/api/location`,
    {server: false}
)

const locations = computed(() => {
  const allLocations = data.value ?? []
  if (!search.value) return allLocations

  return allLocations.filter(location =>
      location.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

useSeoMeta({
  title: 'Locations – Schliere lacht',
  description: 'Veranstaltungsorte am Schlierefäscht.',
})
</script>
