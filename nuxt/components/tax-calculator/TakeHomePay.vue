<template>
  <v-card class="mt-4 take-home-pay-card">
    <v-card-text>
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-icon color="primary" size="large">mdi-cash-plus</v-icon>
          </template>
          <div class="d-flex align-center justify-space-between w-100">
            <div>
              <v-list-item-title class="text-h6 mb-1">手取り額</v-list-item-title>
              <v-list-item-subtitle class="text-caption text-medium-emphasis">
                年収 - 所得税 - 住民税 - 健康保険料 - 厚生年金保険料
              </v-list-item-subtitle>
            </div>
            <div class="text-right">
              <span class="text-h4">{{ formatNumber(takeHomePay) }}</span>
              <span class="text-h6">円</span>
            </div>
          </div>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list-item>
          <template #prepend>
            <v-icon color="primary" size="large">mdi-cash-multiple</v-icon>
          </template>
          <div class="d-flex align-center justify-space-between w-100">
            <div>
              <v-list-item-title class="text-h6 mb-1">月々の手取り額</v-list-item-title>
              <v-list-item-subtitle class="text-caption text-medium-emphasis">
                手取り額 ÷ 12ヶ月
              </v-list-item-subtitle>
            </div>
            <div class="text-right">
              <span class="text-h4">{{ formatNumber(Math.floor(takeHomePay / 12)) }}</span>
              <span class="text-h6">円</span>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  takeHomePay: number
}>()

const formatNumber = (num: number): string => {
  return Number(num).toLocaleString('ja-JP')
}
</script>

<style lang="scss" scoped>
.take-home-pay-card {
  background-color: rgb(var(--v-theme-primary-lighten-5));
  border: 1px solid rgb(var(--v-theme-primary-lighten-3));
}

.v-list-item {
  padding: 20px;
}

.text-h4 {
  font-size: 2rem !important;
  font-weight: 500 !important;
  color: rgb(var(--v-theme-primary));
}

.text-h6 {
  font-size: 1.25rem !important;
  font-weight: 500 !important;
}
</style>
