<template>
  <v-card>
    <v-card-title>計算結果</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-cash</v-icon>
          </template>
          <v-list-item-title>年収</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{ formatNumber(annualIncome) }}円</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-cash-minus</v-icon>
          </template>
          <v-list-item-title>所得税</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{ formatNumber(incomeTax) }}円</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="text-caption text-medium-emphasis">
          <v-list-item-subtitle>{{ getIncomeTaxFormula(annualIncome) }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-cash-minus</v-icon>
          </template>
          <v-list-item-title>住民税</v-list-item-title>
          <v-list-item-subtitle class="text-right">{{ formatNumber(residentTax) }}円</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="text-caption text-medium-emphasis">
          <v-list-item-subtitle>{{ getResidentTaxFormula(annualIncome) }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-cash-plus</v-icon>
          </template>
          <v-list-item-title>手取り額</v-list-item-title>
          <v-list-item-subtitle class="text-right text-h6">{{ formatNumber(takeHomePay) }}円</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="text-caption text-medium-emphasis">
          <v-list-item-subtitle>年収 - 所得税 - 住民税</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  annualIncome: number
  incomeTax: number
  residentTax: number
  takeHomePay: number
}>()

const formatNumber = (num: number): string => {
  return Number(num).toLocaleString('ja-JP')
}

// 給与所得控除の計算式を取得
const getSalaryDeductionFormula = (income: number): string => {
  if (income <= 1_625_000) {
    return '550,000円（年収1,625,000円以下の場合）'
  } else if (income <= 1_800_000) {
    return `年収 × 40% = ${formatNumber(Math.floor(income * 0.4))}円`
  } else if (income <= 3_600_000) {
    return `年収 × 30% + 180,000円 = ${formatNumber(Math.floor(income * 0.3 + 180_000))}円`
  } else if (income <= 6_600_000) {
    return `年収 × 20% + 540,000円 = ${formatNumber(Math.floor(income * 0.2 + 540_000))}円`
  } else if (income <= 8_500_000) {
    return `年収 × 10% + 1,200,000円 = ${formatNumber(Math.floor(income * 0.1 + 1_200_000))}円`
  } else {
    return '1,950,000円（年収8,500,000円超の場合）'
  }
}

// 所得税の計算式を取得
const getIncomeTaxFormula = (income: number): string => {
  const deduction = getSalaryDeductionAmount(income)
  const taxableIncome = income - deduction

  if (taxableIncome <= 1_950_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 5%`
  } else if (taxableIncome <= 3_300_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 10% - 97,500円`
  } else if (taxableIncome <= 6_950_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 20% - 427,500円`
  } else if (taxableIncome <= 9_000_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 23% - 636,000円`
  } else if (taxableIncome <= 18_000_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 33% - 1,536,000円`
  } else if (taxableIncome <= 40_000_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 40% - 2,796,000円`
  } else {
    return `課税所得（${formatNumber(taxableIncome)}円）× 45% - 4,796,000円`
  }
}

// 住民税の計算式を取得
const getResidentTaxFormula = (income: number): string => {
  const deduction = getSalaryDeductionAmount(income)
  const taxableIncome = income - deduction
  return `課税所得（${formatNumber(taxableIncome)}円）× 10%`
}

// 給与所得控除額を計算
const getSalaryDeductionAmount = (income: number): number => {
  if (income <= 1_625_000) {
    return 550_000
  } else if (income <= 1_800_000) {
    return Math.floor(income * 0.4)
  } else if (income <= 3_600_000) {
    return Math.floor(income * 0.3 + 180_000)
  } else if (income <= 6_600_000) {
    return Math.floor(income * 0.2 + 540_000)
  } else if (income <= 8_500_000) {
    return Math.floor(income * 0.1 + 1_200_000)
  } else {
    return 1_950_000
  }
}
</script>

<style lang="scss" scoped>
.v-list-item-subtitle {
  min-width: 150px;
}
</style>
