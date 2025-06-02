<template>
  <v-app>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KM4526B3" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <AppHeader />

    <NuxtRouteAnnouncer />
    <v-main>
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style lang="scss" scoped>
.v-main {
  padding-top: 64px; // ヘッダーの高さ分の余白
}

:deep(.v-app-bar-title) {
  line-height: 1.2;
  padding: 8px 0;
}
</style>
