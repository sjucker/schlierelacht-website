<template>
  <div class="h-dvh md:h-full relative overflow-hidden">

    <!-- Background image: cycles through all 6 with crossfade, client-only for random start -->
    <ClientOnly>
      <div class="absolute inset-0 opacity-40 md:opacity-90">
        <Transition name="bg-fade">
          <div
              :key="bgIndex"
              class="absolute inset-0 bg-cover bg-top bg-no-repeat"
              :style="`background-image: url('/background/${bgPad(bgIndex)}')`"
          />
        </Transition>
      </div>
    </ClientOnly>

    <!-- Mobile: logo centered + weiter button at bottom -->
    <div class="md:hidden absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none">
      <img src="/logo.svg" alt="Schlierefäscht Logo" class="w-4/5 max-w-xs">
    </div>
    <button
        class="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2
             text-black font-semibold px-8 py-2.5 rounded-full
             bg-fest-yellow hover:bg-fest-yellow/80
             flex items-center gap-2 transition-colors z-10"
        @click="scrollToNav"
    >
      weiter
      <UIcon name="i-lucide-chevron-down" class="w-4 h-4"/>
    </button>

    <!-- Title: bottom-left (desktop only) -->
    <div class="hidden md:block absolute bottom-28 left-4 md:left-24 text-white leading-none select-none pointer-events-none">
      <p
          class="text-xl md:text-4xl italic font-semibold m-0
                [text-shadow:1px_1px_4px_rgba(0,0,0,1)]">
        s'fröhliche
      </p>
      <p
          class="text-4xl md:text-8xl font-black italic m-0
                [text-shadow:3px_3px_0_#000,-3px_3px_0_#000,3px_-3px_0_#000,-3px_-3px_0_#000,0_3px_0_#000,0_-3px_0_#000,3px_0_0_#000,-3px_0_0_#000]">
        Mega-Fäscht
      </p>
      <p
          class="text-xl md:text-4xl italic font-semibold m-0 mt-3 ml-8 md:ml-16
                [text-shadow:1px_1px_4px_rgba(0,0,0,1)]">
        im zürcherische
      </p>
      <p
          class="text-4xl md:text-8xl font-black italic m-0 ml-8 md:ml-16
                [text-shadow:3px_3px_0_#000,-3px_3px_0_#000,3px_-3px_0_#000,-3px_-3px_0_#000,0_3px_0_#000,0_-3px_0_#000,3px_0_0_#000,-3px_0_0_#000]">
        Limmattal
      </p>
    </div>

    <!-- Countdown: top center (hidden once event has started) -->
    <div v-if="!countdownOver" class="absolute top-20 md:top-4 left-1/2 -translate-x-1/2 z-10">
      <div class="bg-fest-yellow/75 text-black rounded px-4 md:px-6 py-2 text-center">
        <p class="text-[10px] md:text-xs font-medium m-0 mb-1.5 hidden md:block">
          10 unvergessliche Tage in Schlieren. Es dauert nur noch:
        </p>
        <p class="text-[10px] font-medium m-0 mb-1 md:hidden">Es dauert noch:</p>
        <div class="flex gap-2 md:gap-5 justify-center items-end">
          <div class="text-center">
            <Transition
                enter-active-class="transition-all duration-500"
                enter-from-class="opacity-0 scale-150"
                enter-to-class="opacity-100 scale-100"
                mode="out-in"
            >
              <div :key="countdown.days" class="text-2xl md:text-4xl font-bold leading-none tabular-nums">
                {{ countdown.days }}
              </div>
            </Transition>
            <div class="text-[9px] md:text-xs uppercase tracking-wide">Tage</div>
          </div>
          <div class="text-xl md:text-3xl font-bold pb-4">:</div>
          <div class="text-center">
            <Transition
                enter-active-class="transition-all duration-500"
                enter-from-class="opacity-0 scale-150"
                enter-to-class="opacity-100 scale-100"
                mode="out-in"
            >
              <div :key="countdown.hours" class="text-2xl md:text-4xl font-bold leading-none tabular-nums">
                {{ String(countdown.hours).padStart(2, '0') }}
              </div>
            </Transition>
            <div class="text-[9px] md:text-xs uppercase tracking-wide">Std</div>
          </div>
          <div class="text-xl md:text-3xl font-bold pb-4">:</div>
          <div class="text-center">
            <Transition
                enter-active-class="transition-all duration-500"
                enter-from-class="opacity-0 scale-150"
                enter-to-class="opacity-100 scale-100"
                mode="out-in"
            >
              <div :key="countdown.minutes" class="text-2xl md:text-4xl font-bold leading-none tabular-nums">
                {{ String(countdown.minutes).padStart(2, '0') }}
              </div>
            </Transition>
            <div class="text-[9px] md:text-xs uppercase tracking-wide">Min</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ribbon: top-right corner (~30°) -->
    <div
        class="absolute top-7 lg:top-12 -right-12 lg:-right-20 bg-fest-yellow text-black font-bold text-xs lg:text-xl
                px-24 lg:px-44 py-2.5 lg:py-4 rotate-30 text-center leading-tight tracking-wide z-10">
      Freier Eintritt<br>zu allen Konzerten
    </div>

  </div>
</template>

<script setup lang="ts">
const TOTAL_BG = 6
const bgIndex = ref(Math.floor(Math.random() * TOTAL_BG))
const bgPad = (i: number) => `${String(i + 1).padStart(2, '0')}.jpg`

const TARGET = new Date('2027-09-03T17:00:00')
const now = ref(new Date())

const countdownOver = computed(() => TARGET.getTime() <= now.value.getTime())

const countdown = computed(() => {
  const diff = TARGET.getTime() - now.value.getTime()
  if (diff <= 0) return {days: 0, hours: 0, minutes: 0}
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return {days, hours, minutes}
})

function scrollToNav() {
  window.scrollBy({top: window.innerHeight, behavior: 'smooth'})
}

onMounted(() => {
  const bgInterval = setInterval(() => {
    bgIndex.value = (bgIndex.value + 1) % TOTAL_BG
  }, 10000)

  const clockInterval = setInterval(() => {
    now.value = new Date()
  }, 1000)

  onUnmounted(() => {
    clearInterval(bgInterval)
    clearInterval(clockInterval)
  })
})

useHead({
  link: Array.from({length: TOTAL_BG}, (_, i) => ({
    rel: 'preload',
    as: 'image',
    href: `/background/${bgPad(i)}`,
  })),
})

useSeoMeta({
  description: 'Das nächste Schlierefäscht findet vom 3. bis 12. September 2027 statt.',
})
</script>

<style scoped>
.bg-fade-enter-active {
  transition: opacity 1.5s ease;
}

.bg-fade-leave-active {
  transition: opacity 1.5s ease;
  position: absolute;
  inset: 0;
}

.bg-fade-enter-from {
  opacity: 0;
}

.bg-fade-leave-to {
  opacity: 0;
}
</style>
