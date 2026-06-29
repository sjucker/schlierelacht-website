<template>
  <div class="p-4 md:p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center align-middle gap-2">
        <UButton to="/programm" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
        <div class="text-sm">zurück</div>
      </div>
    </div>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Details.</div>
    <LoadingSpinner v-else-if="status === 'pending' || status === 'idle'"/>
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="status !== 'pending' && status !== 'idle' && artist" class="flex flex-col gap-6">
        <div v-if="mainImage" class="not-prose">
          <NuxtImg
              provider="cloudflare"
              loading="lazy"
              :src="cloudflareUrl(mainImage.cloudflareId)"
              class="w-full h-[250px] object-cover rounded-lg"/>
        </div>

        <UCard variant="outline">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="font-bold">{{ artist.name }}</div>
              <div class="flex gap-2 not-prose">
                <UButton v-if="artist.website" :to="artist.website" target="_blank" size="sm" color="primary" variant="ghost" icon="i-lucide-globe" aria-label="Website"/>
                <UButton v-if="artist.instagram" :to="artist.instagram" target="_blank" size="sm" color="primary" variant="ghost" icon="i-simple-icons-instagram" aria-label="Instagram"/>
                <UButton v-if="artist.facebook" :to="artist.facebook" target="_blank" size="sm" color="primary" variant="ghost" icon="i-simple-icons-facebook" aria-label="Facebook"/>
                <UButton v-if="artist.youtube" :to="artist.youtube" target="_blank" size="sm" color="primary" variant="ghost" icon="i-simple-icons-youtube" aria-label="YouTube"/>
              </div>
            </div>
          </template>
          <template #default>
            <div class="prose max-w-none">
              <MDC :value="artist.description"/>
            </div>
          </template>

        </UCard>

        <div v-if="artist.programm?.length" class="prose max-w-none">
          <h4>Programm</h4>
          <div class="grid gap-2">
            <UCard v-for="(entry, index) in artist.programm" :key="index" variant="subtle" size="sm">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <UButton
                      :to="`/locations/${entry.location.externalId}`"
                      variant="link"
                      class="p-0 font-bold text-primary">
                    {{ entry.location.name }}
                  </UButton>
                </div>
                <div class="text-sm font-medium">
                  {{ formatDate(entry.fromDate) }} <span v-if="entry.fromTime">ab {{ formatTime(entry.fromTime) }}</span>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {type AttractionDTO, ImageType} from "~/../shared/types/rest";
import cloudflareUrl from "~/utils/cloudflare-url";
import formatDate from "~/utils/format-date";
import formatTime from "~/utils/format-time";

const route = useRoute()
const externalId = route.params.id as string

const config = useRuntimeConfig()

const {data: artist, status, error} = useFetch<AttractionDTO>(
    `${config.public.apiBaseUrl}/api/attraction/${externalId}`,
    {server: false}
)

const mainImage = computed(() => artist.value?.images?.find(i => i.type === ImageType.MAIN))

useSeoMeta({
  title: () => artist.value ? `${artist.value.name} – Schliere lacht` : 'Artist Details – Schliere lacht',
  description: () => artist.value?.description || 'Künstlerdetails am Schlierefäscht.',
})
</script>
