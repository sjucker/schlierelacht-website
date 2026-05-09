<template>
  <div class="p-4 md:p-6">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">News</h2>
    <USeparator color="primary" class="mb-6"/>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in newsItems"
        :key="item.id"
        class="flex flex-col rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <!-- Image -->
        <div class="h-48 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
          <UIcon name="i-lucide-image" class="w-16 h-16 text-neutral-300 dark:text-neutral-600"/>
        </div>

        <!-- Body -->
        <div class="flex flex-col gap-3 p-4 flex-1">
          <p class="text-xs text-neutral-400 m-0">{{ item.date }}</p>
          <h3 class="text-base font-bold text-fest-blue m-0 leading-snug">{{ item.title }}</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 m-0 line-clamp-4 leading-relaxed">{{ item.content }}</p>
          <div class="mt-auto pt-2">
            <UButton :to="`/news/${item.id}`" size="sm" color="primary" variant="subtle" trailing-icon="i-lucide-arrow-right">
              Mehr lesen
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const newsItems = [
  {
    id: 1,
    date: '15. Januar 2027',
    title: 'Schlierefäscht 2027 – die Vorbereitungen laufen auf Hochtouren',
    content: 'Das Organisations-Komitee des Schlierefäscht 2027 trifft sich regelmässig und arbeitet mit Hochdruck an den letzten Details. Vom 3. bis 12. September 2027 verwandelt sich Schlieren erneut in eine grosse Festmeile. Zehntausende Besucherinnen und Besucher werden erwartet – und das Programm verspricht unvergessliche Momente für die ganze Familie.',
  },
  {
    id: 2,
    date: '3. Februar 2027',
    title: 'Konzertprogramm: Hochkarätige Künstler bestätigt',
    content: 'Das Schlierefäscht 2027 kann sich über ein aussergewöhnliches Konzertprogramm freuen. Namhafte Schweizer Bands und internationale Gäste werden auf den verschiedenen Bühnen auftreten. Der Eintritt zu allen Konzerten ist wie gewohnt kostenlos – ein einzigartiges Angebot, das das Schlierefäscht von anderen Grossevents unterscheidet.',
  },
  {
    id: 3,
    date: '20. Februar 2027',
    title: 'Sponsoren sichern den Erfolg des Festes',
    content: 'Dank der grosszügigen Unterstützung unserer Hauptsponsoren und Partner kann das Schlierefäscht 2027 in gewohnter Qualität stattfinden. Wir danken Stadt Schlieren, Event Schlieren, Jost Transport, Geistlich, Brem-Schwarz, STRABAG, Merbag, Bauhaus und der ZKB herzlich für ihr Engagement.',
  },
  {
    id: 4,
    date: '10. März 2027',
    title: 'Gastro-Meile: Kulinarische Vielfalt auf höchstem Niveau',
    content: 'Auch 2027 wird die Gastro-Meile am Schlierefäscht wieder mit einer riesigen Auswahl an Speisen und Getränken aufwarten. Lokale Betriebe und auswärtige Gastronomen bieten von der Bratwurst bis zum Gourmet-Menü alles an. Besucher können sich auf frische Produkte aus der Region und internationale Köstlichkeiten freuen.',
  },
  {
    id: 5,
    date: '1. April 2027',
    title: 'Festplan veröffentlicht – alle Informationen auf einen Blick',
    content: 'Der detaillierte Festplan für das Schlierefäscht 2027 ist ab sofort verfügbar. Er zeigt alle Bühnen, Zelte, Gastrobereiche und Attraktionen auf einen Blick. Den Plan gibt es zum Download auf dieser Website sowie gedruckt an verschiedenen Stellen in Schlieren und Umgebung.',
  },
  {
    id: 6,
    date: '15. Mai 2027',
    title: 'Freiwillige gesucht – jetzt anmelden!',
    content: 'Für das Schlierefäscht 2027 werden noch Freiwillige in verschiedenen Bereichen gesucht: Auf- und Abbau, Betreuung der Gäste, Kassendienst und vieles mehr. Wer mithelfen möchte, kann sich direkt beim Organisations-Komitee melden. Als Dankeschön erhalten alle Helferinnen und Helfer ein spezielles Festshirt und Verpflegung.',
  },
]

useSeoMeta({
  title: 'News · Schliere lacht',
  description: 'Aktuelle Neuigkeiten rund um das Schlierefäscht 2027.',
})
</script>
