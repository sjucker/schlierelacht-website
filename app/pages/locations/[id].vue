<template>
  <div class="p-4 md:p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center align-middle gap-2">
        <UButton icon="i-lucide-chevron-left" variant="ghost" color="neutral" @click="goBack"/>
        <div class="text-sm">zurück</div>
      </div>
    </div>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Details.</div>
    <LoadingSpinner v-else-if="status === 'pending' || status === 'idle'"/>
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="status !== 'pending' && status !== 'idle' && location" class="flex flex-col gap-6">
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
            <MapboxMap
                map-id="map"
                style="width: 100%; height: 500px;"
                :options="{
                style: 'mapbox://styles/schlierelacht/cmr9dkfx0003701r07otc18ui',
              center: center,
              zoom: 18
              }">

              <MapboxSource
                  source-id="source"
                  :source="{
          type: 'geojson',
          data: geojson
        }"
              />
              <MapboxLayer
                  :layer="{
          source: 'source',
          id: 'geojson-layer',
          type: 'circle',
          paint: {
            'circle-radius': 14,
            'circle-color': '#ff0000',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
            }"
              />

              <MapboxGeolocateControl position="top-left"/>
            </MapboxMap>
          </template>
        </UCard>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {LocationDTO} from "~/../shared/types/rest";
import cloudflareUrl from "~/utils/cloudflare-url";

const route = useRoute()
const router = useRouter()
const externalId = route.params.id as string

// Go back to wherever the user came from (e.g. an attraction detail page or the
// locations list); fall back to the list when there is no in-app history.
const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/locations')
}

const config = useRuntimeConfig()

const {data: location, status, error} = useFetch<LocationDTO>(
    `${config.public.apiBaseUrl}/api/location/${externalId}`,
    {server: false}
)

const center = computed(() => {
  return [location.value?.longitude ?? 0, location.value?.latitude ?? 0]
})

const geojson = computed(() => {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "marker-color": "#ff0000",
          "marker-size": "medium",
          "marker-symbol": "circle-stroked"
        },
        "geometry": {
          "coordinates": center.value,
          "type": "Point"
        },
        "id": 0
      }
    ]
  }
})

useSeoMeta({
  title: () => location.value ? `${location.value.name} – Schliere lacht` : 'Ort Details – Schliere lacht',
  description: () => location.value ? `Details zum Veranstaltungsort ${location.value.name}.` : 'Veranstaltungsortdetails am Schlierefäscht.',
})
</script>
