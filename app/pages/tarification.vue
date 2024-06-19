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
  <UContainer>
    <UPage v-if="page">
      <UPageHero
        align="center"
        :title="page.title"
        :description="page.description"
      />

      <UPageBody>
        <UPricingGrid compact>
          <UPricingCard
            v-for="plan in page.plans"
            :key="plan.title"
            v-bind="plan"
          />
        </UPricingGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
