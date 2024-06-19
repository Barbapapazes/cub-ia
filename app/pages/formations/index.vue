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

const { data: courses, error: coursesError } = await useAsyncData('formations:courses', () => queryContent('/formations/').sort({ publishedAt: -1 }).find())

if (coursesError.value) {
  throw createError({
    statusCode: 404,
    message: 'Formations non trouvées',
  })
}
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
        <UPageGrid v-if="courses">
          <UPageCard
            v-for="course in courses"
            :key="course._path"
            :to="course._path"
            :description="course.description"
            :ui="{ base: 'flex flex-col', body: { base: 'grow' } }"
          >
            <template #header>
              <h2 class="font-semibold text-lg">
                {{ course.title }}
              </h2>
            </template>
            <template #footer>
              <dl class="flex justify-between items-center">
                <dt class="sr-only">
                  Niveau
                </dt>
                <dd class="flex items-center gap-2">
                  <span class="i-ph-chart-bar-duotone w-4 h-4" />
                  <span>
                    {{ course.level }}
                  </span>
                </dd>
                <dt class="sr-only">
                  Durée
                </dt>
                <dd class="flex items-center gap-2">
                  <span class="i-ph-clock-duotone w-4 h-4" />
                  <span>
                    {{ course.duration }}
                  </span>
                </dd>
              </dl>
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
      <ULandingSection
        v-if="page.section"
        :title="page.section.title"
        :description="page.section.description"
        :links="page.section.links"
        align="left"
      >
        <img
          :src="page.section.image"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        >
      </ULandingSection>
    </UPage>
  </UContainer>
</template>
