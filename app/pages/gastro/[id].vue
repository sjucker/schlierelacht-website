<template>
  <AttractionDetail
      :external-id="externalId"
      back-to="/gastro"
      back-label="Gastro"
      meta-title-suffix=" · Gastro · Schliere lacht"
      meta-description-fallback="Gastronomieangebot am Schlierefäscht."
  />
</template>

<script setup lang="ts">
const route = useRoute()
const externalId = route.params.id as string
</script>
