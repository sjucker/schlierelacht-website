<template>
  <UApp>

    <div class="container flex flex-col md:flex-row items-center md:items-stretch md:gap-12 p-4 m-auto prose md:prose-lg max-w-7xl">
      <div class="flex-1 relative">
        <NuxtLink to="/">
          <NuxtImg src="/logo.svg" alt="Schlierefäscht Logo" densities="x1 x2" class="md:sticky md:top-12 md:left-0"/>
        </NuxtLink>
        <nav class="md:sticky md:top-64 md:left-0 mt-8 not-prose">
          <ul class="flex flex-col gap-2 list-none p-0">
            <li>
              <UButton to="/" variant="ghost" color="neutral" class="w-full justify-start">Home</UButton>
            </li>
            <li>
              <UButton to="/artists" variant="ghost" color="neutral" class="w-full justify-start">Artists</UButton>
            </li>
          </ul>
        </nav>
      </div>
      <NuxtPage />
    </div>

    <UFooter>
      <template #left>
        <p class="text-sm">© {{ new Date().getFullYear() }} Schliere lacht · <span class="text-xs">v{{ $config.public.version }}</span></p>
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
useSeoMeta({
  description: 'Das nächste Schlierefäscht findet vom 3. bis 12. September 2027 statt.',
})
</script>
