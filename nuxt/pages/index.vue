<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12" md="4" class="bg-grey-lighten-4 rounded-lg">
        <div style="position: sticky; top: 32px; z-index: 10; max-height: calc(100vh - 64px); overflow-y: auto;">
          <LoanForm
            v-model:principal="principal"
            v-model:years="years"
            v-model:rate="rate"
            v-model:repayment-type="repaymentType"
            v-model:monthly-cost="monthlyCost"
            v-model:savings="savings"
            v-model:early-repayment-years="earlyRepaymentYears"
          />
          <LoanSummary
            :total-payment="totalPayment"
            :savings="savings"
            :total-savings="totalSavings"
            :early-repayment-total-payment="earlyRepaymentTotalPayment"
            :early-repayment-total-savings="earlyRepaymentTotalSavings"
            :early-repayment-remaining-principal="earlyRepaymentRemainingPrincipal"
          />
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <LoanResult
          :monthly-payment="monthlyPayment"
          :total-payment="totalPayment"
          :total-interest="totalInterest"
          :result-table="resultTable"
          :early-repayment-years="earlyRepaymentYears"
          :savings="savings"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { LoanResult } from '~/types/loan'

definePageMeta({
  layout: 'default',
  layoutProps: {
    title: 'ローンシミュレーション',
    description: '住宅ローンのシミュレーションをリアルタイムで行えます。借入金額、借入期間、金利、返済方式（元利均等・元金均等）を入力で、老後の資金計算もできます。',
  },
})

const principal = ref<number>(60000000)
const years = ref<number>(35)
const rate = ref<number>(0.8)
const repaymentType = ref('principalInterest')
const monthlyCost = ref<number>(20000)
const savings = ref<number>(200000)
const earlyRepaymentYears = ref<number | undefined>(undefined)

const months = computed(() => years.value * 12)
const monthlyRate = computed(() => rate.value / 100 / 12)

const resultTable = computed<LoanResult[]>(() => {
  const table: LoanResult[] = []
  let remaining = principal.value
  if (principal.value <= 0 || years.value <= 0) return table
  if (repaymentType.value === 'principalInterest') {
    // 元利均等返済
    const r = monthlyRate.value
    const n = months.value
    const p = principal.value
    const loanPayment = r === 0 ? p / n : p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    for (let i = 0; i < n; i++) {
      const interest = remaining * r
      const principalPayment = loanPayment - interest
      table.push({
        loanPayment: Math.round(loanPayment),
        cost: Math.round(monthlyCost.value),
        totalPayment: Math.round(loanPayment + monthlyCost.value),
        principalPayment: Math.round(principalPayment),
        interest: Math.round(interest),
        remainingPrincipal: Math.max(0, Math.round(remaining - principalPayment)),
      })
      remaining -= principalPayment
    }
  } else {
    // 元金均等返済
    const n = months.value
    const p = principal.value
    const r = monthlyRate.value
    const principalPayment = p / n
    for (let i = 0; i < n; i++) {
      const interest = remaining * r
      const loanPayment = principalPayment + interest
      table.push({
        loanPayment: Math.round(loanPayment),
        cost: Math.round(monthlyCost.value),
        totalPayment: Math.round(loanPayment + monthlyCost.value),
        principalPayment: Math.round(principalPayment),
        interest: Math.round(interest),
        remainingPrincipal: Math.max(0, Math.round(remaining - principalPayment)),
      })
      remaining -= principalPayment
    }
  }
  return table
})

const totalPayment = computed<number>(() => resultTable.value.reduce((sum, row) => sum + row.totalPayment, 0))
const totalSavings = computed<number>(() => {
  const totalMonths = years.value * 12
  return (savings.value * totalMonths) - totalPayment.value
})

const earlyRepaymentTotalPayment = computed<number|undefined>(() => {
  if (!earlyRepaymentYears.value) return undefined
  const months = earlyRepaymentYears.value * 12
  return resultTable.value.slice(0, months).reduce((sum, row) => sum + row.totalPayment, 0)
})

const earlyRepaymentTotalSavings = computed<number|undefined>(() => {
  if (!earlyRepaymentYears.value) return undefined
  const months = earlyRepaymentYears.value * 12

  // 早期返済期間中の通常の支払い総額（早期返済しない場合）
  const normalPayment = resultTable.value
    .slice(0, months)
    .reduce((sum, row) => sum + row.totalPayment, 0)

  // 早期返済による削減額 = 通常の支払い額 - 早期返済時の支払い額
  return (savings.value * months) - normalPayment
})

const earlyRepaymentRemainingPrincipal = computed<number|undefined>(() => {
  if (!earlyRepaymentYears.value) return undefined
  const months = earlyRepaymentYears.value * 12
  return resultTable.value[months - 1]?.remainingPrincipal || 0
})

// 月々の返済額を計算
const monthlyPayment = computed(() => {
  if (repaymentType.value === 'principalInterest') {
    const monthlyRate = rate.value / 100 / 12
    const numerator = principal.value * monthlyRate * Math.pow(1 + monthlyRate, months.value)
    const denominator = Math.pow(1 + monthlyRate, months.value) - 1
    return Math.floor(numerator / denominator)
  } else {
    const monthlyPrincipal = Math.floor(principal.value / months.value)
    const firstMonthInterest = Math.floor(principal.value * (rate.value / 100 / 12))
    return monthlyPrincipal + firstMonthInterest
  }
})

// 総利息を計算
const totalInterest = computed(() => {
  return resultTable.value.reduce((sum, row) => sum + row.interest, 0)
})
</script>

<style scoped>
.summary {
  font-size: 1.2em;
}
</style>
