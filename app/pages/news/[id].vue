<template>
  <div class="p-4 md:p-6 max-w-5xl">
    <div class="flex items-center gap-2 mb-6">
      <UButton to="/news" icon="i-lucide-chevron-left" variant="ghost" color="neutral" size="sm"/>
      <span class="text-sm text-neutral-400">News</span>
    </div>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
                enter-to-class="opacity-100">
      <div v-if="!pending">
        <div v-if="news" class="flex flex-col md:flex-row md:items-start gap-6">
          <!-- Image: on top for mobile, to the right of the text on desktop -->
          <div
              class="relative w-full md:w-2/5 md:shrink-0 md:order-last h-48 sm:h-56 md:h-auto rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <template v-if="news.cloudflareId">
              <!-- blurred backdrop fills the box so portrait images have no empty bands -->
              <NuxtImg
                  provider="cloudflare"
                  :src="cloudflareUrl(news.cloudflareId)"
                  alt=""
                  aria-hidden="true"
                  class="absolute inset-0 w-full h-full object-cover scale-110 blur-xl"
              />
              <!-- full image: fills the fixed-height box on mobile, natural ratio on desktop -->
              <NuxtImg
                  provider="cloudflare"
                  :src="cloudflareUrl(news.cloudflareId)"
                  :alt="news.title"
                  class="relative w-full h-full md:h-auto object-contain"
              />
            </template>
            <UIcon v-else name="i-lucide-image" class="w-16 h-16 text-neutral-300 dark:text-neutral-600"/>
          </div>

          <!-- Text -->
          <div class="md:flex-1 md:min-w-0">
            <p class="text-xs text-neutral-400 m-0 mb-2">{{ formatDate(news.date) }}</p>
            <h2 class="text-2xl font-bold text-fest-blue m-0 mb-4 leading-snug">{{ news.title }}</h2>
            <USeparator color="primary" class="mb-4"/>
            <div class="prose dark:prose-invert max-w-none">
              <MDC :value="news.fullText"/>
            </div>
          </div>
        </div>

        <div v-else class="text-sm text-neutral-500">Artikel nicht gefunden.</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {NewsDTO} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'

const route = useRoute()
const config = useRuntimeConfig()

const {data: news, pending} = useFetch<NewsDTO>(
    `${config.public.apiBaseUrl}/api/news/${route.params.id}`,
    {server: false}
)

const fmt = new Intl.DateTimeFormat('de-CH', {day: 'numeric', month: 'long', year: 'numeric'})
const formatDate = (d: string) => fmt.format(new Date(d))

useSeoMeta({
  title: computed(() => news.value ? `${news.value.title} · Schliere lacht` : 'News · Schliere lacht'),
})
</script>
