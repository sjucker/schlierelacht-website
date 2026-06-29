<template>
  <div v-if="images.length">
    <div class="flex flex-wrap gap-2">
      <button
          v-for="image in images"
          :key="image.cloudflareId"
          type="button"
          class="block overflow-hidden rounded cursor-pointer transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          @click="open(image)"
      >
        <NuxtImg
            provider="cloudflare"
            loading="lazy"
            :src="cloudflareUrl(image.cloudflareId)"
            :alt="image.description"
            class="h-24 w-24 object-cover"
        />
      </button>
    </div>

    <UModal v-model:open="isOpen" :title="activeImage?.description || 'Bild'">
      <template #content>
        <NuxtImg
            v-if="activeImage"
            provider="cloudflare"
            :src="cloudflareUrl(activeImage.cloudflareId)"
            :alt="activeImage.description"
            class="w-full max-h-[85vh] object-contain rounded-lg"
        />
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
