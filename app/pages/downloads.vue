<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Downloads</h2>
    <USeparator color="primary" class="mb-6"/>

    <Transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="!pending && data?.length">
        <div v-for="category in orderedCategories" :key="category" class="prose md:prose-lg mb-8">
          <template v-if="byCategory[category]?.length">
            <h3>{{ categoryLabel(category) }}</h3>
            <div class="flex flex-col md:flex-row gap-2 md:gap-4">
              <a
                  v-for="item in byCategory[category]"
                  :key="item.id"
                  :href="`${config.public.apiBaseUrl}/api/downloads/${item.id}/file`"
                  :download="item.filename"
                  class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-2.5 py-1.5 text-sm gap-1.5 text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <UIcon name="i-lucide-file" class="w-4 h-4 shrink-0"/>
                <span>{{ item.description }} ({{ fileExtension(item.filename) }})</span>
              </a>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {DownloadDTO} from '~~/shared/types/rest';
import {DownloadCategory} from '~~/shared/types/rest';

const config = useRuntimeConfig()
const {data, pending} = useFetch<DownloadDTO[]>(
    `${config.public.apiBaseUrl}/api/downloads`,
    {server: false}
)

const orderedCategories: DownloadCategory[] = [
  DownloadCategory.LOGOS,
  DownloadCategory.SPONSORING,
  DownloadCategory.GASTRONOMIE,
  DownloadCategory.PROGRAMM,
]

const categoryLabels: Record<DownloadCategory, string> = {
  [DownloadCategory.LOGOS]: 'Logos',
  [DownloadCategory.SPONSORING]: 'Sponsoring',
  [DownloadCategory.GASTRONOMIE]: 'Gastronomie',
  [DownloadCategory.PROGRAMM]: 'Programm',
}

const byCategory = computed<Record<DownloadCategory, DownloadDTO[]>>(() => {
  const map = {} as Record<DownloadCategory, DownloadDTO[]>
  for (const item of (data.value ?? [])) {
    if (!map[item.category]) map[item.category] = []
    map[item.category].push(item)
  }
  return map
})

function categoryLabel(category: DownloadCategory): string {
  return categoryLabels[category] ?? category
}

function fileExtension(filename: string): string {
  const ext = filename.split('.').pop()
  return ext ? ext.toUpperCase() : ''
}

useSeoMeta({
  title: 'Downloads · Schliere lacht',
  description: 'Logos, Programm und weitere Downloads zum Schlierefäscht.',
})
</script>
