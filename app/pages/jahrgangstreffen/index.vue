<template>
  <div class="p-4 md:p-6 max-w-2xl">
    <h2 class="text-2xl font-bold text-fest-blue mb-1">Jahrgangstreffen</h2>
    <USeparator color="primary" class="mb-6"/>

    <!-- Intro text -->
    <div class="mb-6 space-y-3 text-neutral-700 dark:text-neutral-300">
      <p>Das Schlierefäscht bietet den perfekten Rahmen für ein Wiedersehen mit alten Schulkameraden und Freunden. Beim Jahrgangstreffen kommen alle Jahrgänge zusammen – für einen unvergesslichen Abend voller Erinnerungen.</p>
      <p>Melde dich an und sei dabei!</p>
    </div>

    <!-- Link to overview -->
    <div class="mb-8">
      <UButton to="/jahrgangstreffen/liste" variant="subtle" color="primary" trailing-icon="i-lucide-arrow-right">
        Zur Teilnehmerliste
      </UButton>
    </div>

    <!-- Success state -->
    <UAlert
        v-if="submitted"
        color="success"
        variant="subtle"
        icon="i-lucide-check-circle"
        title="Anmeldung erfolgreich!"
        description="Vielen Dank für deine Anmeldung. Wir freuen uns auf dich!"
        class="mb-6"
    />

    <!-- Form -->
    <template v-else>
      <h3 class="text-lg font-semibold text-fest-blue mb-4">Anmeldung</h3>

      <UAlert
          v-if="submitError"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-circle"
          title="Fehler beim Senden"
          :description="submitError"
          class="mb-4"
      />

      <UForm :state="form" :validate="validate" @submit="onSubmit" class="space-y-4">
        <div class="grid sm:grid-cols-2 gap-4">
          <UFormField label="Vorname" name="firstname" required>
            <UInput v-model="form.firstname" placeholder="Max" class="w-full"/>
          </UFormField>
          <UFormField label="Nachname" name="lastname" required>
            <UInput v-model="form.lastname" placeholder="Muster" class="w-full"/>
          </UFormField>
        </div>

        <UFormField label="E-Mail" name="email" required>
          <UInput v-model="form.email" type="email" placeholder="max.muster@example.com" class="w-full"/>
        </UFormField>

        <UFormField label="Telefon / Mobile" name="phone" hint="Optional">
          <UInput v-model="form.phone" type="tel" placeholder="+41 79 000 00 00" class="w-full"/>
        </UFormField>

        <UFormField label="Jahrgang" name="yearOfBirth" required>
          <UInput v-model.number="form.yearOfBirth" type="number" placeholder="1990" :min="1900" :max="new Date().getFullYear()" class="w-full"/>
        </UFormField>

        <UFormField name="showOnList">
          <UCheckbox
              v-model="form.showOnList"
              label="Ich möchte auf der Teilnehmerliste erscheinen"
          />
        </UFormField>

        <div class="pt-2">
          <UButton type="submit" color="primary" :loading="submitting">
            Anmelden
          </UButton>
        </div>
      </UForm>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {FormError} from '@nuxt/ui'

const config = useRuntimeConfig()

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  yearOfBirth: undefined as number | undefined,
  showOnList: false,
})

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref<string | undefined>(undefined)

const validate = (state: typeof form): FormError[] => {
  const errors: FormError[] = []
  if (!state.firstname.trim()) errors.push({name: 'firstname', message: 'Vorname ist erforderlich'})
  if (!state.lastname.trim()) errors.push({name: 'lastname', message: 'Nachname ist erforderlich'})
  if (!state.email.trim()) errors.push({name: 'email', message: 'E-Mail ist erforderlich'})
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.push({name: 'email', message: 'Ungültige E-Mail-Adresse'})
  if (!state.yearOfBirth) errors.push({name: 'yearOfBirth', message: 'Jahrgang ist erforderlich'})
  return errors
}

async function onSubmit() {
  submitting.value = true
  submitError.value = undefined
  try {
    await $fetch(`${config.public.apiBaseUrl}/api/meetup`, {
      method: 'POST',
      body: {
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        yearOfBirth: form.yearOfBirth,
        showOnList: form.showOnList,
      },
    })
    submitted.value = true
  } catch {
    submitError.value = 'Die Anmeldung konnte nicht gespeichert werden. Bitte versuche es später erneut.'
  } finally {
    submitting.value = false
  }
}

useSeoMeta({
  title: 'Jahrgangstreffen · Schliere lacht',
  description: 'Melde dich für das Jahrgangstreffen am Schlierefäscht an.',
})
</script>
