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
        <dl class="mt-8 flex justify-between text-gray-700 dark:text-gray-300 text-sm">
          <dt class="sr-only">
            Author
          </dt>
          <dd>
            <ol class="space-x-4">
              <li
                v-for="author in page.authors"
                :key="author.name"
              >
                <ULink
                  :to="author.social"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center gap-2"
                >
                  <UAvatar
                    :src="author.picture"
                    :alt="author.name"
                    size="sm"
                  />
                  <span>
                    {{ author.name }}
                  </span>
                </ULink>
              </li>
            </ol>
          </dd>
          <dt class="sr-only">
            Published at
          </dt>
          <dd>
            <time :datetime="page.publishedAt">
              {{ formatDate(page.publishedAt) }}
            </time>
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
              v-if="page.resources"
              class="hidden lg:block space-y-6"
              :class="{ '!mt-6': page.body?.toc?.links?.length }"
            >
              <UDivider />
              <UPageLinks
                :title="config.toc?.bottom?.title"
                :links="page.resources"
              />
            </div>
          </template>
        </UDocsToc>
      </template>
    </UPage>
  </UContainer>
</template>
