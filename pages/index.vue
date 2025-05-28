<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12" md="4" class="bg-grey-lighten-4 rounded-lg">
        <div style="position: sticky; top: 32px; z-index: 10; max-height: calc(100vh - 64px); overflow-y: auto;">
          <LoanForm
            v-model:principal="principal"
            v-model:years="years"
            v-model:rate="rate"
            v-model:repaymentType="repaymentType"
            v-model:monthlyCost="monthlyCost"
            v-model:savings="savings"
            v-model:earlyRepaymentYears="earlyRepaymentYears"
          />
          <LoanSummary 
            :totalPayment="totalPayment" 
            :savings="savings" 
            :totalSavings="totalSavings"
            :earlyRepaymentTotalPayment="earlyRepaymentTotalPayment"
            :earlyRepaymentTotalSavings="earlyRepaymentTotalSavings"
            :earlyRepaymentRemainingPrincipal="earlyRepaymentRemainingPrincipal"
          />
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <LoanResult :resultTable="resultTable" :earlyRepaymentYears="earlyRepaymentYears" :savings="savings" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoanForm from '~/components/LoanForm.vue'
import LoanResult from '~/components/LoanResult.vue'
import LoanSummary from '~/components/LoanSummary.vue'

const principal = ref<number>(60000000)
const years = ref<number>(35)
const rate = ref<number>(0.8)
const repaymentType = ref('principalInterest')
const monthlyCost = ref<number>(20000)
const savings = ref<number>(200000)
const earlyRepaymentYears = ref<number | null>(null)

const yearsOptions = Array.from({ length: 35 }, (_, i) => ({ label: `${i + 1}年`, value: i + 1 }))

const months = computed(() => years.value * 12)
const monthlyRate = computed(() => rate.value / 100 / 12)

const resultTable = computed(() => {
  const table = []
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

const totalPayment = computed(() => resultTable.value.reduce((sum, row) => sum + row.totalPayment, 0))
const totalSavings = computed(() => {
  const totalMonths = years.value * 12
  return (savings.value * totalMonths) - totalPayment.value
})

const earlyRepaymentTotalPayment = computed(() => {
  if (!earlyRepaymentYears.value) return null
  const months = earlyRepaymentYears.value * 12
  return resultTable.value.slice(0, months).reduce((sum, row) => sum + row.totalPayment, 0)
})

const earlyRepaymentTotalSavings = computed(() => {
  if (!earlyRepaymentYears.value) return null
  const months = earlyRepaymentYears.value * 12
  return (savings.value * months) - (earlyRepaymentTotalPayment.value || 0)
})

const earlyRepaymentRemainingPrincipal = computed(() => {
  if (!earlyRepaymentYears.value) return null
  const months = earlyRepaymentYears.value * 12
  return resultTable.value[months - 1]?.remainingPrincipal || 0
})
</script>

<style scoped>
.summary {
  font-size: 1.2em;
}
</style> 