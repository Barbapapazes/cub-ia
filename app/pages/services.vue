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
</script>

<template>
  <UContainer
    v-if="page"
    :ui="{ base: 'mb-16 xl:mb-32' }"
  >
    <ULandingHero
      :title="page.title"
      :description="page.description"
    />

    <UPricingGrid :ui="{ wrapper: 'flex flex-col lg:flex lg:flex-row w-full justify-center items-center gap-8' }">
      <UPricingCard
        v-for="plan in page.plans"
        :key="plan.title"
        v-bind="plan"
      />
    </UPricingGrid>

    <ULandingSection
      v-for="section in page.sections"
      :key="section.title"
      :title="section.title"
      :description="section.description"
      :links="section.links"
      :align="section.align"
    >
      <img
        :src="section.img.src"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </ULandingSection>

    <ULandingCTA
      v-if="page.cta"
      :title="page.cta.title"
      :description="page.cta.description"
      card
      :links="page.cta.links"
    />
  </UContainer>
</template>
