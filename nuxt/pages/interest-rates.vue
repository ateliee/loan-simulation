<template>
  <v-container class="py-8" fluid>
    <v-row>
      <!-- 左カラム：金利タイプ選択と銀行情報 -->
      <v-col cols="12" md="4">
        <v-card class="mb-4">
          <v-card-title class="text-subtitle-1 font-weight-bold">
            金利タイプ
          </v-card-title>
          <v-card-text>
            <v-btn-toggle
              v-model="selectedRateType"
              mandatory
              class="mb-4"
              block
            >
              <v-btn value="variable">
                変動金利
              </v-btn>
              <v-btn value="fixed">
                固定金利
              </v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
        <InterestRatesTypeSelector
          :selected-rate-type="selectedRateType"
          @update-charts="handleUpdateCharts"
        />
      </v-col>

      <!-- 右カラム：グラフ表示 -->
      <v-col cols="12" md="8">
        <InterestRatesCharts
          :store-rate-option="storeRateOption"
          :discount-option="discountOption"
          :applied-rate-option="appliedRateOption"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ref, computed } from 'vue'
import { useInterestRateChart } from '~/composables/useInterestRateChart'
import type { RateType } from '~/data/interest-rate'

definePageMeta({
  layout: 'default',
  layoutProps: {
    title: '銀行金利推移',
    description: '住宅ローンの変動金利と固定金利の推移をグラフで確認できます。',
  },
})

const selectedRateType = ref<RateType>('variable')

const {
  variableStoreRateOption,
  variableDiscountOption,
  variableAppliedRateOption,
  fixedStoreRateOption,
  fixedDiscountOption,
  fixedAppliedRateOption
} = useInterestRateChart().createChartsOptions()

const vVariableStoreRateOption = ref<EChartsOption>(variableStoreRateOption)
const vVariableDiscountOption = ref<EChartsOption>(variableDiscountOption)
const vVariableAppliedRateOption = ref<EChartsOption>(variableAppliedRateOption)
const vFixedStoreRateOption = ref<EChartsOption>(fixedStoreRateOption)
const vFixedDiscountOption = ref<EChartsOption>(fixedDiscountOption)
const vFixedAppliedRateOption = ref<EChartsOption>(fixedAppliedRateOption)

// 選択された金利タイプに応じてグラフオプションを切り替え
const storeRateOption = computed<EChartsOption>(() =>
  (selectedRateType.value === 'variable' ? vVariableStoreRateOption.value : vFixedStoreRateOption.value) as EChartsOption
)
const discountOption = computed<EChartsOption>(() =>
  (selectedRateType.value === 'variable' ? vVariableDiscountOption.value : vFixedDiscountOption.value) as EChartsOption
)
const appliedRateOption = computed<EChartsOption>(() =>
  (selectedRateType.value === 'variable' ? vVariableAppliedRateOption.value : vFixedAppliedRateOption.value) as EChartsOption
)

const handleUpdateCharts = () => {
  const {
    variableStoreRateOption,
    variableDiscountOption,
    variableAppliedRateOption,
    fixedStoreRateOption,
    fixedDiscountOption,
    fixedAppliedRateOption
  } = useInterestRateChart().createChartsOptions()

  vVariableStoreRateOption.value = (variableStoreRateOption)
  vVariableDiscountOption.value = (variableDiscountOption)
  vVariableAppliedRateOption.value = (variableAppliedRateOption)
  vFixedStoreRateOption.value = (fixedStoreRateOption)
  vFixedDiscountOption.value = (fixedDiscountOption)
  vFixedAppliedRateOption.value = (fixedAppliedRateOption)
}
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
