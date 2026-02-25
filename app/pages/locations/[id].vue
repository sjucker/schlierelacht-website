<template>
  <div class="flex-3">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center align-middle gap-2">
        <UButton to="/locations" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
        <div class="text-sm">Alle Orte</div>
      </div>
    </div>

    <div v-if="pending" class="text-sm text-gray-500">Lade Details…</div>
    <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden der Details.</div>
    <div v-else-if="location" class="flex flex-col gap-6">
      <div v-if="location.cloudflareId" class="not-prose">
        <NuxtImg
            provider="cloudflare"
            loading="lazy"
            :src="cloudflareUrl(location.cloudflareId)"
            class="w-full h-[250px] object-cover rounded-lg"/>
      </div>

      <UCard variant="outline">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="font-bold">{{ location.name }}</div>
            <div v-if="location.googleMapsUrl" class="not-prose">
              <UButton :to="location.googleMapsUrl" target="_blank" size="sm" color="primary" variant="ghost" icon="i-lucide-map-pin" label="Google Maps"/>
            </div>
          </div>
        </template>
        <template #default>
          <div class="prose max-w-none">
            <p v-if="location.mapId"><strong>Map ID:</strong> {{ location.mapId }}</p>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {LocationDTO} from "~/../shared/types/rest";
import cloudflareUrl from "~/utils/cloudflare-url";

const route = useRoute()
const externalId = route.params.id as string

const config = useRuntimeConfig()

const {data: location, pending, error} = await useFetch<LocationDTO>(
    `${config.public.apiBaseUrl}/api/location/${externalId}`,
    {server: false}
)

useSeoMeta({
  title: () => location.value ? `${location.value.name} – Schliere lacht` : 'Ort Details – Schliere lacht',
  description: () => location.value ? `Details zum Veranstaltungsort ${location.value.name}.` : 'Veranstaltungsortdetails am Schlierefäscht.',
})
</script>
