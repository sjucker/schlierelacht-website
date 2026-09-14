<template>
  <AttractionDetail
      :external-id="externalId"
      back-to="/wirtschaft"
      back-label="Wirtschaft & Gewerbe"
      meta-title-suffix=" · Wirtschaft & Gewerbe · Schliere lacht"
      meta-description-fallback="Sponsoren-Events und Wirtschafts-Anlässe rund um das Schlierefäscht."
  />
</template>

<script setup lang="ts">
const route = useRoute()
const externalId = route.params.id as string
</script>
