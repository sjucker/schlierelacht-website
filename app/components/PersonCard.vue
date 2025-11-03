<template>
  <UCard variant="outline">
    <template #default>
      <div class="flex flex-row gap-2">
        <div class="flex-3">
          <NuxtImg loading="lazy" :src="'/portraits/'+ props.imageSrc" :alt="props.name" desc densities="x1 x2" class="not-prose rounded-lg"/>
        </div>
        <div class="flex-5 prose-sm truncate">
          <strong>{{ props.name }}</strong><br>
          {{ props.ressort }}<br><br>
          <a v-if="props.mail" :href="'mailto:' + props.mail">{{ props.mail }}</a><br>
        </div>
      </div>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const props = defineProps({
  imageSrc: {type: String, required: true},
  name: {type: String, required: true},
  ressort: {type: String, required: true},
  mail: {type: String, required: true},
})
</script>
