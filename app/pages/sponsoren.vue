<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Sponsoren</h2>
    <USeparator color="primary" class="mb-6"/>

    <div class="mb-10 space-y-3 text-neutral-700 max-w-5xl">
      <p class="text-lg font-semibold text-fest-blue m-0">Herzlichen Dank</p>
      <p class="m-0">Allen unseren Sponsoren danken wir herzlich für ihr grosszügiges Engagement.</p>
      <p class="m-0">Auch beim Schlierefäscht 2027 soll wieder fast die Hälfte der Einnahmen durch Sponsoren erbracht werden. Unsere Sponsoring-Verantwortlicher Albert Schweizer hat attraktive
        Sponsoring-Pakete geschnürt und steht Interessenten gerne für ein Gespräch zur Verfügung: <a href="mailto:albert.schweizer@schlieren.ch" class="text-fest-blue underline">E-Mail</a>
      </p>
    </div>

    <LoadingSpinner v-if="loading"/>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="!loading">
        <div v-for="typeEntry in sortedSponsorTypes" :key="typeEntry.type" class="mb-20">
          <template v-if="sponsorsByType[typeEntry.type]?.length">
            <h3 class="text-lg font-semibold uppercase tracking-widest text-fest-blue mb-4">{{ typeEntry.description }}</h3>

            <!-- Gönner: simple text list instead of logo tiles -->
            <ul v-if="typeEntry.type === SponsoringType.GOENNER" class="flex flex-col gap-1 text-neutral-700">
              <li v-for="sponsor in sponsorsByType[typeEntry.type]" :key="sponsor.name">
                <a
                    v-if="sponsor.url"
                    :href="sponsor.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-fest-blue underline"
                >{{ sponsor.name }}</a>
                <span v-else>{{ sponsor.name }}</span>
              </li>
            </ul>

            <div v-else class="flex flex-wrap items-center gap-x-12 gap-y-4">
              <component
                  :is="sponsor.url ? 'a' : 'span'"
                  v-for="sponsor in sponsorsByType[typeEntry.type]"
                  :key="sponsor.name"
                  :href="sponsor.url || undefined"
                  :target="sponsor.url ? '_blank' : undefined"
                  :rel="sponsor.url ? 'noopener noreferrer' : undefined"
                  :title="sponsor.name"
              >
                <div class="w-[180px] h-[100px] flex items-center justify-center transition-transform duration-200 scale-90 hover:scale-100">
                  <NuxtImg
                      v-if="sponsor.cloudflareId"
                      provider="cloudflare"
                      loading="lazy"
                      :src="cloudflareUrl(sponsor.cloudflareId)"
                      :alt="sponsor.name"
                      class="max-w-full max-h-full object-contain"
                  />
                  <span v-else class="text-sm font-medium text-neutral-600 text-center">{{ sponsor.name }}</span>
                </div>
              </component>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {SponsoringDTO, SponsoringTypeDTO} from '~~/shared/types/rest';
import {SponsoringType} from '~~/shared/types/rest';
import cloudflareUrl from "~/utils/cloudflare-url";

const TYPE_ORDER: SponsoringType[] = [
  SponsoringType.ORGANISATION,
  SponsoringType.HAUPTSPONSOREN,
  SponsoringType.PARTNER,
  SponsoringType.GASTREGION,
  SponsoringType.GOLD,
  SponsoringType.SILBER,
  SponsoringType.BRONZE,
  SponsoringType.GOENNER,
]

const config = useRuntimeConfig()
const {data: sponsors, status: sponsorsStatus} = useFetch<SponsoringDTO[]>(
    `${config.public.apiBaseUrl}/api/sponsoring`,
    {server: false}
)
const {data: sponsorTypes, status: typesStatus} = useFetch<SponsoringTypeDTO[]>(
    `${config.public.apiBaseUrl}/api/sponsoring/type`,
    {server: false}
)

// Both endpoints feed the grouped layout, so wait for both before rendering.
const loading = computed(() =>
    [sponsorsStatus.value, typesStatus.value].some(s => s === 'pending' || s === 'idle')
)

const sortedSponsorTypes = computed(() =>
    [...(sponsorTypes.value ?? [])].sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
)

const sponsorsByType: ComputedRef<Record<SponsoringType, SponsoringDTO[]>> = computed(() => {
  const map: Record<SponsoringType, SponsoringDTO[]> = {}
  for (const sponsor of (sponsors.value ?? [])) {
    if (!map[sponsor.type]) map[sponsor.type] = []
    map[sponsor.type].push(sponsor)
  }
  return map
})

useSeoMeta({
  title: 'Sponsoren · Schliere lacht',
  description: 'Unsere Sponsoren und Partner des Schlierefäscht.',
})
</script>
