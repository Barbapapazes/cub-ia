<script lang="ts" setup>
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [], transform: (items) => {
  for (const item of items) {
    if (item._path === '/blog' || item._path === '/formations' || item._path === '/services')
      delete item.children
  }

  return items
} })

const config = useAppConfig()

const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#18181b' : 'white')

useHead({
  titleTemplate: title => title ? `${title} - ${config.seo.siteName}` : `${config.seo.siteName}: ${config.seo.tagLine}`,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  ogSiteName: config.seo.siteName,
  twitterCard: 'summary_large_image',
})

const toast = useToast()

const email = ref<string>('')
function sendEmail() {
  email.value = ''
  toast.add({
    title: config.footer.newsletter.notification.title,
    icon: 'i-ph-check-duotone',
    color: 'green',
  })
}
</script>

<template>
  <UHeader :links="mapContentNavigation(navigation)">
    <template #logo>
      <img
        src="/icon.png"
        class="w-8 h-8"
      >
      <span>
        {{ config.seo.siteName }}
      </span>
    </template>
    <template #right>
      <div class="hidden lg:block">
        <FollowMe :socials="config.socials" />
      </div>
      <UTooltip
        v-if="config.header?.colorMode"
        class="mr-1 lg:mr-0 lg:ml-2"
        text="Toggle color mode"
        placement="bottom"
      >
        <UColorModeButton />
      </UTooltip>
    </template>
    <template #panel>
      <UAsideLinks :links="mapContentNavigation(navigation)" />
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <FollowMe :socials="config.socials" />
      </div>
    </template>
  </UHeader>

  <UContainer>
    <UMain>
      <UPage>
        <UPageError :error="error" />
      </UPage>
    </UMain>
  </UContainer>

  <UFooter :ui="{ top: { wrapper: 'bg-blue-50 dark:bg-blue-950' } }">
    <template #top>
      <UFooterColumns :links="config.footer.links">
        <template #right>
          <UFormGroup
            name="email"
            :label="config.footer.newsletter.label"
            size="lg"
          >
            <UInput
              v-model="email"
              type="email"
              :ui="{ icon: { trailing: { pointer: '' } } }"
            >
              <template #trailing>
                <UButton
                  type="submit"
                  size="2xs"
                  color="black"
                  :label="config.footer.newsletter.button"
                  @click="sendEmail"
                />
              </template>
            </UInput>
          </UFormGroup>
        </template>
      </UFooterColumns>
    </template>
    <template #left>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ config.seo.siteName }} - {{ new Date().getFullYear() }}
      </span>
    </template>
    <template #right>
      <FollowMe :socials="config.socials" />
    </template>
  </UFooter>

  <UNotifications />
</template>
