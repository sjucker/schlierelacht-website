<template>
  <div class="p-4 md:p-6 max-w-2xl">
    <div class="flex items-center gap-2 mb-4">
      <UButton to="/jahrgangstreffen" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
      <span class="text-sm text-neutral-400">Jahrgangstreffen</span>
    </div>

    <h2 class="text-2xl font-bold text-fest-blue mb-1">Teilnehmerliste</h2>
    <USeparator color="primary" class="mb-6"/>

    <div v-if="error" class="text-sm text-red-600 mb-4">Fehler beim Laden der Teilnehmerliste.</div>

    <USelect
        v-model="selectedGroup"
        :items="MEETUP_JAHRGANG_OPTIONS"
        value-key="value"
        label-key="label"
        placeholder="Jahrgang wählen…"
        class="w-full mb-6"
        :loading="pending"
    />

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="selectedGroup">
        <template v-if="selectedEntries.length">
          <p class="text-xs text-neutral-400 mb-3 uppercase tracking-wide">
            {{ selectedEntries.length }} {{ selectedEntries.length === 1 ? 'Anmeldung' : 'Anmeldungen' }}
          </p>
          <ul class="space-y-1">
            <li
                v-for="entry in selectedEntries"
                :key="`${entry.lastname}-${entry.firstname}`"
                class="text-sm text-neutral-700"
            >
              {{ entry.lastname }}, {{ entry.firstname }}
            </li>
          </ul>
        </template>
        <LoadingSpinner v-else-if="status === 'pending' || status === 'idle'"/>
        <p v-else-if="status === 'success'" class="text-sm text-neutral-400">
          Noch keine Anmeldungen für diese Gruppe.
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {MeetupEntryDTO, MeetupJahrgang} from '~~/shared/types/rest'

const config = useRuntimeConfig()
const {data, pending, status, error} = useFetch<MeetupEntryDTO[]>(
    `${config.public.apiBaseUrl}/api/meetup`,
    {server: false}
)

const selectedGroup = ref<MeetupJahrgang | undefined>(undefined)

const selectedEntries = computed(() => {
  if (!selectedGroup.value) return []
  const entries = (data.value ?? []).filter(e => e.jahrgang === selectedGroup.value)
  return [...entries].sort((a, b) => a.lastname.localeCompare(b.lastname) || a.firstname.localeCompare(b.firstname))
})

useSeoMeta({
  title: 'Teilnehmerliste · Jahrgangstreffen · Schliere lacht',
})
</script>
