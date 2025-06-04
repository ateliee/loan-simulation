<template>
  <v-card class="mt-4">
    <v-card-text>
      <div class="d-flex align-center">
        <v-icon color="primary" size="large" class="mr-3">mdi-cash-check</v-icon>
        <div class="flex-grow-1">
          <div class="text-h6 font-weight-bold text-primary">手取り額</div>
          <div class="text-caption text-medium-emphasis">
            年収 - 所得税 - 住民税 - 健康保険料 - 年金保険料
          </div>
        </div>
        <div class="text-right">
          <div class="text-h4 font-weight-bold text-primary">{{ formatNumber(takeHomePay) }}円</div>
          <div class="text-caption text-medium-emphasis">（月額 {{ formatNumber(Math.floor(takeHomePay / 12)) }}円）</div>
        </div>
      </div>
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
.v-card {
  background-color: rgb(var(--v-theme-primary-lighten-5));
}

@media (width <= 600px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }

  .text-h6 {
    font-size: 1rem !important;
  }

  .text-caption {
    font-size: 0.75rem;
  }
}
</style>
