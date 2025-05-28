<template>
  <v-card class="mb-6" color="primary" dark>
    <v-card-text class="d-flex flex-column align-center">
      <div class="text-h5 font-weight-bold mb-2">合計返済額（諸経費込）</div>
      <div class="text-h3 font-weight-bold mb-4">{{ totalPayment.toLocaleString() }} 円</div>
      <div class="d-flex flex-column flex-wrap justify-center gap-4 text-center">
        <div class="text-subtitle-1">月々の諸経費: <b>{{ monthlyCost.toLocaleString() }}</b> 円</div>
        <div class="text-subtitle-1">ローン返済含めた貯蓄: <b>{{ totalSavings.toLocaleString() }}</b> 円</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  totalPayment: { type: Number, required: true },
  monthlyCost: { type: Number, required: true },
  savings: { type: Number, required: true },
  totalSavings: { type: Number, required: true },
})
</script> 