<template>
  <UApp>

    <div class="container flex flex-col md:flex-row items-center md:items-stretch md:gap-12 p-4 m-auto prose md:prose-lg max-w-7xl">
      <div class="flex-1 relative">
        <NuxtImg src="/logo.svg" alt="Schlierefäscht Logo" densities="x1 x2" class="md:sticky md:top-12 md:left-0"/>
      </div>
      <div class="flex-3">
        <h2>Herzlich willkommen am Schlierefäscht vom<br>3. bis 12. September 2027</h2>
        <figure>
          <NuxtImg src="/front.jpg" alt="Foto: Daniel Santschi, Schlieren" desc densities="x1 x2" class="w-full rounded-lg prose:mb-0"/>
          <figcaption class="prose-sm">Foto: Daniel Santschi</figcaption>
        </figure>

        <USeparator color="primary"/>

        <h3>Kontakt</h3>
        <h4>Geschäftsstelle/Sekretariat</h4>
        <UCard variant="outline" class="prose-md">
          <template #default>
            Erika und Charly Mettier, <a href="tel:+41 79 456 79 69">079 456 79 69</a><br>
            Kampstrasse 6, 8952 Schlieren<br>
            <a href="mailto:erika@mettier.ch">erika@mettier.ch</a>, <a href="mailto:charly@mettier.ch">charly@mettier.ch</a>
          </template>
        </UCard>
        <h4>Organisations-Komitee</h4>
        <div class="grid lg:grid-cols-2 gap-2 pb-12">
          <PersonCard image-src="manuela-stiefel.jpg" name="Manuela Stiefel" role="Co-Präsidentin/Kommunikation" mail="manuela.stiefel@bluewin.ch" phone="079 377 57 67"/>
          <PersonCard image-src="rolf-wild.jpg" name="Rolf Wild" role="Co-Präsidentin/Kommunikation" mail="rowisc@bluewin.ch" phone="079 417 74 51"/>
          <PersonCard image-src="markus-baertschiger.jpg" name="Markus Bärtschiger" role="Stadt Schlieren/Stadtpräsident" mail="markus.baertschiger@schlieren.ch" phone="077 438 26 29"/>
          <PersonCard image-src="albert-schweizer.jpg" name="Albert Schweizer" role="Sponsoring" mail="albert.schweizer@schlieren.ch" phone="079 414 39 23"/>
          <PersonCard image-src="sabrina-berri.jpg" name="Sabrina Berri" role="Finanzen" mail="sabrinaberri@gmx.ch" phone="079 390 64 54"/>
          <PersonCard image-src="marco-lucchinetti.jpg" name="Marco Lucchinetti" role="Projekte" mail="marco.lucchinetti@notariate.zh.ch" phone="079 287 63 48"/>
          <PersonCard image-src="fabian-flueckiger.jpg" name="Fabian Flückiger" role="Bau" mail="f.flueckiger@effekte.ch" phone="079 665 91 92"/>
          <PersonCard image-src="barbara-gysling.jpg" name="Barbara Gysling" role="Aktivitäten/Programm" mail="cngschlieren@gmail.com" phone="079 344 44 89"/>
          <PersonCard image-src="jan-reiss.jpg" name="Jan Reiss" role="Gastronomie" mail="j.reiss@arbeitskette.ch" phone="079 136 30 86"/>
          <PersonCard image-src="daniel-gysling.jpg" name="Daniel Gysling" role="Sicherheit" mail="daniel.gysling@schlieren.ch" phone="079 779 66 41"/>
          <PersonCard image-src="flavio-impusino.jpg" name="Flavio Impusino" role="Sicherheit" mail="flavio.impusino@brogliag.ch" phone="079 434 06 29"/>
        </div>

        <USeparator color="primary"/>

        <h3>Downloads</h3>
        <h4>Logos</h4>
        <div class="flex flex-col md:flex-row gap-2 md:gap-4">
          <UButton to="/downloads/logo/logo-sf2027.eps" target="_blank" icon="i-lucide-file" size="md" color="primary" variant="subtle">Festlogo (EPS)</UButton>
          <UButton to="/downloads/logo/logo-sf2027.jpg" target="_blank" icon="i-lucide-file" size="md" color="primary" variant="subtle">Festlogo (JPG)</UButton>
          <UButton to="/downloads/logo/logo-sf2027.pdf" target="_blank" icon="i-lucide-file" size="md" color="primary" variant="subtle">Festlogo (PDF)</UButton>
          <UButton to="/downloads/logo/logo-sf2027.png" target="_blank" icon="i-lucide-file" size="md" color="primary" variant="subtle">Festlogo (PNG)</UButton>
        </div>
        <h4>Sponsoring</h4>
        <div class="flex flex-col md:flex-row gap-2 md:gap-4">
          <UButton to="/downloads/sponsoring/formular.pdf" target="_blank" icon="i-lucide-file" size="md" color="primary" variant="subtle">Anmeldeformular (PDF)</UButton>
          <UButton to="/downloads/sponsoring/prospekt.pdf" target="_blank" icon="i-lucide-file" size="md" color="primary" variant="subtle">Sponsorenprospekt (PDF)</UButton>
        </div>
      </div>
    </div>

    <UFooter>
      <!-- TODO social media -->
    </UFooter>
  </UApp>
</template>
<script setup lang="ts">
import PersonCard from "~/components/PersonCard.vue";

useSeoMeta({
  description: 'Das nächste Schlierefäscht findet vom 3. bis 12. September 2027 statt.',
})
</script>
