<template>
  <v-list>
    <v-list-item>
      <template #prepend>
        <v-icon color="primary">mdi-calculator</v-icon>
      </template>
      <v-list-item-title>登録免許税（所有権）</v-list-item-title>
      <div class="mt-1">
        <div>{{ registrationTax.toLocaleString() }}円</div>
        <div class="text-grey text-body-2">
          {{ roundAssessment(landValue).toLocaleString() }}円 × {{ (landRate * 100).toFixed(1) }}% +
          {{ roundAssessment(buildingValue).toLocaleString() }}円 × {{ (buildingRate * 100).toFixed(1) }}%
        </div>
      </div>
      <template #append>
        <v-tooltip location="top">
          <template #activator="{ props: tooltipProps }">
            <v-icon v-bind="tooltipProps" color="grey">mdi-information</v-icon>
          </template>
          <div class="text-body-2">
            <div class="font-weight-bold mb-2">計算方法：</div>
            <div>・評価額は1,000円未満切り捨て</div>
            <div>・納付額は100円未満切り捨て</div>
            <div>・納付額の最低金額は1,000円</div>
            <div v-if="propertyType === 'residential'" class="mt-2">
              <div v-if="propertyStatus === 'new'">
                <div>・新築住宅</div>
                <div> 土地：{{ (LAND_RATE_NEW * 100).toFixed(1) }}%</div>
                <div> 建物：{{ (BUILDING_RATE_NEW * 100).toFixed(1) }}%</div>
                <div v-if="isEcoFriendly"> ※省エネ住宅：建物部分{{ (ECO_FRIENDLY_REDUCTION * 100).toFixed(1) }}%軽減</div>
              </div>
              <div v-else>
                <div v-if="isFirstTime">
                  <div>・中古住宅（初めての住宅取得）</div>
                  <div> 土地：{{ (LAND_RATE_FIRST_TIME * 100).toFixed(1) }}%</div>
                  <div> 建物：{{ (BUILDING_RATE_FIRST_TIME * 100).toFixed(1) }}%</div>
                  <div v-if="isEcoFriendly"> ※省エネ住宅：建物部分{{ (ECO_FRIENDLY_REDUCTION * 100).toFixed(1) }}%軽減</div>
                </div>
                <div v-else>
                  <div>・中古住宅（通常）</div>
                  <div> 土地：{{ (LAND_RATE_USED * 100).toFixed(1) }}%</div>
                  <div> 建物：{{ (BUILDING_RATE_USED * 100).toFixed(1) }}%</div>
                  <div v-if="isEcoFriendly"> ※省エネ住宅：建物部分{{ (ECO_FRIENDLY_REDUCTION * 100).toFixed(1) }}%軽減</div>
                </div>
              </div>
            </div>
            <div v-else>
              <div>・店舗・事務所</div>
              <div> 土地：{{ (COMMERCIAL_RATE * 100).toFixed(1) }}%</div>
              <div> 建物：{{ (COMMERCIAL_RATE * 100).toFixed(1) }}%</div>
            </div>
          </div>
        </v-tooltip>
      </template>
    </v-list-item>
    <v-list-item v-if="mortgageAmount > 0">
      <template #prepend>
        <v-icon color="primary">mdi-home-lock</v-icon>
      </template>
      <v-list-item-title>抵当権設定登記の登録免許税</v-list-item-title>
      <div class="mt-1">
        <div>{{ mortgageTax.toLocaleString() }}円</div>
        <div class="text-grey text-body-2">
          借入金額{{ roundAssessment(mortgageAmount).toLocaleString() }}円 × {{ (MORTGAGE_RATE * 100).toFixed(1) }}%
        </div>
      </div>
      <template #append>
        <v-tooltip location="top">
          <template #activator="{ props: tooltipProps }">
            <v-icon v-bind="tooltipProps" color="grey">mdi-information</v-icon>
          </template>
          <div class="text-body-2">
            <div class="font-weight-bold mb-2">計算方法：</div>
            <div>・評価額は1,000円未満切り捨て</div>
            <div>・納付額は100円未満切り捨て</div>
            <div>・納付額の最低金額は1,000円</div>
            <div class="mt-2">・住宅ローン借入金額 × {{ (MORTGAGE_RATE * 100).toFixed(1) }}%</div>
            <div class="mt-2 text-grey">※住宅ローンを組む際に必要な抵当権設定登記の費用です</div>
            <div class="text-grey">※住宅ローンを組まない場合は不要です</div>
          </div>
        </v-tooltip>
      </template>
    </v-list-item>
    <v-list-item>
      <template #prepend>
        <v-icon color="primary">mdi-file-document</v-icon>
      </template>
      <v-list-item-title>司法書士報酬</v-list-item-title>
      <div class="mt-1">
        <div>{{ notaryFee.toLocaleString() }}円</div>
        <div class="text-grey text-body-2">
          所有権移転登記：基本報酬60,000円 + ({{ (landValue + buildingValue).toLocaleString() }}円 × 0.4%)
          <template v-if="mortgageAmount > 0">
            <br>抵当権設定登記：基本報酬60,000円 + ({{ mortgageAmount.toLocaleString() }}円 × 0.4%)
          </template>
        </div>
      </div>
      <template #append>
        <v-tooltip location="top">
          <template #activator="{ props: tooltipProps }">
            <v-icon v-bind="tooltipProps" color="grey">mdi-information</v-icon>
          </template>
          <div class="text-body-2">
            <div class="font-weight-bold mb-2">計算方法（業界基準）：</div>
            <div>・所有権移転登記</div>
            <div> 基本報酬：60,000円</div>
            <div> 物件価格に応じた報酬：不動産価格 × 0.4%</div>
            <div v-if="mortgageAmount > 0">
              <div class="mt-2">・抵当権設定登記</div>
              <div> 基本報酬：60,000円</div>
              <div> 借入金額に応じた報酬：借入金額 × 0.4%</div>
            </div>
            <div class="mt-2 text-grey">※この金額は業界基準に基づく目安です。実際の報酬は、物件の種類や司法書士によって異なる場合があります。</div>
          </div>
        </v-tooltip>
      </template>
    </v-list-item>
    <v-list-item>
      <template #prepend>
        <v-icon color="primary">mdi-cash-multiple</v-icon>
      </template>
      <v-list-item-title>合計費用（税込）</v-list-item-title>
      <div class="mt-1">
        <div>{{ totalCost.toLocaleString() }}円</div>
        <div class="text-grey text-body-2">
          登録免許税（所有権）{{ registrationTax.toLocaleString() }}円
          <template v-if="mortgageAmount > 0">
            + 抵当権設定登記の登録免許税{{ mortgageTax.toLocaleString() }}円
          </template>
          + 司法書士報酬{{ notaryFee.toLocaleString() }}円
        </div>
      </div>
      <template #append>
        <v-tooltip location="top">
          <template #activator="{ props: tooltipProps }">
            <v-icon v-bind="tooltipProps" color="grey">mdi-information</v-icon>
          </template>
          <div class="text-body-2">
            <div class="font-weight-bold mb-2">計算方法：</div>
            <div>・登録免許税（所有権）：{{ registrationTax.toLocaleString() }}円</div>
            <div v-if="mortgageAmount > 0">・抵当権設定登記の登録免許税：{{ mortgageTax.toLocaleString() }}円</div>
            <div>・司法書士報酬：{{ notaryFee.toLocaleString() }}円</div>
            <div class="mt-2">※実際の費用は、物件の状況や司法書士によって異なる場合があります。</div>
            <div>※司法書士報酬は、物件の種類によって変動する可能性があります。</div>
          </div>
        </v-tooltip>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 型定義
