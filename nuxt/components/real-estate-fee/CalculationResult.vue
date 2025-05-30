<template>
  <v-list>
    <v-list-item>
      <template #prepend>
        <v-icon color="primary">mdi-calculator</v-icon>
      </template>
      <v-list-item-title>仲介手数料（税抜）</v-list-item-title>
      <div class="mt-1">
        <div>{{ fee.toLocaleString() }}円</div>
        <div class="text-grey text-body-2">
          {{ propertyPrice.toLocaleString() }}円 × {{ (rate * 100).toFixed(1) }}% + {{ baseFee.toLocaleString() }}円
        </div>
      </div>
      <template #append>
        <v-tooltip location="top">
          <template #activator="{ props: tooltipProps }">
            <v-icon v-bind="tooltipProps" color="grey">mdi-information</v-icon>
          </template>
          <div class="text-body-2">
            <div class="font-weight-bold mb-2">計算方法：</div>
            <div>・物件価格 × 手数料率 + 基本料金</div>
            <div class="mt-2">
              <div v-if="propertyType === 'residential'">
                <div>・住宅</div>
                <div> 手数料率：{{ (RESIDENTIAL_RATE * 100).toFixed(1) }}%</div>
                <div> 基本料金：{{ BASE_FEE.toLocaleString() }}円</div>
              </div>
              <div v-else>
                <div>・店舗・事務所</div>
                <div> 手数料率：{{ (COMMERCIAL_RATE * 100).toFixed(1) }}%</div>
                <div> 基本料金：{{ BASE_FEE.toLocaleString() }}円</div>
              </div>
            </div>
          </div>
        </v-tooltip>
      </template>
    </v-list-item>
    <v-list-item>
      <template #prepend>
        <v-icon color="primary">mdi-cash-multiple</v-icon>
      </template>
      <v-list-item-title class="text-h6 font-weight-bold">合計費用（税込）</v-list-item-title>
      <div class="mt-2">
        <div class="text-h5 font-weight-bold text-primary">{{ totalFee.toLocaleString() }}円</div>
        <div class="text-grey text-body-2 mt-2">
          仲介手数料（税抜）{{ fee.toLocaleString() }}円 + 消費税{{ consumptionTax.toLocaleString() }}円
        </div>
      </div>
      <template #append>
        <v-tooltip location="top">
          <template #activator="{ props: tooltipProps }">
            <v-icon v-bind="tooltipProps" color="grey">mdi-information</v-icon>
          </template>
          <div class="text-body-2">
            <div class="font-weight-bold mb-2">計算方法：</div>
            <div>・仲介手数料（税抜）：{{ fee.toLocaleString() }}円</div>
            <div>・消費税（{{ consumptionTaxRate }}%）：{{ consumptionTax.toLocaleString() }}円</div>
            <div class="mt-2">※実際の費用は、不動産会社によって異なる場合があります。</div>
            <div>※物件の種類や取引の複雑さによって変動する可能性があります。</div>
          </div>
        </v-tooltip>
      </template>
    </v-list-item>
    <v-list-item>
      <template #prepend>
        <v-icon color="primary">mdi-cog</v-icon>
      </template>
      <v-list-item-title>設定</v-list-item-title>
      <template #append>
        <v-btn
          variant="text"
          :icon="showSettings ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showSettings = !showSettings"
        />
      </template>
    </v-list-item>
  </v-list>

  <v-expand-transition>
    <div v-show="showSettings" class="pa-4">
      <v-text-field
        v-model.number="consumptionTaxRate"
        label="消費税率"
        type="number"
        min="0"
        max="100"
        step="1"
        prepend-inner-icon="mdi-percent"
        suffix="%"
        class="mb-4"
        hide-details
      />
      <v-alert
        type="info"
        variant="tonal"
        class="mb-4"
      >
        <div class="text-body-2">
          <div class="font-weight-bold mb-1">設定値について</div>
          <div>・消費税率は0〜100の間で設定（例：10%）</div>
          <div>・手数料率は宅地建物取引業法に基づく上限額です</div>
          <div>・実際の手数料は不動産会社によって異なる場合があります</div>
        </div>
      </v-alert>
    </div>
  </v-expand-transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// 手数料率の定数定義
const RESIDENTIAL_RATE = 0.03 // 住宅：3%
const COMMERCIAL_RATE = 0.05 // 店舗・事務所：5%
const BASE_FEE = 60000 // 基本料金：6万円

const props = defineProps<{
  /** 物件種別（住宅・店舗・事務所） */
  propertyType: string
  /** 物件価格 */
  propertyPrice: number
}>()

// 設定値の状態管理
const showSettings = ref(false)
const consumptionTaxRate = ref(10) // パーセント単位で初期値10%

// 手数料率を計算用に保持
const rate = computed(() => {
  return props.propertyType === 'residential' ? RESIDENTIAL_RATE : COMMERCIAL_RATE
})

// 基本料金
const baseFee = computed(() => BASE_FEE)

// 仲介手数料の計算（税抜）
const fee = computed(() => {
  return Math.floor(props.propertyPrice * rate.value + baseFee.value)
})

// 消費税の計算
const consumptionTax = computed(() => {
  return Math.floor(fee.value * (consumptionTaxRate.value / 100))
})

// 合計費用（税込）
const totalFee = computed(() => {
  return fee.value + consumptionTax.value
})
</script>
