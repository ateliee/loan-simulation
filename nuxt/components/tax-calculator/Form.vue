<template>
  <v-card>
    <v-card-title>年収税金計算</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="isValid">
        <v-tabs v-model="activeTab" color="primary">
          <v-tab value="annual">年収から計算</v-tab>
          <v-tab value="monthly">月収とボーナスから計算</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <v-window-item value="annual">
            <v-select
              v-model="employmentType"
              label="雇用形態"
              :items="employmentTypeOptions"
              class="mt-4"
            />
            <v-text-field
              v-model="annualIncome"
              label="年収"
              type="number"
              :rules="[rules.required, rules.positive]"
              suffix="円"
              class="mt-4"
            />
          </v-window-item>

          <v-window-item value="monthly">
            <v-select
              v-model="employmentType"
              label="雇用形態"
              :items="employmentTypeOptions"
              class="mt-4"
            />
            <v-text-field
              v-model="monthlyIncome"
              label="月収"
              type="number"
              :rules="[rules.required, rules.positive]"
              suffix="円"
              class="mt-4"
            />
            <v-text-field
              v-model="bonus"
              label="ボーナス（年2回の合計）"
              type="number"
              :rules="[rules.required, rules.positive]"
              suffix="円"
              class="mt-4"
            />
          </v-window-item>
        </v-window>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TaxCalculationResultData, EmploymentType, EmploymentTypeOption } from '~/types/tax-calculator'

const form = ref()
const isValid = ref(false)
const activeTab = ref('annual')
const employmentType = ref<EmploymentType>('fullTime')

const annualIncome = ref<string>('5000000')
const monthlyIncome = ref<string>('350000')
const bonus = ref<string>('1000000')

const employmentTypeOptions: EmploymentTypeOption[] = [
  { title: '正社員', value: 'fullTime' },
  { title: 'パート・アルバイト', value: 'partTime' }
]

const rules = {
  required: (v: string) => !!v || '入力してください',
  positive: (v: string) => Number(v) > 0 || '0より大きい値を入力してください'
}

const emit = defineEmits<{
  (e: 'update:results', value: TaxCalculationResultData): void
}>()

// 給与所得控除額を計算
const getSalaryDeductionAmount = (income: number): number => {
  let deduction: number
  if (income <= 1_625_000) {
    deduction = 550_000
  } else if (income <= 1_800_000) {
    deduction = Math.floor(income * 0.4)
  } else if (income <= 3_600_000) {
    deduction = Math.floor(income * 0.3 + 180_000)
  } else if (income <= 6_600_000) {
    deduction = Math.floor(income * 0.2 + 540_000)
  } else if (income <= 8_500_000) {
    deduction = Math.floor(income * 0.1 + 1_200_000)
  } else {
    deduction = 1_950_000
  }
  // 控除額が年収を超えないようにする
  return Math.min(deduction, income)
}

// 基礎控除額を計算
const getBasicDeduction = (income: number): number => {
  if (income <= 24_000_000) {
    return 480_000
  } else if (income <= 24_500_000) {
    return 320_000
  } else if (income <= 25_000_000) {
    return 160_000
  } else {
    return 0
  }
}

// 社会保険料控除額を計算
const getSocialInsuranceDeduction = (healthInsurance: number, pension: number): number => {
  return healthInsurance + pension
}

// 所得税を計算
const calculateIncomeTax = (taxableIncome: number): number => {
  // 課税所得が0以下の場合は所得税を0とする
  if (taxableIncome <= 0) return 0

  if (taxableIncome <= 1_950_000) {
    return Math.floor(taxableIncome * 0.05)
  } else if (taxableIncome <= 3_300_000) {
    return Math.floor(taxableIncome * 0.1 - 97_500)
  } else if (taxableIncome <= 6_950_000) {
    return Math.floor(taxableIncome * 0.2 - 427_500)
  } else if (taxableIncome <= 9_000_000) {
    return Math.floor(taxableIncome * 0.23 - 636_000)
  } else if (taxableIncome <= 18_000_000) {
    return Math.floor(taxableIncome * 0.33 - 1_536_000)
  } else if (taxableIncome <= 40_000_000) {
    return Math.floor(taxableIncome * 0.4 - 2_796_000)
  } else {
    return Math.floor(taxableIncome * 0.45 - 4_796_000)
  }
}

// 住民税を計算
const calculateResidentTax = (taxableIncome: number): number => {
  // 課税所得が0以下の場合は住民税を0とする
  if (taxableIncome <= 0) return 0
  return Math.floor(taxableIncome * 0.1)
}

// 健康保険料を計算
const calculateHealthInsurance = (monthlyIncome: number): number => {
  if (employmentType.value === 'fullTime') {
    // 正社員の場合：厚生年金保険料率（9.81%）
    const rate = 0.0981
    return Math.floor(monthlyIncome * rate * 12)
  } else {
    // パート・アルバイトの場合：国民健康保険料率（都道府県・市区町村により異なるが、概算で8%）
    const rate = 0.08
    return Math.floor(monthlyIncome * rate * 12)
  }
}

// 年金保険料を計算
const calculatePension = (monthlyIncome: number): number => {
  if (employmentType.value === 'fullTime') {
    // 正社員の場合：厚生年金保険料率（9.15%）
    const rate = 0.0915
    return Math.floor(monthlyIncome * rate * 12)
  } else {
    // パート・アルバイトの場合：国民年金保険料（固定額）
    return 199_800 // 2024年度の国民年金保険料（月額16,650円 × 12ヶ月）
  }
}

const calculateTax = async () => {
  if (!form.value) return

  const { valid } = await form.value.validate()
  if (!valid) return

  let totalAnnualIncome: number
  let monthlyIncomeValue: number | undefined
  let bonusValue: number | undefined

  if (activeTab.value === 'annual') {
    totalAnnualIncome = Number(annualIncome.value)
    monthlyIncomeValue = Math.floor(totalAnnualIncome / 12)
  } else {
    totalAnnualIncome = Number(monthlyIncome.value) * 12 + Number(bonus.value)
    monthlyIncomeValue = Number(monthlyIncome.value)
    bonusValue = Number(bonus.value)
  }

  const salaryDeduction = getSalaryDeductionAmount(totalAnnualIncome)
  const healthInsurance = calculateHealthInsurance(monthlyIncomeValue)
  const pension = calculatePension(monthlyIncomeValue)
  const socialInsuranceDeduction = getSocialInsuranceDeduction(healthInsurance, pension)
  const basicDeduction = getBasicDeduction(totalAnnualIncome)

  // 課税所得の計算（給与所得控除、基礎控除、社会保険料控除を考慮）
  const taxableIncome = totalAnnualIncome - salaryDeduction - basicDeduction - socialInsuranceDeduction
  const incomeTax = calculateIncomeTax(taxableIncome)
  const residentTax = calculateResidentTax(taxableIncome)
  const takeHomePay = totalAnnualIncome - incomeTax - residentTax - healthInsurance - pension

  emit('update:results', {
    annualIncome: totalAnnualIncome,
    incomeTax,
    residentTax,
    healthInsurance,
    pension,
    takeHomePay,
    monthlyIncome: monthlyIncomeValue,
    bonus: bonusValue,
    salaryDeduction,
    basicDeduction,
    socialInsuranceDeduction,
    taxableIncome,
    employmentType: employmentType.value
  })
}

// 入力値の変更を監視
watch([annualIncome, monthlyIncome, bonus, activeTab, employmentType], () => {
  calculateTax()
}, { immediate: true })

// 外部からメソッドを呼び出せるように定義
defineExpose({
  calculateTax
})
</script>
