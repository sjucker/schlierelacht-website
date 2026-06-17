<template>
  <div class="p-4 md:p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center align-middle gap-2">
        <UButton to="/programm" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
        <div class="text-sm">Alle Künstler</div>
      </div>
    </div>
    <div class="font-bold">{{ tagName?.name }}</div>


    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Künstler für diesen Tag.</div>
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="!pending && !error">
        <div v-if="artists?.length === 0" class="text-sm text-gray-500">Keine Künstler mit diesem Tag gefunden.</div>

        <div v-else class="grid md:grid-cols-2 gap-4">
          <UPageList divide>
            <UPageCard
                v-for="(artist, index) in artists"
                :key="index"
                variant="ghost"
                :to="`/programm/${artist.externalId}`">
              <template #body>
                <UUser
                    :name="artist.name"
                    :description="getArtistDescription(artist)"
                    size="xl"/>
              </template>
            </UPageCard>
          </UPageList>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {AttractionDTO} from "~/../shared/types/rest";
import getArtistDescription from "~/utils/get-artist-description";

const route = useRoute()
const tagId = Number.parseInt(route.params.id as string)

const config = useRuntimeConfig()

const {data: artists, pending, error} = useFetch<AttractionDTO[]>(
    `${config.public.apiBaseUrl}/api/artist/tag/${tagId}`,
    {server: false}
)

const tagName = computed(() => {
  return artists.value?.flatMap(artist => artist.tags).find(tag => tag.id === tagId)
})

useSeoMeta({
  title: 'Künstler nach Tag – Schliere lacht',
  description: 'Künstlerinnen und Künstler am Schlierefäscht nach Tag gefiltert.',
})
</script>
