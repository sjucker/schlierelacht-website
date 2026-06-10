<template>
  <div class="p-4 md:p-6 max-w-2xl">
    <div class="flex items-center gap-2 mb-4">
      <UButton to="/jahrgangstreffen" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
      <span class="text-sm text-neutral-400">Jahrgangstreffen</span>
    </div>

    <h2 class="text-2xl font-bold text-fest-blue mb-1">Teilnehmerliste</h2>
    <USeparator color="primary" class="mb-6"/>

    <div v-if="error" class="text-sm text-red-600">Fehler beim Laden der Teilnehmerliste.</div>

    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="!pending && data?.length" class="space-y-8">
        <div v-for="group in groups" :key="group.value">
          <h3 class="text-xs font-semibold uppercase tracking-widest text-fest-blue mb-3">
            {{ group.label }}
          </h3>
          <ul class="space-y-1">
            <li
                v-for="entry in group.entries"
                :key="`${entry.lastname}-${entry.firstname}`"
                class="text-sm text-neutral-700 dark:text-neutral-300"
            >
              {{ entry.lastname }}, {{ entry.firstname }}
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {MeetupEntryDTO} from '~~/shared/types/rest'

const config = useRuntimeConfig()
const {data, pending, error} = useFetch<MeetupEntryDTO[]>(
    `${config.public.apiBaseUrl}/api/meetup`,
    {server: false}
)

const groups = computed(() => {
  const entries = data.value ?? []
  const byJahrgang = new Map<string, MeetupEntryDTO[]>()
  for (const entry of entries) {
    const key = entry.jahrgang
    if (!byJahrgang.has(key)) byJahrgang.set(key, [])
    byJahrgang.get(key)!.push(entry)
  }

  return MEETUP_JAHRGANG_OPTIONS
      .filter(opt => byJahrgang.has(opt.value))
      .map(opt => ({
        value: opt.value,
        label: opt.label,
        entries: [...byJahrgang.get(opt.value)!].sort(
            (a, b) => a.lastname.localeCompare(b.lastname) || a.firstname.localeCompare(b.firstname)
        ),
      }))
})

useSeoMeta({
  title: 'Teilnehmerliste · Jahrgangstreffen · Schliere lacht',
})
</script>
