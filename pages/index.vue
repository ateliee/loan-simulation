<template>
  <v-container class="py-8">
    <v-card class="mx-auto" max-width="900">
      <v-card-title class="text-h5">住宅ローンシミュレーション</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="借入金額（円）"
                v-model.number="principal"
                type="number"
                min="1"
                step="1"
                prepend-inner-icon="mdi-currency-jpy"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                label="借入期間（年）"
                :items="yearsOptions"
                v-model.number="years"
                item-title="label"
                item-value="value"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="金利（年利 %）"
                v-model.number="rate"
                type="number"
                min="0"
                step="0.01"
                prepend-inner-icon="mdi-percent"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-radio-group v-model="repaymentType" row>
                <v-radio label="元利均等返済" value="principalInterest" />
                <v-radio label="元金均等返済" value="principalOnly" />
              </v-radio-group>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto mt-8" max-width="900">
      <v-card-title class="text-h6">シミュレーション結果</v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th>月</th>
              <th>返済額</th>
              <th>元本返済額</th>
              <th>利息</th>
              <th>残元金</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in resultTable" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>{{ row.payment.toLocaleString() }}</td>
              <td>{{ row.principalPayment.toLocaleString() }}</td>
              <td>{{ row.interest.toLocaleString() }}</td>
              <td>{{ row.remainingPrincipal.toLocaleString() }}</td>
            </tr>
          </tbody>
        </v-table>
        <div class="summary mt-4">
          <p>合計返済額: <b>{{ totalPayment.toLocaleString() }}</b> 円</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const principal = ref(30000000)
const years = ref(35)
const rate = ref(1.0)
const repaymentType = ref('principalInterest')

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
    const payment = r === 0 ? p / n : p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    for (let i = 0; i < n; i++) {
      const interest = remaining * r
      const principalPayment = payment - interest
      table.push({
        payment: Math.round(payment),
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
      const payment = principalPayment + interest
      table.push({
        payment: Math.round(payment),
        principalPayment: Math.round(principalPayment),
        interest: Math.round(interest),
        remainingPrincipal: Math.max(0, Math.round(remaining - principalPayment)),
      })
      remaining -= principalPayment
    }
  }
  return table
})

const totalPayment = computed(() => resultTable.value.reduce((sum, row) => sum + row.payment, 0))
</script>

<style scoped>
.summary {
  font-size: 1.2em;
}
</style> 