<template>
  <div class="flex flex-col h-full">

    <div class="p-4 md:p-6 pb-2 flex-shrink-0">
      <h2 class="text-2xl font-bold text-fest-blue mb-1">Festplan</h2>
      <USeparator color="primary" class="mb-4"/>

      <div class="flex flex-wrap gap-4 mb-4">
        <div v-for="(color, type) in TYPE_COLORS" :key="type" class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full shrink-0" :style="`background-color: ${color}`"/>
          <span class="text-xs text-neutral-600">{{ TYPE_LABELS[type] }}</span>
        </div>
      </div>
    </div>

    <div class="flex-1 min-h-[500px] px-4 md:px-6 pb-4 md:pb-6">
      <div v-if="pending" class="text-sm text-neutral-500">Lade Standorte…</div>
      <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden.</div>
      <MapboxMap
          v-else
          map-id="festplan"
          style="width: 100%; height: 100%;"
          :options="{
            style: 'mapbox://styles/mapbox/standard',
            center: mapCenter,
            zoom: 16
          }"
      >
        <MapboxSource
            source-id="locations"
            :source="{ type: 'geojson', data: geojson }"
        />

        <MapboxLayer
            :layer="{
              id: 'location-circles',
              source: 'locations',
              type: 'circle',
              paint: {
                'circle-radius': 14,
                'circle-color': colorExpression,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
              }
            }"
        />

        <MapboxLayer
            :layer="{
              id: 'location-labels',
              source: 'locations',
              type: 'symbol',
              layout: {
                'text-field': ['get', 'name'],
                'text-offset': [0, 1.8],
                'text-anchor': 'top',
                'text-size': 12,
                'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular']
              },
              paint: {
                'text-color': '#1f2937',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1.5
              }
            }"
        />

        <MapboxGeolocateControl position="top-left"/>
      </MapboxMap>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {LocationDTO} from '~~/shared/types/rest'

const TYPE_COLORS: Record<LocationType, string> = {
  [LocationType.STAGE]: '#2b3585',
  [LocationType.FOOD_STAND]: '#f97316',
  [LocationType.BAR]: '#dc2626',
  [LocationType.TENT]: '#16a34a',
  [LocationType.ATTRACTION]: '#9333ea',
  [LocationType.SANITARY]: '#86edd1',
  [LocationType.INFO]: '#e19d6c',
}

const TYPE_LABELS: Record<LocationType, string> = {
  [LocationType.STAGE]: 'Bühne',
  [LocationType.FOOD_STAND]: 'Essensstand',
  [LocationType.BAR]: 'Bar',
  [LocationType.TENT]: 'Festzelt',
  [LocationType.ATTRACTION]: 'Attraktion',
  [LocationType.SANITARY]: "Sanitäre Anlagen",
  [LocationType.INFO]: "Info-Stand"
}

const config = useRuntimeConfig()
const {data, pending, error} = useFetch<LocationDTO[]>(
    `${config.public.apiBaseUrl}/api/location`,
    {server: false}
)

const mapCenter = computed<[number, number]>(() => {
  const locs = data.value ?? []
  if (!locs.length) return [8.445, 47.397]
  const lng = locs.reduce((s, l) => s + l.longitude, 0) / locs.length
  const lat = locs.reduce((s, l) => s + l.latitude, 0) / locs.length
  return [lng, lat]
})

const geojson = computed(() => ({
  type: 'FeatureCollection' as const,
  features: (data.value ?? []).map(loc => ({
    type: 'Feature' as const,
    properties: {
      type: loc.type,
      name: loc.name,
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [loc.longitude, loc.latitude],
    },
  })),
}))

const colorExpression = [
  'match', ['get', 'type'],
  ...Object.entries(TYPE_COLORS).flat(),
  '#6b7280',
]

useSeoMeta({
  title: 'Festplan · Schliere lacht',
  description: 'Karte aller Veranstaltungsorte am Schlierefäscht.',
})
</script>
