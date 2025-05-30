<template>
  <v-card class="mb-4">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      金利タイプ
    </v-card-title>
    <v-card-text>
      <v-btn-toggle
        v-model="rateType"
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

      <v-list>
        <v-list-subheader>銀行別金利情報</v-list-subheader>
        <v-list-item
          v-for="bank in INTEREST_RATE_DATA"
          :key="bank.bankName"
          :title="bank.bankName"
          :subtitle="getBankRateInfo(bank, rateType)"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { INTEREST_RATE_DATA, type InterestRateData, type RateType } from '~/data/interest-rate'

const rateType = defineModel<RateType>('modelValue', { default: 'variable' })

const getBankRateInfo = (bank: InterestRateData, rateType: RateType) => {
  if (rateType === 'variable') {
    const latestDate = bank.variable.length > 0 ? bank.variable[bank.variable.length - 1].date : '不明';
    const appliedRate = bank.variable.length > 0 ? `${bank.variable[bank.variable.length - 1].applied}%` : '不明';
    return `最新日付: ${latestDate}, 適用金利: ${appliedRate}`;
  } else if (rateType === 'fixed') {
    const latestDate = bank.fixed.length > 0 ? bank.fixed[bank.fixed.length - 1].date : '不明';
    const appliedRate = bank.fixed.length > 0 ? `${bank.fixed[bank.fixed.length - 1].applied}%` : '不明';
    return `最新日付: ${latestDate}, 適用金利: ${appliedRate}`;
  }
}
</script>
