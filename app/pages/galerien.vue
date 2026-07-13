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
            <button
                v-for="image in category.images"
                :key="image.cloudflareId"
                type="button"
                class="mb-4 block w-full break-inside-avoid cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-fest-blue rounded-lg"
                @click="openLightbox(image.cloudflareId)">
              <NuxtImg
                  provider="cloudflare"
                  loading="lazy"
                  :src="cloudflareUrl(image.cloudflareId)"
                  :alt="category.category"
                  class="w-full h-auto rounded-lg"
              />
            </button>
          </div>
        </section>
      </div>
    </Transition>

    <Teleport to="body">
      <Transition
          enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div
            v-if="lightboxId"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-label="Bild in voller Grösse"
            @click="closeLightbox">
          <button
              type="button"
              class="absolute top-4 right-4 text-white/80 hover:text-white focus:outline-none"
              aria-label="Schliessen"
              @click="closeLightbox">
            <UIcon name="i-lucide-x" class="size-8"/>
          </button>
          <NuxtImg
              provider="cloudflare"
              :src="cloudflareUrl(lightboxId)"
              alt=""
              class="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg md:max-h-none md:h-[90vh] md:max-w-[92vw]"
              @click.stop/>
        </div>
      </Transition>
    </Teleport>
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

const lightboxId = ref<string | null>(null)

function openLightbox(id: string) {
  lightboxId.value = id
}

function closeLightbox() {
  lightboxId.value = null
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

useSeoMeta({
  title: 'Galerien · Schliere lacht',
})
</script>
