<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">News</h2>
    <USeparator color="primary" class="mb-6"/>

    <LoadingSpinner v-if="status === 'pending' || status === 'idle'"/>

    <Transition
enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
                enter-to-class="opacity-100">
      <div v-if="status === 'success'">
        <div v-if="!news?.length" class="text-sm text-neutral-500">Aktuell sind keine News vorhanden.</div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
              v-for="item in news"
              :key="item.id"
              :to="`/news/${item.id}`"
              class="flex flex-col rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow"
          >
            <!-- Image -->
            <div
                class="relative h-48 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
              <template v-if="item.cloudflareId">
                <!-- blurred backdrop fills the box so portrait images have no empty bands -->
                <NuxtImg
                    provider="cloudflare"
                    :src="cloudflareUrl(item.cloudflareId)"
                    alt=""
                    aria-hidden="true"
                    class="absolute inset-0 w-full h-full object-cover scale-110 blur-xl"
                />
                <!-- full image, never cropped -->
                <NuxtImg
                    provider="cloudflare"
                    :src="cloudflareUrl(item.cloudflareId)"
                    :alt="item.title"
                    class="relative w-full h-full object-contain"
                />
              </template>
              <UIcon v-else name="i-lucide-image" class="w-16 h-16 text-neutral-300 dark:text-neutral-600"/>
            </div>

            <!-- Body -->
            <div class="flex flex-col gap-3 p-4 flex-1">
              <p class="text-xs text-neutral-400 m-0">{{ formatDate(item.date) }}</p>
              <h3 class="text-base font-bold text-fest-blue m-0 leading-snug">{{ item.title }}</h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400 m-0 line-clamp-4 leading-relaxed">
                {{ item.introText }}</p>
              <div class="mt-auto pt-2">
                <UButton size="sm" color="primary" variant="subtle" trailing-icon="i-lucide-arrow-right">
                  Mehr lesen
                </UButton>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {NewsDTO} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'

const config = useRuntimeConfig()
const {data: news, status} = useFetch<NewsDTO[]>(
    `${config.public.apiBaseUrl}/api/news`,
    {server: false}
)

const fmt = new Intl.DateTimeFormat('de-CH', {day: 'numeric', month: 'long', year: 'numeric'})
const formatDate = (d: string) => fmt.format(new Date(d))

useSeoMeta({
  title: 'News · Schliere lacht',
  description: 'Aktuelle Neuigkeiten rund um das Schlierefäscht 2027.',
})
</script>
