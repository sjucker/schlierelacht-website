<template>
  <div class="h-[100dvh] md:h-full relative overflow-hidden">

    <!-- Background image (opacity-60 per design) -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
      style="background-image: url('/background.jpg')"
    />

    <!-- Mobile: logo centered -->
    <div class="md:hidden absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
      <img src="/logo.svg" alt="Schlierefäscht Logo" class="w-2/3 max-w-xs" />
    </div>

    <!-- Title: bottom-left -->
    <div class="absolute bottom-16 left-4 md:left-8 text-white leading-none select-none pointer-events-none">
      <p class="text-xl md:text-3xl italic font-semibold m-0
                [text-shadow:1px_1px_4px_rgba(0,0,0,1)]">
        s'fröhliche
      </p>
      <p class="text-4xl md:text-7xl font-black italic m-0
                [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000,0_2px_0_#000,0_-2px_0_#000,2px_0_0_#000,-2px_0_0_#000]">
        Mega-Fäscht
      </p>
      <p class="text-xl md:text-3xl italic font-semibold m-0
                [text-shadow:1px_1px_4px_rgba(0,0,0,1)]">
        im zürcherische
      </p>
      <p class="text-4xl md:text-7xl font-black italic m-0
                [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000,0_2px_0_#000,0_-2px_0_#000,2px_0_0_#000,-2px_0_0_#000]">
        Limmattal
      </p>
    </div>

    <!-- Countdown: top center -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-10">
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
    <div class="absolute top-5 -right-14 bg-fest-yellow text-black font-bold text-[10px] md:text-xs
                px-20 py-2 rotate-[30deg] text-center leading-tight tracking-wide z-10">
      Freier Eintritt<br>zu allen Konzerten
    </div>

  </div>
</template>

<script setup lang="ts">
const TARGET = new Date('2027-09-03T17:00:00')
const now = ref(new Date())

const countdown = computed(() => {
  const diff = TARGET.getTime() - now.value.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes }
})

onMounted(() => {
  const interval = setInterval(() => { now.value = new Date() }, 1000)
  onUnmounted(() => clearInterval(interval))
})

useSeoMeta({
  description: 'Das nächste Schlierefäscht findet vom 3. bis 12. September 2027 statt.',
})
</script>
