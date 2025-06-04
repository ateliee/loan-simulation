<template>
  <v-app-bar>
    <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>
    <div class="d-md-none">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.title"
          />
        </v-list>
      </v-menu>
    </div>
    <div class="d-none d-md-flex">
      <v-btn
        v-for="(item, i) in menuItems"
        :key="i"
        :to="item.to"
        class="mx-2"
        :variant="item.variant"
      >
        {{ item.title }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
const route = useRoute()

const menuItems = [
  {
    title: '住宅ローンシミュレーション',
    to: '/',
    icon: 'mdi-home',
    variant: 'text' as const
  },
  {
    title: '登録免許税シミュレーション',
    to: '/registration-tax',
    icon: 'mdi-cash',
    variant: 'text' as const
  },
  {
    title: '仲介手数料シミュレーション',
    to: '/real-estate-fee',
    icon: 'mdi-handshake',
    variant: 'text' as const
  },
  {
    title: '銀行金利推移',
    to: '/interest-rates',
    icon: 'mdi-chart-line',
    variant: 'text' as const
  },
  {
    title: '年収計算',
    to: '/tax-calculator',
    icon: 'mdi-calculator',
    variant: 'text' as const
  }
]

const pageTitle = computed(() => {
  return (route.meta as PageMeta).layoutProps?.title || 'ローンシミュレーション'
})
</script>

<style lang="scss" scoped>
:deep(.v-app-bar-title) {
  line-height: 1.2;
  padding: 8px 0;
}
</style>
