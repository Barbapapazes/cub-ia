<script setup lang="ts">
const { data: page, error } = await useAsyncData('index', () => queryContent('/').findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <div class="bg-primary-500 absolute top-0 h-[625px] sm:h-[755px] lg:h-[895px] inset-x-0" />

    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
      :ui="{
        title: 'text-white selection:bg-primary-800',
        description: 'text-primary-100 selection:bg-primary-800',
      }"
    >
      <div
        v-if="page.hero.screenshot"
        class="bg-white/10 ring-1 ring-white/20 rounded-2xl lg:-m-4 p-4"
      >
        <img
          v-bind="page.hero.screenshot"
          :src="page.hero.screenshot.src"
          class="rounded-md shadow"
        >
      </div>

      <ULandingLogos
        :title="page.logos.title"
        align="center"
      >
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        />
      </ULandingLogos>
    </ULandingHero>

    <ULandingSection
      id="features"
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      v-if="page.testimonials"
      class="bg-gray-50 dark:bg-gray-900"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns>
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <UPageCard>
            <q class="italic text-lg text-gray-500 dark:text-gray-400">
              {{ testimonial.quote }}
            </q>

            <template #footer>
              <div class="flex items-center gap-3">
                <UAvatar
                  :src="testimonial.author.avatar"
                  :alt="testimonial.author.name"
                  loading="lazy"
                  size="md"
                />

                <div class="text-sm">
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ testimonial.author.name }}
                  </p>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ testimonial.author.title }}
                  </p>
                </div>
              </div>
            </template>
          </UPageCard>
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-primary-500">
      <ULandingCTA v-bind="page.cta" />
    </ULandingSection>
  </div>
</template>
