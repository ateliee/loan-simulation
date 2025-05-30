<template>
  <v-container class="py-8" fluid>
    <v-row>
      <!-- 左カラム：金利タイプ選択と銀行情報 -->
      <v-col cols="12" md="4">
        <InterestRatesTypeSelector
          v-model:rate-type="selectedRateType"
        />
      </v-col>

      <!-- 右カラム：グラフ表示 -->
      <v-col cols="12" md="8">
        <InterestRatesCharts
          :store-rate-option="selectedRateType === 'variable' ? variableStoreRateOption : fixedStoreRateOption"
          :discount-option="selectedRateType === 'variable' ? variableDiscountOption : fixedDiscountOption"
          :applied-rate-option="selectedRateType === 'variable' ? variableAppliedRateOption : fixedAppliedRateOption"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInterestRateChart } from '~/composables/useInterestRateChart'

definePageMeta({
  layout: 'default',
  layoutProps: {
    title: '金利推移',
    description: '住宅ローンの変動金利と固定金利の推移をグラフで確認できます。',
  },
})

const { variableStoreRateOption, variableDiscountOption, variableAppliedRateOption, fixedStoreRateOption, fixedDiscountOption, fixedAppliedRateOption } = useInterestRateChart()

const selectedRateType = ref<'variable' | 'fixed'>('variable')
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
