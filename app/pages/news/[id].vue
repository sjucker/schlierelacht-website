<template>
  <div class="p-4 md:p-6 max-w-3xl">
    <div class="flex items-center gap-2 mb-6">
      <UButton to="/news" icon="i-lucide-chevron-left" variant="ghost" color="neutral" size="sm"/>
      <span class="text-sm text-neutral-400">News</span>
    </div>

    <div v-if="item">
      <!-- Image placeholder -->
      <div class="h-64 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
        <UIcon name="i-lucide-image" class="w-16 h-16 text-neutral-300 dark:text-neutral-600"/>
      </div>

      <p class="text-xs text-neutral-400 m-0 mb-2">{{ item.date }}</p>
      <h2 class="text-2xl font-bold text-fest-blue m-0 mb-4 leading-snug">{{ item.title }}</h2>
      <USeparator color="primary" class="mb-4"/>
      <p class="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed m-0">{{ item.content }}</p>
    </div>

    <div v-else class="text-sm text-neutral-500">Artikel nicht gefunden.</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const newsItems = [
  {
    id: 1,
    date: '15. Januar 2027',
    title: 'Schlierefäscht 2027 – die Vorbereitungen laufen auf Hochtouren',
    content: 'Das Organisations-Komitee des Schlierefäscht 2027 trifft sich regelmässig und arbeitet mit Hochdruck an den letzten Details. Vom 3. bis 12. September 2027 verwandelt sich Schlieren erneut in eine grosse Festmeile. Zehntausende Besucherinnen und Besucher werden erwartet – und das Programm verspricht unvergessliche Momente für die ganze Familie. Die Vorbereitungen laufen in allen Bereichen: Bühnen werden geplant, Künstler gebucht und die Infrastruktur aufgebaut. Das OK freut sich auf ein unvergessliches Fest für die ganze Region.',
  },
  {
    id: 2,
    date: '3. Februar 2027',
    title: 'Konzertprogramm: Hochkarätige Künstler bestätigt',
    content: 'Das Schlierefäscht 2027 kann sich über ein aussergewöhnliches Konzertprogramm freuen. Namhafte Schweizer Bands und internationale Gäste werden auf den verschiedenen Bühnen auftreten. Der Eintritt zu allen Konzerten ist wie gewohnt kostenlos – ein einzigartiges Angebot, das das Schlierefäscht von anderen Grossevents unterscheidet. Details zum Programm werden in Kürze auf dieser Website veröffentlicht.',
  },
  {
    id: 3,
    date: '20. Februar 2027',
    title: 'Sponsoren sichern den Erfolg des Festes',
    content: 'Dank der grosszügigen Unterstützung unserer Hauptsponsoren und Partner kann das Schlierefäscht 2027 in gewohnter Qualität stattfinden. Wir danken Stadt Schlieren, Event Schlieren, Jost Transport, Geistlich, Brem-Schwarz, STRABAG, Merbag, Bauhaus und der ZKB herzlich für ihr Engagement. Ihr Beitrag macht es möglich, dass der Eintritt zu allen Konzerten kostenlos bleibt.',
  },
  {
    id: 4,
    date: '10. März 2027',
    title: 'Gastro-Meile: Kulinarische Vielfalt auf höchstem Niveau',
    content: 'Auch 2027 wird die Gastro-Meile am Schlierefäscht wieder mit einer riesigen Auswahl an Speisen und Getränken aufwarten. Lokale Betriebe und auswärtige Gastronomen bieten von der Bratwurst bis zum Gourmet-Menü alles an. Besucher können sich auf frische Produkte aus der Region und internationale Köstlichkeiten freuen. Für alle Geschmäcker und Budgets ist etwas dabei.',
  },
  {
    id: 5,
    date: '1. April 2027',
    title: 'Festplan veröffentlicht – alle Informationen auf einen Blick',
    content: 'Der detaillierte Festplan für das Schlierefäscht 2027 ist ab sofort verfügbar. Er zeigt alle Bühnen, Zelte, Gastrobereiche und Attraktionen auf einen Blick. Den Plan gibt es zum Download auf dieser Website sowie gedruckt an verschiedenen Stellen in Schlieren und Umgebung. Wir empfehlen, den Plan vorab herunterzuladen und auszudrucken.',
  },
  {
    id: 6,
    date: '15. Mai 2027',
    title: 'Freiwillige gesucht – jetzt anmelden!',
    content: 'Für das Schlierefäscht 2027 werden noch Freiwillige in verschiedenen Bereichen gesucht: Auf- und Abbau, Betreuung der Gäste, Kassendienst und vieles mehr. Wer mithelfen möchte, kann sich direkt beim Organisations-Komitee melden. Als Dankeschön erhalten alle Helferinnen und Helfer ein spezielles Festshirt und Verpflegung. Meldet euch noch heute!',
  },
]

const item = computed(() => newsItems.find(n => n.id === Number(route.params.id)))

useSeoMeta({
  title: computed(() => item.value ? `${item.value.title} · Schliere lacht` : 'News · Schliere lacht'),
})
</script>
