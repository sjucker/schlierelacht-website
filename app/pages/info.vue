<template>
  <div class="prose p-4 md:p-6 max-w-5xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Über uns</h2>
    <USeparator color="primary" class="mb-6"/>

    <h3>Geschäftsstelle/Sekretariat</h3>
    <UCard variant="outline" class="prose-md">
      <template #default>
        Erika und Charly Mettier, <a href="tel:+41 79 456 79 69">079 456 79 69</a><br>
        Kampstrasse 6, 8952 Schlieren<br>
        <a href="mailto:info@schlierelacht.ch">info@schlierelacht.ch</a>
        , <a href="mailto:erika.mettier@schlierelacht.ch">erika.mettier@schlierelacht.ch</a>
      </template>
    </UCard>
    <h4>Organisations-Komitee</h4>
    <div class="grid lg:grid-cols-2 gap-2 pb-12 not-prose">
      <PersonCard image-src="manuela-stiefel.jpg" name="Manuela Stiefel" ressort="Co-Präsidentin/Kommunikation" mail="manuela.stiefel@schlierelacht.ch"/>
      <PersonCard image-src="rolf-wild.jpg" name="Rolf Wild" ressort="Co-Präsident/Kommunikation" mail="rolf.wild@schlierelacht.ch"/>
      <PersonCard image-src="markus-baertschiger.jpg" name="Markus Bärtschiger" ressort="Stadt Schlieren/Stadtpräsident" mail="markus.baertschiger@schlierelacht.ch"/>
      <PersonCard image-src="albert-schweizer.jpg" name="Albert Schweizer" ressort="Sponsoring" mail="albert.schweizer@schlierelacht.ch"/>
      <PersonCard image-src="sabrina-berri.jpg" name="Sabrina Berri" ressort="Finanzen" mail="sabrina.berri@schlierelacht.ch"/>
      <PersonCard image-src="marco-lucchinetti.jpg" name="Marco Lucchinetti" ressort="Projekte" mail="marco.lucchinetti@schlierelacht.ch"/>
      <PersonCard image-src="fabian-flueckiger.jpg" name="Fabian Flückiger" ressort="Bau" mail="fabian.flueckiger@schlierelacht.ch"/>
      <PersonCard image-src="barbara-gysling.jpg" name="Barbara Gysling" ressort="Aktivitäten/Programm" mail="event@schlierelacht.ch"/>
      <PersonCard image-src="jan-reiss.jpg" name="Jan Reiss" ressort="Gastronomie" mail="jan.reiss@schlierelacht.ch"/>
      <PersonCard image-src="daniel-gysling.jpg" name="Daniel Gysling" ressort="Sicherheit" mail="daniel.gysling@schlierelacht.ch"/>
      <PersonCard image-src="flavio-impusino.jpg" name="Flavio Impusino" ressort="Sicherheit" mail="flavio.impusino@schlierelacht.ch"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonCard from '~/components/PersonCard.vue'

useSeoMeta({
  title: 'Info · Schliere lacht',
  description: 'Kontakt, Organisations-Komitee, Downloads und Impressionen vom Schlierefäscht 2027.',
})
</script>
