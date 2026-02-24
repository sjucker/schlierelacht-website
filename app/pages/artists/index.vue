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
      <NuxtLink v-for="artist in artists" :key="artist.externalId" :to="`/artists/${artist.externalId}`" class="no-underline">
        <UCard variant="outline" class="h-full hover:border-primary transition-colors cursor-pointer">
          <template #header>
            <div class="flex items-center justify-between">
              <strong>{{ artist.name }}</strong>
              <div class="flex gap-2 not-prose">
                <UButton v-if="artist.website" :to="artist.website" target="_blank" size="xs" color="primary" variant="ghost" icon="i-lucide-globe" aria-label="Website" @click.stop/>
                <UButton v-if="artist.instagram" :to="artist.instagram" target="_blank" size="xs" color="primary" variant="ghost" icon="i-simple-icons-instagram" aria-label="Instagram" @click.stop/>
                <UButton v-if="artist.facebook" :to="artist.facebook" target="_blank" size="xs" color="primary" variant="ghost" icon="i-simple-icons-facebook" aria-label="Facebook" @click.stop/>
                <UButton v-if="artist.youtube" :to="artist.youtube" target="_blank" size="xs" color="primary" variant="ghost" icon="i-simple-icons-youtube" aria-label="YouTube" @click.stop/>
              </div>
            </div>
          </template>
          <template #default>
            <p class="prose-sm whitespace-pre-line line-clamp-3">{{ artist.description }}</p>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArtistDTO } from "#shared/types/rest";

const { data, pending, error } = await useFetch<ArtistDTO[]>(
  'https://api.schlierelacht.ch/api/artist',
  { server: false }
)

const artists = computed(() => data.value ?? [])

useSeoMeta({
  title: 'Artists – Schliere lacht',
  description: 'Künstlerinnen und Künstler am Schlierefäscht.',
})
</script>
