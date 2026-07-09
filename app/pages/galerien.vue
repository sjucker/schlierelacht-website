<template>
  <div class="p-4 md:p-6 max-w-6xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Galerien</h2>
    <USeparator color="primary" class="mb-6"/>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Bilder.</div>
    <LoadingSpinner v-else-if="status === 'pending' || status === 'idle'"/>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="status === 'success'">
        <div v-if="!categories.length" class="text-sm text-neutral-500">Noch keine Bilder vorhanden.</div>

        <section v-for="category in categories" :key="category.category" class="mb-12">
          <h3 class="text-lg font-semibold uppercase tracking-widest text-fest-blue mb-4">{{ category.category }}</h3>
          <div class="columns-2 md:columns-3 lg:columns-4 gap-4">
            <NuxtImg
                v-for="image in category.images"
                :key="image.cloudflareId"
                provider="cloudflare"
                loading="lazy"
                :src="cloudflareUrl(image.cloudflareId)"
                :alt="category.category"
                class="mb-4 w-full h-auto rounded-lg break-inside-avoid"
            />
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {GalleryCategoryDTO} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'

const config = useRuntimeConfig()
const {data, status, error} = useFetch<GalleryCategoryDTO[]>(
    `${config.public.apiBaseUrl}/api/gallery`,
    {server: false}
)

// Backend returns categories in the admin-defined order, with images newest-first within each.
const categories = computed(() => data.value ?? [])

useSeoMeta({
  title: 'Galerien · Schliere lacht',
})
</script>
