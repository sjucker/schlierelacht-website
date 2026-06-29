<template>
  <div class="flex items-center justify-center py-12">
    <UIcon name="i-lucide-loader-circle" class="animate-spin size-8 text-fest-blue/60"/>
  </div>
</template>

<script setup lang="ts">
// Plain visual spinner for client-side data loads. Each page decides when to render it
// (typically `v-if="status === 'pending' || status === 'idle'"`). The `idle` case matters:
// with `useFetch(..., {server: false})` the request hasn't started during SSR / first paint,
// so gating only on `pending` would briefly fall through to an empty state.
</script>
