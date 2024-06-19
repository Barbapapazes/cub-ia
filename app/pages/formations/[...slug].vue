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
      <UPageHeader
        :title="page.title"
        :description="page.description"
      >
        <dl class="lg:hidden mt-8 flex gap-8 text-gray-700 dark:text-gray-300 text-sm">
          <dt class="sr-only">
            Niveau
          </dt>
          <dd class="flex items-center gap-2">
            <span class="i-ph-chart-bar-duotone w-4 h-4" />
            <span>
              {{ page.level }}
            </span>
          </dd>
          <dt class="sr-only">
            Durée
          </dt>
          <dd class="flex items-center gap-2">
            <span class="i-ph-clock-duotone w-4 h-4" />
            <span>
              {{ page.duration }}
            </span>
          </dd>
          <dt class="sr-only">
            Prix
          </dt>
          <dd class="flex items-center gap-2">
            <span class="i-ph-presentation-chart-duotone w-4 h-4" />
            <span>
              À partir de {{ page.price }}
            </span>
          </dd>
        </dl>
      </UPageHeader>

      <UPageBody prose>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
      </UPageBody>

      <template #right>
        <UDocsToc
          v-if="page.body?.toc"
          :links="page.body.toc.links"
          :title="config.toc?.title"
        >
          <template #bottom>
            <div
              class="hidden lg:block space-y-6"
              :class="{ '!mt-6': page.body?.toc?.links?.length }"
            >
              <UDivider />
              <UPageLinks
                title="Informations"
              >
                <dl class="flex flex-col gap-1 text-gray-700 dark:text-gray-300 text-sm">
                  <dt class="sr-only">
                    Niveau
                  </dt>
                  <dd class="flex items-center gap-2">
                    <span class="i-ph-chart-bar-duotone w-4 h-4" />
                    <span>
                      {{ page.level }}
                    </span>
                  </dd>
                  <dt class="sr-only">
                    Durée
                  </dt>
                  <dd class="flex items-center gap-2">
                    <span class="i-ph-clock-duotone w-4 h-4" />
                    <span>
                      {{ page.duration }}
                    </span>
                  </dd>
                  <dt class="sr-only">
                    Prix
                  </dt>
                  <dd class="flex items-center gap-2">
                    <span class="i-ph-presentation-chart-duotone w-4 h-4" />
                    <span>
                      À partir de {{ page.price }}
                    </span>
                  </dd>
                </dl>
              </UPageLinks>
            </div>
          </template>
        </UDocsToc>
      </template>
    </UPage>

    <ULandingSection
      v-if="page && page.testimonials"
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
  </UContainer>
</template>
