<template>
  <div v-if="images.length">
    <div class="flex flex-wrap gap-2">
      <button
          v-for="image in images"
          :key="image.cloudflareId"
          type="button"
          class="group block overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          @click="open(image)"
      >
        <NuxtImg
            provider="cloudflare"
            loading="lazy"
            :src="cloudflareUrl(image.cloudflareId)"
            :alt="image.description"
            class="h-40 w-40 sm:h-48 sm:w-48 object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </button>
    </div>

    <UModal
        v-model:open="isOpen"
        :title="activeImage?.description || 'Bild'"
        :ui="{ content: 'w-fit max-w-[95vw]' }"
    >
      <template #content>
        <!-- plain <img> loads the full-resolution `public` variant (NuxtImg would downscale it);
             CSS caps it at the viewport so it fills as much space as its natural size allows -->
        <img
            v-if="activeImage"
            :src="cloudflareUrl(activeImage.cloudflareId)"
            :alt="activeImage.description"
            class="w-auto h-auto max-w-[95vw] max-h-[90vh] object-contain rounded-lg mx-auto"
        >
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type {ImageDTO} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'

defineProps<{ images: ImageDTO[] }>()

const isOpen = ref(false)
const activeImage = ref<ImageDTO | null>(null)

function open(image: ImageDTO) {
  activeImage.value = image
  isOpen.value = true
}
</script>
