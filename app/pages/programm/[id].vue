<template>
  <AttractionDetail
      :external-id="externalId"
      back-to="/programm"
      back-label="zurück"
      meta-title-suffix=" – Schliere lacht"
      meta-description-fallback="Künstlerdetails am Schlierefäscht."
  />
</template>

<script setup lang="ts">
const route = useRoute()
const externalId = route.params.id as string
</script>
