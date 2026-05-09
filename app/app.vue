<template>
  <UApp>
    <div class="flex flex-col md:h-screen">

      <!-- Row: sidebar + page content -->
      <div class="flex-1 flex flex-col md:flex-row md:overflow-hidden">

        <!-- LEFT SIDEBAR (desktop only) -->
        <aside class="hidden md:flex md:flex-col md:w-56 md:flex-shrink-0
                       md:overflow-y-auto border-r border-neutral-200 dark:border-neutral-800">
          <NuxtLink to="/" class="block p-6 pt-8">
            <img src="/logo.svg" alt="Schlierefäscht Logo" class="w-full" />
          </NuxtLink>
          <nav class="flex-1 px-3 py-2 not-prose">
            <ul class="list-none p-0 m-0 flex flex-col gap-1">
              <li><UButton to="/" variant="ghost" color="neutral" class="w-full justify-start">Home</UButton></li>
              <li><UButton to="/artists" variant="ghost" color="neutral" class="w-full justify-start">Künstler</UButton></li>
              <li><UButton to="/info" variant="ghost" color="neutral" class="w-full justify-start">Info</UButton></li>
            </ul>
          </nav>
        </aside>

        <!-- PAGE CONTENT -->
        <main class="flex-1 md:overflow-y-auto">
          <NuxtPage />
        </main>

      </div>

      <!-- MOBILE NAV (after page content, before footer) -->
      <nav class="md:hidden border-t border-neutral-200 dark:border-neutral-800 p-4 not-prose">
        <ul class="list-none p-0 m-0 flex flex-col gap-1">
          <li><UButton to="/" variant="ghost" color="neutral" class="w-full justify-start">Home</UButton></li>
          <li><UButton to="/artists" variant="ghost" color="neutral" class="w-full justify-start">Künstler</UButton></li>
          <li><UButton to="/info" variant="ghost" color="neutral" class="w-full justify-start">Info</UButton></li>
        </ul>
      </nav>

      <!-- FOOTER -->
      <footer class="flex-shrink-0 border-t border-neutral-200 dark:border-neutral-800
                     bg-neutral-50 dark:bg-neutral-900">
        <!-- Sponsor logos row -->
        <div class="flex flex-wrap items-center justify-center gap-4 px-4 py-3">
          <img src="/sponsoren/bauhaus.png" alt="Bauhaus" class="h-8 object-contain" />
          <img src="/sponsoren/brem-schwarz.png" alt="Brem Schwarz" class="h-8 object-contain" />
          <img src="/sponsoren/event-schlieren.png" alt="Event Schlieren" class="h-8 object-contain" />
          <img src="/sponsoren/geistlich.png" alt="Geistlich" class="h-8 object-contain" />
          <img src="/sponsoren/jost.png" alt="Jost" class="h-8 object-contain" />
          <img src="/sponsoren/liz.png" alt="Liz" class="h-8 object-contain" />
          <img src="/sponsoren/merbag.png" alt="Merbag" class="h-8 object-contain" />
          <img src="/sponsoren/radio-zuerisee.png" alt="Radio Zürisee" class="h-8 object-contain" />
          <img src="/sponsoren/stadt-schlieren.png" alt="Stadt Schlieren" class="h-8 object-contain" />
          <img src="/sponsoren/strabag.png" alt="Strabag" class="h-8 object-contain" />
          <img src="/sponsoren/zkb.png" alt="ZKB" class="h-8 object-contain" />
        </div>
        <!-- Copyright + social row -->
        <div class="flex justify-between items-center text-xs text-neutral-400 px-4 pb-2">
          <p class="m-0">© {{ new Date().getFullYear() }} Schliere lacht · <span>v{{ $config.public.version }}</span></p>
          <div class="flex">
            <UButton size="sm" icon="i-simple-icons-facebook" color="primary" variant="link"
                     to="https://www.facebook.com/schlierelacht" target="_blank" aria-label="Facebook" />
            <UButton size="sm" icon="i-simple-icons-instagram" color="primary" variant="link"
                     to="https://www.instagram.com/schlierelacht" target="_blank" aria-label="Instagram" />
          </div>
        </div>
      </footer>

    </div>
  </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
  description: 'Das nächste Schlierefäscht findet vom 3. bis 12. September 2027 statt.',
})
</script>
