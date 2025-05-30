<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { PageMeta } from '#app'

const route = useRoute()

const updateHead = () => {
  useHead({
    title: (route.meta as PageMeta).layoutProps?.title,
    meta: [
      { name: 'description', content: (route.meta as PageMeta).layoutProps?.description }
    ],
    titleTemplate: (titleChunk?: string) => {
      const baseTitle = '住宅シミュレーション'
      return titleChunk && baseTitle !== titleChunk ? `${titleChunk} - ${baseTitle}` : baseTitle;
    },
  })
}

// 初期表示時
updateHead()

// ルート変更時
watch(
  () => route.meta,
  () => {
    updateHead()
  },
  { deep: true }
)
</script>
