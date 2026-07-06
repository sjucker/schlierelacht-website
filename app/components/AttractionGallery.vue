<template>
  <div v-if="images.length" class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div
        v-for="image in images"
        :key="image.cloudflareId"
        class="relative overflow-hidden rounded-lg border border-neutral-200 md:bg-neutral-100 md:flex md:items-center md:justify-center">
      <!-- mobile: full width at natural ratio; desktop: fits inside the fixed-height box -->
      <NuxtImg
          provider="cloudflare"
          loading="lazy"
          :src="cloudflareUrl(image.cloudflareId)"
          :alt="image.description"
          class="relative max-w-full h-auto md:w-full md:h-full md:object-contain"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ImageDTO} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'

defineProps<{ images: ImageDTO[] }>()
</script>
