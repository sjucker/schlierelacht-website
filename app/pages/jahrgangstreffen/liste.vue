<template>
  <div class="p-4 md:p-6 max-w-2xl">
    <div class="flex items-center gap-2 mb-4">
      <UButton to="/jahrgangstreffen" icon="i-lucide-chevron-left" variant="ghost" color="neutral"/>
      <span class="text-sm text-neutral-400">Jahrgangstreffen</span>
    </div>

    <h2 class="text-2xl font-bold text-fest-blue mb-1">Teilnehmerliste</h2>
    <USeparator color="primary" class="mb-6"/>

    <div v-if="pending" class="text-sm text-neutral-500">Lade Teilnehmerliste…</div>
    <div v-else-if="error" class="text-sm text-red-600">Fehler beim Laden der Teilnehmerliste.</div>
    <div v-else-if="!data?.length" class="text-sm text-neutral-500">Noch keine Anmeldungen vorhanden.</div>

    <div v-else class="space-y-8">
      <div v-for="group in groups" :key="group.label">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-fest-blue mb-3">
          {{ group.label }}
        </h3>
        <ul class="space-y-1">
          <li
              v-for="entry in group.entries"
              :key="`${entry.lastname}-${entry.firstname}-${entry.yearOfBirth}`"
              class="text-sm text-neutral-700 dark:text-neutral-300"
          >
            {{ entry.lastname }}, {{ entry.firstname }} <span class="text-neutral-400">({{ entry.yearOfBirth }})</span>
          </li>
        </ul>
      </div>
    </div>
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
  const entries = [...(data.value ?? [])].sort((a, b) =>
      a.yearOfBirth - b.yearOfBirth || a.lastname.localeCompare(b.lastname) || a.firstname.localeCompare(b.firstname)
  )

  const buckets = new Map<number, MeetupEntryDTO[]>()
  for (const entry of entries) {
    const bucket = Math.floor(entry.yearOfBirth / 5) * 5
    if (!buckets.has(bucket)) buckets.set(bucket, [])
    buckets.get(bucket)!.push(entry)
  }

  return Array.from(buckets.entries())
      .sort(([a], [b]) => a - b)
      .map(([start, entries]) => ({
        label: `Jahrgang ${start}–${start + 4}`,
        entries,
      }))
})

useSeoMeta({
  title: 'Teilnehmerliste · Jahrgangstreffen · Schliere lacht',
})
</script>
