<template>
  <v-app>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KM4526B3" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </v-app>
</template>
<script lang="ts" setup>
import { useHead } from '#app'

useHead({
  titleTemplate: (titleChunk) => {
    const baseTitle = '住宅ローンシミュレーション'
    return titleChunk && baseTitle !== titleChunk ? `${titleChunk} - ${baseTitle}` : baseTitle;
  },
})
</script>
