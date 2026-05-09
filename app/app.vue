<template>
  <UApp>
    <div class="flex flex-col md:h-screen">

      <!-- MOBILE TOP NAV (non-home pages only) -->
      <div v-if="!isHome" class="md:hidden flex-shrink-0 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <!-- Header bar: logo + hamburger -->
        <div class="flex items-center justify-between px-4 py-3 bg-fest-blue-light">
          <NuxtLink to="/" class="text-white font-bold text-lg tracking-tight">
            Schlierefäscht
          </NuxtLink>
          <button
              class="p-2 text-white"
              :aria-label="mobileNavOpen ? 'Navigation schliessen' : 'Navigation öffnen'"
              @click="mobileNavOpen = !mobileNavOpen"
          >
            <UIcon :name="mobileNavOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-6 h-6"/>
          </button>
        </div>
        <!-- Collapsible nav links -->
        <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
        >
          <nav v-if="mobileNavOpen" class="px-4 pb-4 not-prose border-t border-neutral-100 dark:border-neutral-800">
            <ul class="list-none p-0 m-0 flex flex-col gap-1 pt-2">
              <li v-for="item in navItems" :key="item.to">
                <UButton :to="item.to" size="xl" variant="ghost" color="neutral" class="w-full justify-start text-fest-blue font-semibold">{{ item.label }}</UButton>
              </li>
            </ul>
          </nav>
        </Transition>
      </div>

      <!-- Row: sidebar + page content -->
      <div class="flex-1 flex flex-col md:flex-row md:overflow-hidden">

        <!-- LEFT SIDEBAR (desktop only) -->
        <aside
            class="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0
                       md:overflow-y-auto border-r border-neutral-200 dark:border-neutral-800">
          <NuxtLink to="/" class="block p-4 pt-6">
            <img src="/logo.svg" alt="Schlierefäscht Logo" class="w-full">
          </NuxtLink>
          <nav class="flex-1 px-3 py-2 not-prose">
            <ul class="list-none p-0 m-0 flex flex-col gap-1">
              <li v-for="item in navItems" :key="item.to">
                <UButton :to="item.to" size="xl" variant="ghost" color="neutral" class="w-full justify-start text-fest-blue font-semibold">{{ item.label }}</UButton>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- PAGE CONTENT -->
        <main class="flex-1 md:overflow-y-auto">
          <NuxtPage/>
        </main>

      </div>

      <!-- MOBILE BOTTOM NAV (home page only, after hero) -->
      <nav v-if="isHome" class="md:hidden border-t border-neutral-200 dark:border-neutral-800 p-4 not-prose">
        <ul class="list-none p-0 m-0 flex flex-col gap-1">
          <li v-for="item in navItems" :key="item.to">
            <UButton :to="item.to" size="xl" variant="ghost" color="neutral" class="w-full justify-start text-fest-blue font-semibold">{{ item.label }}</UButton>
          </li>
        </ul>
      </nav>

      <!-- FOOTER -->
      <footer
          class="flex-shrink-0 border-t border-neutral-200 dark:border-neutral-800
                     bg-white dark:bg-neutral-900 px-6 py-4">

        <!-- Sponsor groups: horizontal on desktop, stacked on mobile -->
        <div class="flex flex-col md:flex-row md:items-start md:justify-start gap-4 md:gap-16">

          <!-- Veranstalter -->
          <div class="flex flex-col gap-1.5">
            <p class="m-0 text-xs font-semibold uppercase tracking-widest text-fest-blue">Veranstalter</p>
            <div class="flex items-center gap-5">
              <a href="https://www.schlieren.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/stadt-schlieren.png" alt="Stadt Schlieren" class="h-8 object-contain"></a>
              <a href="https://eventschlieren.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/event-schlieren.png" alt="Event Schlieren" class="h-8 object-contain"></a>
            </div>
          </div>

          <!-- Hauptsponsoren -->
          <div class="flex flex-col gap-1.5">
            <p class="m-0 text-xs font-semibold uppercase tracking-widest text-fest-blue">Hauptsponsoren</p>
            <div class="flex flex-wrap items-center gap-5">
              <a href="https://www.jost-transport.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/jost.png" alt="Jost" class="h-8 object-contain"></a>
              <a href="https://www.geistlich.com/de-ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/geistlich.png" alt="Geistlich" class="h-8 object-contain"></a>
              <a href="https://brem-schwarz.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/brem-schwarz.png" alt="Brem Schwarz" class="h-8 object-contain"></a>
              <a href="https://www.strabag.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/strabag.png" alt="Strabag" class="h-8 object-contain"></a>
              <a href="https://www.merbag.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/merbag.png" alt="Merbag" class="h-8 object-contain"></a>
              <a href="https://www.bauhaus.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/bauhaus.png" alt="Bauhaus" class="h-8 object-contain"></a>
              <a href="https://www.zkb.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/zkb.png" alt="ZKB" class="h-8 object-contain"></a>
            </div>
          </div>

          <!-- Medienpartner -->
          <div class="flex flex-col gap-1.5">
            <p class="m-0 text-xs font-semibold uppercase tracking-widest text-fest-blue">Medienpartner</p>
            <div class="flex items-center gap-5">
              <a href="https://www.limmattalerzeitung.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/liz.png" alt="Limmattaler Zeitung" class="h-8 object-contain"></a>
              <a href="https://www.radiozuerisee.ch/" target="_blank" rel="noopener noreferrer"><img src="/sponsoren/radio-zuerisee.png" alt="Radio Zürisee" class="h-8 object-contain"></a>
            </div>
          </div>

          <!-- Social Media -->
          <div class="flex flex-col gap-1.5">
            <p class="m-0 text-xs font-semibold uppercase tracking-widest text-fest-blue">Social Media</p>
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
const navItems = [
  { label: 'News', to: '/news' },
  { label: 'Programm', to: '/programm' },
  { label: 'Jahrgangstreffen', to: '/jahrgangstreffen' },
  { label: 'Festplan', to: '/festplan' },
  { label: 'Gastro', to: '/gastro' },
  { label: 'Wirtschaft & Gewerbe', to: '/wirtschaft' },
  { label: 'Sponsoren', to: '/sponsoren' },
  { label: 'Galerien', to: '/galerien' },
  { label: 'Über uns', to: '/info' },
]

const route = useRoute()
const isHome = computed(() => route.path === '/')
const mobileNavOpen = ref(false)

watch(() => route.path, () => {
  mobileNavOpen.value = false
})

useSeoMeta({
  description: 'Das nächste Schlierefäscht findet vom 3. bis 12. September 2027 statt.',
})
</script>
