<script lang="ts" setup>
const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
})

const config = useAppConfig()
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHero
        align="center"
        :title="page.title"
        :description="page.description"
      />
    </UPage>

    <UPageBody class="space-y-16">
      <div>
        <h2 class="text-2xl font-semibold">
          Nous envoyer un message
        </h2>
        <UForm class="mt-4 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <UFormGroup
              label="Prénom"
              name="firstname"
            >
              <UInput
                placeholder="John"
                type="firstname"
              />
            </UFormGroup>

            <UFormGroup
              label="Nom"
              name="lastname"
            >
              <UInput
                placeholder="Doe"
                type="lastname"
              />
            </UFormGroup>
          </div>

          <UFormGroup
            label="Email"
            name="email"
          >
            <UInput placeholder="john.doe@example.com" />
          </UFormGroup>

          <UFormGroup
            label="Sujet"
            name="subject"
          >
            <UInput placeholder="La grande thématique" />
          </UFormGroup>

          <UFormGroup
            label="Message"
            name="message"
          >
            <UTextarea placeholder="Le message que vous souhaitez nous envoyer" />
          </UFormGroup>

          <UButton type="submit">
            Envoyer
          </UButton>
        </UForm>
      </div>

      <UDivider />

      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-semibold">
            Adresse
          </h2>

          <address class="mt-4 not-italic">
            <p>
              88 Boulevard Lahitolle,
              <br>
              18000 Bourges
            </p>
          </address>
        </div>

        <div>
          <h2 class="text-2xl font-semibold">
            Nos Réseaux Sociaux
          </h2>

          <div class="mt-4">
            <FollowMe :socials="config.socials" />
          </div>
        </div>
      </div>
    </UPageBody>
  </UContainer>
</template>
