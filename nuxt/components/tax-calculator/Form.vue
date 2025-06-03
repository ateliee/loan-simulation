<template>
  <v-card>
    <v-card-title>入力</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="calculate">
        <v-text-field
          v-model="annualIncome"
          label="年収（円）"
          type="number"
          :rules="[rules.required, rules.positive]"
          suffix="円"
          @input="calculate"
        />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const annualIncome = ref<number>(5000000)

const rules = {
  required: (v: number) => !!v || '必須項目です',
  positive: (v: number) => v > 0 || '0より大きい値を入力してください'
}

// 所得税の計算
const calculateIncomeTax = (income: number): number => {
  // 給与所得控除
  const deduction = calculateSalaryDeduction(income)
  const taxableIncome = income - deduction

  // 所得税率の計算
  let tax = 0
  if (taxableIncome <= 1_950_000) {
    tax = taxableIncome * 0.05
  } else if (taxableIncome <= 3_300_000) {
    tax = taxableIncome * 0.10 - 97_500
  } else if (taxableIncome <= 6_950_000) {
    tax = taxableIncome * 0.20 - 427_500
  } else if (taxableIncome <= 9_000_000) {
    tax = taxableIncome * 0.23 - 636_000
  } else if (taxableIncome <= 18_000_000) {
    tax = taxableIncome * 0.33 - 1_536_000
  } else if (taxableIncome <= 40_000_000) {
    tax = taxableIncome * 0.40 - 2_796_000
  } else {
    tax = taxableIncome * 0.45 - 4_796_000
  }

  return Math.max(0, Math.floor(tax))
}

// 給与所得控除の計算
const calculateSalaryDeduction = (income: number): number => {
  if (income <= 1_625_000) {
    return 550_000
  } else if (income <= 1_800_000) {
    return income * 0.4
  } else if (income <= 3_600_000) {
    return income * 0.3 + 180_000
  } else if (income <= 6_600_000) {
    return income * 0.2 + 540_000
  } else if (income <= 8_500_000) {
    return income * 0.1 + 1_200_000
  } else {
    return 1_950_000
  }
}

// 住民税の計算
const calculateResidentTax = (income: number): number => {
  // 給与所得控除
  const deduction = calculateSalaryDeduction(income)
  const taxableIncome = income - deduction

  // 住民税率（10%）
  const tax = taxableIncome * 0.10

  return Math.max(0, Math.floor(tax))
}

// 計算結果
const incomeTax = computed(() => calculateIncomeTax(annualIncome.value))
const residentTax = computed(() => calculateResidentTax(annualIncome.value))
const takeHomePay = computed(() => annualIncome.value - incomeTax.value - residentTax.value)

// 計算実行
const calculate = () => {
  // 入力値のバリデーション
  if (!annualIncome.value || annualIncome.value <= 0) {
    return
  }
}

// 親コンポーネントに計算結果を渡す
defineExpose({
  annualIncome,
  incomeTax,
  residentTax,
  takeHomePay
})
</script>
