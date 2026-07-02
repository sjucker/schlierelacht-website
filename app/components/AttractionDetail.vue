<template>
  <div class="p-4 md:p-6 max-w-4xl">
    <div class="flex items-center gap-2 mb-4">
      <UButton :to="backTo" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
      <span class="text-sm text-neutral-400">{{ backLabel }}</span>
    </div>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Details.</div>
    <LoadingSpinner v-else-if="status === 'pending' || status === 'idle'"/>
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="status === 'success' && attraction" class="flex flex-col gap-6">
        <!-- Main image header -->
        <div v-if="mainImage" class="not-prose">
          <NuxtImg
              provider="cloudflare"
              loading="lazy"
              :src="cloudflareUrl(mainImage.cloudflareId)"
              :alt="attraction.name"
              class="w-full h-[250px] object-cover rounded-lg"/>
        </div>

        <!-- Title + social links -->
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-2xl font-bold text-fest-blue m-0">{{ attraction.name }}</h2>
          <div class="flex gap-2 shrink-0">
            <UButton v-if="attraction.website" :to="attraction.website" target="_blank" size="sm" color="primary" variant="ghost" icon="i-lucide-globe" aria-label="Website"/>
            <UButton v-if="attraction.instagram" :to="attraction.instagram" target="_blank" size="sm" color="primary" variant="ghost" icon="i-simple-icons-instagram" aria-label="Instagram"/>
            <UButton v-if="attraction.facebook" :to="attraction.facebook" target="_blank" size="sm" color="primary" variant="ghost" icon="i-simple-icons-facebook" aria-label="Facebook"/>
            <UButton v-if="attraction.youtube" :to="attraction.youtube" target="_blank" size="sm" color="primary" variant="ghost" icon="i-simple-icons-youtube" aria-label="YouTube"/>
          </div>
        </div>

        <!-- Upcoming programm -->
        <div v-if="futureProgramm.length" class="prose max-w-none">
          <h4>Programm</h4>
          <div class="not-prose grid gap-2">
            <UCard v-for="(entry, index) in futureProgramm" :key="index" variant="subtle" size="sm">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                <div class="text-sm font-medium">
                  {{ formatWhen(entry) }}
                </div>
                <UButton
                    :to="`/locations/${entry.location.externalId}`"
                    variant="link"
                    class="p-0 font-bold text-primary">
                  {{ entry.location.name }}
                </UButton>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Files -->
        <AttractionFiles :external-id="attraction.externalId" :files="attraction.files"/>

        <!-- Description -->
        <div v-if="attraction.description" class="prose max-w-none">
          <MDC :value="attraction.description"/>
        </div>

        <!-- Additional images -->
        <AttractionGallery :images="additionalImages"/>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {type AttractionDTO, ImageType, type ProgrammEntryDTO} from '~~/shared/types/rest'
import cloudflareUrl from '~/utils/cloudflare-url'
import formatDate from '~/utils/format-date'
import formatTime from '~/utils/format-time'

// Builds the "when" line, e.g.
//   "Mittwoch, 27.06.2026"                              (date only)
//   "Mittwoch, 27.06.2026, 18:00"                       (with fromTime)
//   "Mittwoch, 27.06.2026, 18:00 – 20:00"               (with toTime, same day)
//   "Mittwoch, 27.06.2026, 18:00 – Freitag, 29.06.2026, 20:00" (spanning days)
function formatWhen(entry: ProgrammEntryDTO): string {
  const fromTime = formatTime(entry.fromTime ?? '')
  const toTime = formatTime(entry.toTime ?? '')
  const showToDate = !!entry.toDate && entry.toDate !== entry.fromDate

  let to = ''
  if (showToDate) {
    to = formatDate(entry.toDate!)
    if (toTime) to = `${to}, ${toTime}`
  } else if (toTime) {
    to = toTime
  }

  const from = fromTime ? `${formatDate(entry.fromDate)}, ${fromTime}` : formatDate(entry.fromDate)
  return to ? `${from} – ${to}` : from
}

const props = defineProps<{
  externalId: string
  backTo: string
  backLabel: string
  metaTitleSuffix: string
  metaDescriptionFallback: string
}>()

const config = useRuntimeConfig()
const {data: attraction, status, error} = useFetch<AttractionDTO>(
    `${config.public.apiBaseUrl}/api/attraction/${props.externalId}`,
    {server: false}
)

const mainImage = computed(() => attraction.value?.images?.find(i => i.type === ImageType.MAIN))
const additionalImages = computed(() => attraction.value?.images?.filter(i => i.type === ImageType.ADDITIONAL) ?? [])
const futureProgramm = computed(() => attraction.value?.programm?.filter(e => !e.past) ?? [])

useSeoMeta({
  title: () => attraction.value ? `${attraction.value.name}${props.metaTitleSuffix}` : 'Schliere lacht',
  description: () => attraction.value?.description || props.metaDescriptionFallback,
})
</script>
