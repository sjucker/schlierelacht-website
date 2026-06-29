<template>
  <div class="p-4 md:p-6">
    <div class="flex items-center gap-2 mb-4">
      <UButton to="/gastro" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
      <span class="text-sm text-neutral-400">Gastro</span>
    </div>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Details.</div>
    <LoadingSpinner v-else-if="status === 'pending' || status === 'idle'"/>
    <Transition
        enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100">
      <div v-if="status !== 'pending' && status !== 'idle' && item" class="flex flex-col gap-6">
        <div v-if="mainImage" class="not-prose">
          <NuxtImg
              provider="cloudflare"
              loading="lazy"
              :src="cloudflareUrl(mainImage.cloudflareId)"
              :alt="item.name"
              class="w-full h-[250px] object-cover rounded-lg"
          />
        </div>

        <UCard variant="outline">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="font-bold text-fest-blue">{{ item.name }}</div>
              <div class="flex gap-2 not-prose">
                <UButton
                    v-if="item.website" :to="item.website" target="_blank" size="sm" color="primary"
                    variant="ghost" icon="i-lucide-globe" aria-label="Website"/>
                <UButton
                    v-if="item.instagram" :to="item.instagram" target="_blank" size="sm" color="primary"
                    variant="ghost" icon="i-simple-icons-instagram" aria-label="Instagram"/>
                <UButton
                    v-if="item.facebook" :to="item.facebook" target="_blank" size="sm" color="primary"
                    variant="ghost" icon="i-simple-icons-facebook" aria-label="Facebook"/>
                <UButton
                    v-if="item.youtube" :to="item.youtube" target="_blank" size="sm" color="primary"
                    variant="ghost" icon="i-simple-icons-youtube" aria-label="YouTube"/>
              </div>
            </div>
          </template>

          <template #default>
            <div class="prose max-w-none">
              <MDC :value="item.description"/>
            </div>
          </template>

          <template v-if="item.tags?.length" #footer>
            <div class="not-prose flex flex-wrap gap-2">
              <UBadge v-for="tag in item.tags" :key="tag.id" size="lg" color="primary" variant="outline">
                {{ tag.name }}
              </UBadge>
            </div>
          </template>
        </UCard>

        <AttractionFiles :external-id="item.externalId" :files="item.files"/>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {type AttractionDTO, ImageType} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'

const route = useRoute()
const externalId = route.params.id as string

const config = useRuntimeConfig()
const {data: item, status, error} = useFetch<AttractionDTO>(
    `${config.public.apiBaseUrl}/api/attraction/${externalId}`,
    {server: false}
)

const mainImage = computed(() => item.value?.images?.find(i => i.type === ImageType.MAIN))

useSeoMeta({
  title: () => item.value ? `${item.value.name} · Gastro · Schliere lacht` : 'Gastro · Schliere lacht',
  description: () => item.value?.description || 'Gastronomieangebot am Schlierefäscht.',
})
</script>
