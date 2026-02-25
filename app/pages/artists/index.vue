<template>
  <div class="flex-3">
    <div class="flex items-center justify-between">
      <h2>Artists</h2>
      <UButton to="/" icon="i-lucide-home" variant="subtle">Home</UButton>
    </div>

    <USeparator color="primary" class="mb-4"/>

    <div class="mb-4 flex flex-col sm:flex-row gap-4">
      <UInput v-model="search" placeholder="Künstler suchen…" icon="i-lucide-search" class="flex-1"/>
      <USelect
          v-model="selectedTag"
          value-key="id"
          label-key="name"
          :items="tagOptions"
          placeholder="Filter nach Stil"
          class="w-full sm:w-48"
      />
    </div>

    <div v-if="pending" class="text-sm text-gray-500">Lade Künstler…</div>
    <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden der Künstler.</div>

    <div v-else-if="artists.length === 0" class="text-sm text-gray-500">Keine Künstler gefunden.</div>

    <div v-else class="grid md:grid-cols-2 gap-4">
      <UPageList divide>
        <UPageCard
            v-for="(artist, index) in artists"
            :key="index"
            variant="ghost"
            :to="`/artists/${artist.externalId}`">
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
</template>

<script setup lang="ts">
import type {ArtistDTO, TagDTO} from "~/../shared/types/rest";
import getArtistDescription from "~/utils/get-artist-description";

const search = ref('')
const selectedTag = ref<number>(0)

const {data, pending, error} = await useFetch<ArtistDTO[]>(
    'https://api.schlierelacht.ch/api/artist',
    {server: false}
)

const {data: tags} = await useFetch<TagDTO[]>(
    // TODO replace with enum
    'https://api.schlierelacht.ch/api/tag/ARTIST',
    {server: false}
)

const tagOptions = computed(() => {
  return [{id: 0, name: 'Stil filtern...'}, ...tags.value ?? []]
})

const artists = computed(() => {
  let filteredArtists = data.value ?? []

  if (search.value) {
    const searchTerm = search.value.toLowerCase()
    filteredArtists = filteredArtists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm)
    )
  }

  if (selectedTag.value) {
    filteredArtists = filteredArtists.filter(artist =>
        artist.tags?.some(tag => tag.id === selectedTag.value)
    )
  }

  return filteredArtists
})

useSeoMeta({
  title: 'Artists – Schliere lacht',
  description: 'Künstlerinnen und Künstler am Schlierefäscht.',
})
</script>
