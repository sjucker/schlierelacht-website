<template>
  <div class="prose p-4 md:p-6 max-w-5xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Über uns</h2>
    <USeparator color="primary" class="mb-6"/>

    <h3>Geschäftsstelle/Sekretariat</h3>
    <UCard variant="outline" class="prose-md">
      <template #default>
        Erika und Charly Mettier, <a href="tel:+41 79 456 79 69">079 456 79 69</a><br>
        Kampstrasse 6, 8952 Schlieren<br>
        <a href="mailto:info@schlierelacht.ch">info@schlierelacht.ch</a>
        , <a href="mailto:erika.mettier@schlierelacht.ch">erika.mettier@schlierelacht.ch</a>
      </template>
    </UCard>

    <h4>Organisations-Komitee</h4>
    <LoadingSpinner v-if="status === 'pending' || status === 'idle'"/>
    <div v-else-if="ok" class="not-prose">
      <div class="grid lg:grid-cols-2 gap-2 pb-8">
        <PersonCard
            v-for="member in ok.members"
            :key="member.name"
            :cloudflare-id="member.cloudflareId"
            :name="member.name"
            :ressort="member.role"
            :mail="member.email"
        />
      </div>

      <div v-for="team in teamsWithMembers" :key="team.name" class="mb-6">
        <h5 class="text-base font-semibold text-fest-blue mt-4 mb-2">{{ team.name }}</h5>
        <ul class="list-none pl-0 space-y-0.5">
          <li v-for="member in team.members" :key="member.name" class="text-sm text-neutral-700">
            <span>{{ member.name }}</span>
            <template v-if="member.email">, <a
                :href="'mailto:' + member.email"
                class="text-neutral-500 hover:text-fest-blue"
            >{{ member.email }}</a></template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {OkDTO} from '~~/shared/types/rest'
import {OkTeam} from '~~/shared/types/rest'
import PersonCard from '~/components/PersonCard.vue'

const TEAM_LABELS: Record<OkTeam, string> = {
  [OkTeam.PRAESIDIALES_STADT_KOMMUNIKATION_FINANZEN]: 'Präsidiales/Stadt/Kommunikation/Finanzen',
  [OkTeam.BAU_INFRASTRUKTUR]: 'Bau/Infrastruktur',
  [OkTeam.GASTRONOMIE]: 'Gastronomie',
  [OkTeam.PROGRAMM_AKTIVITAETEN]: 'Programm/Aktivitäten',
  [OkTeam.SICHERHEIT]: 'Sicherheit',
  [OkTeam.SPONSORING]: 'Sponsoring',
}

const TEAM_ORDER: OkTeam[] = [
  OkTeam.PRAESIDIALES_STADT_KOMMUNIKATION_FINANZEN,
  OkTeam.BAU_INFRASTRUKTUR,
  OkTeam.GASTRONOMIE,
  OkTeam.PROGRAMM_AKTIVITAETEN,
  OkTeam.SICHERHEIT,
  OkTeam.SPONSORING,
]

const config = useRuntimeConfig()
const {data: ok, status} = useFetch<OkDTO>(`${config.public.apiBaseUrl}/api/ok`, {server: false})

const teamsWithMembers = computed(() => {
  if (!ok.value) return []
  const membersByTeam = ok.value.teamMembers.reduce((acc, m) => {
    if (!acc[m.team]) acc[m.team] = []
    acc[m.team].push(m)
    return acc
  }, {} as Record<OkTeam, typeof ok.value.teamMembers>)

  return TEAM_ORDER
      .filter(team => membersByTeam[team]?.length)
      .map(team => ({name: TEAM_LABELS[team], members: membersByTeam[team]}))
})

useSeoMeta({
  title: 'Info · Schliere lacht',
  description: 'Kontakt, Organisations-Komitee, Downloads und Impressionen vom Schlierefäscht 2027.',
})
</script>
