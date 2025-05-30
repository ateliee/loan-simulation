<template>
  <v-app>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KM4526B3" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <v-app-bar>
      <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>
      <v-spacer />
      <v-btn to="/" class="mx-2">ローンシミュレーション</v-btn>
      <v-btn to="/registration-tax" class="mx-2">登録免許税シミュレーション</v-btn>
      <v-btn to="/real-estate-fee" class="mx-2">仲介手数料シミュレーション</v-btn>
    </v-app-bar>
    <NuxtRouteAnnouncer />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const route = useRoute()
const pageTitle = computed(() => {
  return (route.meta as PageMeta).layoutProps?.title || 'ローンシミュレーション'
})
</script>

<style lang="scss" scoped>
.v-main {
  padding-top: 64px; // ヘッダーの高さ分の余白
}
</style>
