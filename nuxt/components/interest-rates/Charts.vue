<template>
  <div class="charts">
    <v-alert
      type="warning"
      variant="tonal"
      class="mb-4"
      density="compact"
    >
      このデータはAIサーチによるデータです。実際の金利とは異なる場合がありますのでご注意ください。
    </v-alert>

    <v-card class="mb-4">
      <v-card-title class="text-subtitle-1 font-weight-bold">
        適用金利
      </v-card-title>
      <v-card-text>
        <v-chart
          :key="`applied-rate-${updateKey}`"
          class="chart"
          :option="appliedRateOption"
          autoresize
        />
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title class="text-subtitle-1 font-weight-bold">
        引き下げ幅
      </v-card-title>
      <v-card-text>
        <v-chart
          :key="`discount-${updateKey}`"
          class="chart"
          :option="discountOption"
          autoresize
        />
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title class="text-subtitle-1 font-weight-bold">
        店頭金利
      </v-card-title>
      <v-card-text>
        <v-chart
          :key="`store-rate-${updateKey}`"
          class="chart"
          :option="storeRateOption"
          autoresize
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { ref, watch } from 'vue'

const props = defineProps<{
  storeRateOption: EChartsOption
  discountOption: EChartsOption
  appliedRateOption: EChartsOption
}>()

const updateKey = ref(0)

// オプションの変更を監視して、keyを更新
watch(
  () => [props.storeRateOption, props.discountOption, props.appliedRateOption],
  () => {
    updateKey.value++
  },
  { deep: true }
)
</script>

<style scoped>
.charts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart {
  height: 300px;
}
</style>
