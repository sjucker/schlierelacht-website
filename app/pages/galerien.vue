<template>
  <div class="prose p-4 md:p-6 max-w-4xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Galerien</h2>
    <USeparator color="primary" class="mb-6"/>
    <h3>Impressionen</h3>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose">
      <div class="flex flex-col justify-between gap-4">
        <NuxtImg loading="lazy" src="/impressionen/1.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/2.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/3.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
      </div>
      <div class="flex flex-col justify-between gap-4">
        <NuxtImg loading="lazy" src="/impressionen/4.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/6.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/5.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
      </div>
      <div class="flex flex-col justify-between gap-4">
        <NuxtImg loading="lazy" src="/impressionen/8.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/9.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/7.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
      </div>
      <div class="flex flex-col justify-between gap-4">
        <NuxtImg loading="lazy" src="/impressionen/10.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/12.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
        <NuxtImg loading="lazy" src="/impressionen/11.jpg" alt="Impression: Schliere lacht 2023" densities="x1 x2" class="h-auto max-w-full rounded-lg"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Galerien · Schliere lacht',
})
</script>
