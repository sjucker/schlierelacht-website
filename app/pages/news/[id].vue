<template>
  <div class="p-4 md:p-6 max-w-3xl">
    <div class="flex items-center gap-2 mb-6">
      <UButton to="/news" icon="i-lucide-chevron-left" variant="ghost" color="neutral" size="sm"/>
      <span class="text-sm text-neutral-400">News</span>
    </div>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="!pending">
        <div v-if="news">
          <!-- Image -->
          <div class="h-64 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
            <NuxtImg
                v-if="news.cloudflareId"
                provider="cloudflare"
                :src="cloudflareUrl(news.cloudflareId)"
                :alt="news.title"
                class="w-full h-full object-cover"
            />
            <UIcon v-else name="i-lucide-image" class="w-16 h-16 text-neutral-300 dark:text-neutral-600"/>
          </div>

          <p class="text-xs text-neutral-400 m-0 mb-2">{{ formatDate(news.date) }}</p>
          <h2 class="text-2xl font-bold text-fest-blue m-0 mb-4 leading-snug">{{ news.title }}</h2>
          <USeparator color="primary" class="mb-4"/>
          <div class="prose dark:prose-invert max-w-none">
            <MDC :value="news.fullText"/>
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
