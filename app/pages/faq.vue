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

      <ULandingFAQ
        :items="page.questions"
        :ui="{
          button: {
            label: 'font-semibold',
            trailingIcon: {
              base: 'w-6 h-6',
            },
          },
        }"
        multiple
        class="max-w-4xl mx-auto"
      />
    </UPage>

    <!-- <ULandingSection v-if="page" :title="page.title" :description="page.description" class="bg-gray-50">

    </ULandingSection> -->
  </UContainer>
</template>
