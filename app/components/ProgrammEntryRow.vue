<template>
  <NuxtLink
      :to="`/programm/${row.attraction.externalId}`"
      class="block px-2 py-2 text-sm border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
      :class="{ 'opacity-60': past }"
  >
    <!-- Mobile layout: Tag · Datum · Zeit, then Titel (bold) · Bühne -->
    <div class="md:hidden">
      <div class="flex flex-wrap gap-x-2 text-neutral-600 whitespace-nowrap">
        <span>{{ formatWeekday(row.entry.fromDate) }}</span>
        <span>{{ formatDateShort(row.entry.fromDate) }}</span>
        <span v-if="row.entry.fromTime">{{ formatTime(row.entry.fromTime) }}</span>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-2">
        <span class="font-semibold text-fest-blue">{{ row.attraction.name }}</span>
        <span class="text-neutral-600">{{ row.entry.location.name }}</span>
      </div>
    </div>

    <!-- Desktop layout: aligned grid columns -->
    <div :class="gridClass" class="hidden md:grid items-center">
      <div class="font-semibold text-fest-blue truncate">{{ row.attraction.name }}</div>
      <div class="text-neutral-600 whitespace-nowrap">{{ formatWeekday(row.entry.fromDate) }}</div>
      <div class="text-neutral-600 whitespace-nowrap">{{ formatDateShort(row.entry.fromDate) }}</div>
      <div class="text-neutral-600 whitespace-nowrap">{{ row.entry.fromTime ? formatTime(row.entry.fromTime) : '' }}</div>
      <div class="text-neutral-600 truncate">{{ row.entry.location.name }}</div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type {AttractionRefDTO, ProgrammEntryDTO} from '~~/shared/types/rest'
import formatDateShort from '~/utils/format-date-short'
import formatTime from '~/utils/format-time'
import formatWeekday from '~/utils/format-weekday'

defineProps<{
  row: { attraction: AttractionRefDTO; entry: ProgrammEntryDTO }
  // Same grid template as the page header, passed in so columns stay aligned.
  gridClass: string
  // Whether this entry is fully in the past (rendered muted in the "Vergangene Einträge" group).
  past?: boolean
}>()

// "Tag" column shows formatWeekday (e.g. "Mittwoch"), "Datum" formatDateShort ("03.09.2027").
</script>
