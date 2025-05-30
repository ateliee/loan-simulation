<template>
  <div>
    <div class="text-subtitle-1 font-weight-bold mb-2">物件価格</div>
    <v-text-field
      v-model.number="propertyPrice"
      label="物件価格"
      type="number"
      min="0"
      step="100000"
      prepend-inner-icon="mdi-currency-jpy"
      class="mb-4"
      hide-details
    />
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
    >
      <div class="text-body-2">
        <div class="font-weight-bold mb-1">物件価格について</div>
        <div>・実際の取引価格（売買価格）を入力してください</div>
        <div>・消費税は含まない価格を入力してください</div>
        <div class="mt-2 text-grey">※仲介手数料は消費税が別途加算されます</div>
      </div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
const propertyPrice = defineModel<number>('propertyPrice', { required: true })
</script>
