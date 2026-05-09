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
                     bg-white dark:bg-neutral-900 px-6 py-4">

        <!-- Sponsor groups: horizontal on desktop, stacked on mobile -->
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">

          <!-- Veranstalter -->
          <div class="flex flex-col gap-1.5">
            <p class="m-0 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Veranstalter</p>
            <div class="flex items-center gap-5">
              <img src="/sponsoren/stadt-schlieren.png" alt="Stadt Schlieren" class="h-8 object-contain" />
              <img src="/sponsoren/event-schlieren.png" alt="Event Schlieren" class="h-8 object-contain" />
            </div>
          </div>

          <!-- Hauptsponsoren -->
          <div class="flex flex-col gap-1.5 md:flex-1">
            <p class="m-0 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Hauptsponsoren</p>
            <div class="flex flex-wrap items-center gap-5">
              <img src="/sponsoren/jost.png" alt="Jost" class="h-8 object-contain" />
              <img src="/sponsoren/geistlich.png" alt="Geistlich" class="h-8 object-contain" />
              <img src="/sponsoren/brem-schwarz.png" alt="Brem Schwarz" class="h-8 object-contain" />
              <img src="/sponsoren/strabag.png" alt="Strabag" class="h-8 object-contain" />
              <img src="/sponsoren/merbag.png" alt="Merbag" class="h-8 object-contain" />
              <img src="/sponsoren/bauhaus.png" alt="Bauhaus" class="h-8 object-contain" />
              <img src="/sponsoren/zkb.png" alt="ZKB" class="h-8 object-contain" />
            </div>
          </div>

          <!-- Medienpartner -->
          <div class="flex flex-col gap-1.5">
            <p class="m-0 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Medienpartner</p>
            <div class="flex items-center gap-5">
              <img src="/sponsoren/liz.png" alt="Liz" class="h-8 object-contain" />
              <img src="/sponsoren/radio-zuerisee.png" alt="Radio Zürisee" class="h-8 object-contain" />
            </div>
          </div>

          <!-- Social Media -->
          <div class="flex flex-col gap-1.5">
            <p class="m-0 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Social Media</p>
            <div class="flex items-center gap-2">
              <UButton
                size="xl"
                icon="i-simple-icons-facebook"
                color="primary"
                variant="solid"
                to="https://www.facebook.com/schlierelacht"
                target="_blank"
                aria-label="Facebook"
                class="rounded"
              />
              <UButton
                size="xl"
                icon="i-simple-icons-instagram"
                color="primary"
                variant="solid"
                to="https://www.instagram.com/schlierelacht"
                target="_blank"
                aria-label="Instagram"
                class="rounded"
              />
            </div>
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
