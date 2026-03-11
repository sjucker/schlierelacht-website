<template>
  <UApp>

    <div class="container flex flex-col md:flex-row items-center md:items-stretch md:gap-12 p-4 m-auto prose md:prose-lg max-w-7xl">
      <div class="flex-1 relative">
        <NuxtImg src="/logo.svg" alt="Schlierefäscht Logo" densities="x1 x2" class="md:sticky md:top-12 md:left-0"/>
      </div>
      <div class="flex-3">
        <NuxtPage/>
      </div>
    </div>

    <UFooter>
      <template #left>
        <p class="text-sm">© {{ new Date().getFullYear() }} Schliere lacht · <NuxtLink to="/impressum" class="underline">Impressum</NuxtLink></p>
      </template>
      <template #right>
        <UButton
            size="xl"
            icon="i-simple-icons-facebook"
            color="primary"
            variant="link"
            to="https://www.facebook.com/schlierelacht"
            target="_blank"
            aria-label="Facebook"/>
        <UButton
            size="xl"
            icon="i-simple-icons-instagram"
            color="primary"
            variant="link"
            to="https://www.instagram.com/schlierelacht"
            target="_blank"
            aria-label="Instagram"/>
      </template>
    </UFooter>
  </UApp>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  meta: [
    {name: 'version', content: config.public.version}
  ]
})
</script>
