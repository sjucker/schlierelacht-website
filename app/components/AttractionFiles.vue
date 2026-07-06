<template>
  <div v-if="files.length" class="prose max-w-none">
    <h4>Downloads</h4>
    <div class="not-prose flex flex-col sm:flex-row sm:flex-wrap gap-2">
      <a
          v-for="file in files"
          :key="file.id"
          :href="`${config.public.apiBaseUrl}/api/attraction/${externalId}/files/${file.id}`"
          :download="file.filename"
          class="rounded-md font-medium inline-flex items-center transition-colors px-2.5 py-1.5 text-sm gap-1.5 text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <UIcon name="i-lucide-file" class="w-4 h-4 shrink-0"/>
        <span>{{ file.description }} ({{ fileExtension(file.filename) }}, {{ formatFileSize(file.filesize) }})</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {AttractionFileDTO} from '~~/shared/types/rest'
import fileExtension from '~/utils/file-extension'
import formatFileSize from '~/utils/format-file-size'

defineProps<{ externalId: string; files: AttractionFileDTO[] }>()

const config = useRuntimeConfig()
</script>
