<template>
  <div class="flex-3">
    <div class="flex items-center justify-between">
      <h2>Artists</h2>
      <UButton to="/" icon="i-lucide-home" variant="subtle">Home</UButton>
    </div>

    <USeparator color="primary" class="mb-4"/>

    <div v-if="pending" class="text-sm text-gray-500">Lade Künstler…</div>
    <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden der Künstler.</div>

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
                :avatar="{ src: cloudflareUrl(artist.images[0]!.cloudflareId), alt: artist.name }"
                :description="getArtistDescription(artist)"
                size="xl"/>
          </template>
        </UPageCard>
      </UPageList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ArtistDTO} from "#shared/types/rest";
import cloudflareUrl from "~/utils/cloudflare-url";
import getArtistDescription from "~/utils/get-artist-description";

const {data, pending, error} = await useFetch<ArtistDTO[]>(
    'https://api.schlierelacht.ch/api/artist',
    {server: false}
)

const artists = computed(() => data.value ?? [])

useSeoMeta({
  title: 'Artists – Schliere lacht',
  description: 'Künstlerinnen und Künstler am Schlierefäscht.',
})
</script>