type PropertyType = 'residential' | 'commercial' | 'office'
type PropertyStatus = 'new' | 'used'

// 税率の定数定義
const LAND_RATE_NEW = 0.015 // 新築住宅の土地：1.5%
const LAND_RATE_FIRST_TIME = 0.015 // 中古住宅の土地（初めての住宅取得）：1.5%
const LAND_RATE_USED = 0.02 // 中古住宅の土地（通常）：2%
const BUILDING_RATE_NEW = 0.003 // 新築住宅の建物：0.3%
const BUILDING_RATE_FIRST_TIME = 0.003 // 中古住宅の建物（初めての住宅取得）：0.3%
const BUILDING_RATE_USED = 0.003 // 中古住宅の建物（通常）：0.3%
const ECO_FRIENDLY_REDUCTION = 0.001 // 省エネ住宅の軽減率：0.1%
const COMMERCIAL_RATE = 0.04 // 店舗・事務所：4%
const MORTGAGE_RATE = 0.004 // 抵当権設定：0.4%

// 計算用の定数
const ASSESSMENT_ROUNDING = 1000 // 評価額の切り捨て単位
const TAX_ROUNDING = 100 // 納付額の切り捨て単位
const MINIMUM_TAX = 1000 // 最低納付額

// 評価額の切り捨て計算
const roundAssessment = (value: number): number => {
  return Math.floor(value / ASSESSMENT_ROUNDING) * ASSESSMENT_ROUNDING
}

