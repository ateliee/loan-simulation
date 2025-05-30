<template>
  <v-row>
    <v-alert
      type="warning"
      variant="tonal"
      class="mb-4"
      density="compact"
    >
      このデータはサンプルデータです。実際の金利とは異なる場合があります。
    </v-alert>

    <v-col cols="12">
      <InterestRatesChart
        title="店頭金利"
        :chart-option="storeRateOption"
      />
    </v-col>
    <v-col cols="12">
      <InterestRatesChart
        title="引き下げ幅"
        :chart-option="discountOption"
      />
    </v-col>
    <v-col cols="12">
      <InterestRatesChart
        title="適用金利"
        :chart-option="appliedRateOption"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

defineProps<{
  storeRateOption: EChartsOption
  discountOption: EChartsOption
  appliedRateOption: EChartsOption
}>()
</script>
