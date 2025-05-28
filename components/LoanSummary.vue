<template>
  <v-card class="mb-6" color="primary" dark>
    <v-card-text class="d-flex flex-column align-center">
      <div class="text-h5 font-weight-bold mb-2">合計返済額（諸経費込）</div>
      <div class="text-h3 font-weight-bold mb-4">{{ totalPayment.toLocaleString() }} 円</div>
      <div class="d-flex flex-column flex-wrap justify-center gap-4 text-center">
        <div class="text-subtitle-1">月々の諸経費: <b>{{ monthlyCost.toLocaleString() }}</b> 円</div>
        <div class="text-subtitle-1">ローン返済含めた貯蓄: <b>{{ totalSavings.toLocaleString() }}</b> 円</div>
        <div class="text-subtitle-1">貯蓄合計額: <b>{{ totalSavingsAmount.toLocaleString() }}</b> 円</div>
      </div>

      <v-expand-transition>
        <div v-if="earlyRepaymentTotalPayment !== null" class="mt-6 text-center">
          <v-divider class="mb-4" />
          <div class="text-h6 font-weight-bold mb-2">繰上げ返済時の合計返済額（諸経費込）</div>
          <div class="text-h4 font-weight-bold mb-4">{{ earlyRepaymentTotalPayment.toLocaleString() }} 円</div>
          <div class="d-flex flex-column flex-wrap justify-center gap-4">
            <div class="text-subtitle-1">繰上げ返済時の貯蓄: <b>{{ earlyRepaymentTotalSavings?.toLocaleString() }}</b> 円</div>
            <div class="text-subtitle-1">繰上げ返済時のローン残高: <b>{{ earlyRepaymentRemainingPrincipal?.toLocaleString() }}</b> 円</div>
          </div>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  totalPayment: { type: Number, required: true },
  monthlyCost: { type: Number, required: true },
  savings: { type: Number, required: true },
  totalSavings: { type: Number, required: true },
  earlyRepaymentTotalPayment: { type: Number, default: null },
  earlyRepaymentTotalSavings: { type: Number, default: null },
  earlyRepaymentRemainingPrincipal: { type: Number, default: null },
})
</script> 