// 納付額の切り捨て計算（最低納付額を考慮）
const roundTax = (value: number): number => {
  const rounded = Math.floor(value / TAX_ROUNDING) * TAX_ROUNDING
  return Math.max(rounded, MINIMUM_TAX)
}

const props = defineProps<{
  propertyType: PropertyType
  propertyStatus: PropertyStatus
  isFirstTime: boolean
  isEcoFriendly: boolean
  landValue: number
  buildingValue: number
  mortgageAmount: number
}>()

// 税率を計算用に保持
const landRate = computed(() => {
  if (props.propertyType === 'residential') {
    if (props.propertyStatus === 'new') {
      return LAND_RATE_NEW
    } else {
      return props.isFirstTime ? LAND_RATE_FIRST_TIME : LAND_RATE_USED
    }
  }
  return COMMERCIAL_RATE
})

const buildingRate = computed(() => {
  if (props.propertyType === 'residential') {
    const baseRate = props.propertyStatus === 'new'
      ? BUILDING_RATE_NEW
      : (props.isFirstTime ? BUILDING_RATE_FIRST_TIME : BUILDING_RATE_USED)
    return props.isEcoFriendly ? baseRate - ECO_FRIENDLY_REDUCTION : baseRate
  }
  return COMMERCIAL_RATE
})

// 登録免許税の計算
const registrationTax = computed(() => {
  const roundedLandValue = roundAssessment(props.landValue)
  const roundedBuildingValue = roundAssessment(props.buildingValue)
  const landTax = roundTax(Math.floor(roundedLandValue * landRate.value))
  const buildingTax = roundTax(Math.floor(roundedBuildingValue * buildingRate.value))
  return landTax + buildingTax
})

// 抵当権設定の登録免許税の計算
const mortgageTax = computed(() => {
  const roundedMortgageAmount = roundAssessment(props.mortgageAmount)
  return roundTax(Math.floor(roundedMortgageAmount * MORTGAGE_RATE))
})

// 司法書士報酬の計算（業界基準）
const notaryFee = computed(() => {
  const baseFee = 60000 // 基本報酬（所有権移転登記）
  const totalValue = props.landValue + props.buildingValue
  const valueFee = Math.floor(totalValue * 0.004) // 物件価格の0.4%

  // 抵当権設定登記の報酬
  const mortgageBaseFee = props.mortgageAmount > 0 ? 60000 : 0 // 抵当権設定登記の基本報酬
  const mortgageFee = props.mortgageAmount > 0 ? Math.floor(props.mortgageAmount * 0.004) : 0 // 借入金額の0.4%

  return baseFee + valueFee + mortgageBaseFee + mortgageFee
})

// 合計費用
const totalCost = computed(() => {
  return registrationTax.value + mortgageTax.value + notaryFee.value
})
</script>
