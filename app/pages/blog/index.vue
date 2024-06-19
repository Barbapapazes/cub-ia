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

const { data: articles, error: articlesError } = await useAsyncData('blog:articles', () => queryContent('/blog/').sort({ publishedAt: -1 }).find())

if (articlesError.value) {
  throw createError({
    statusCode: 404,
    message: 'Articles non trouvées',
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
        <UPageGrid v-if="articles">
          <UPageCard
            v-for="article in articles"
            :key="article._path"
            :to="article._path"
            :description="article.description"
            :ui="{ base: 'flex flex-col', body: { base: 'grow' } }"
          >
            <template #header>
              <h2 class="font-semibold text-lg">
                {{ article.title }}
              </h2>
            </template>
            <template #footer>
              <dl class="flex justify-between items-center">
                <dt class="sr-only">
                  Publié le
                </dt>
                <dd>
                  <time :datetime="toISOString(article.publishedAt)">{{ formatDate(article.publishedAt) }}</time>
                </dd>
                <dt class="sr-only">
                  Auteurs
                </dt>
                <dd>
                  <UAvatarGroup size="2xs">
                    <UAvatar
                      v-for="author in article.authors"
                      :key="author.name"
                      :name="author.name"
                      :src="author.picture"
                      :alt="`Photo de profil de ${author.name}`"
                    />
                  </UAvatarGroup>
                </dd>
              </dl>
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
