<template>
  <div>
    <div class="text-subtitle-1 font-weight-bold mb-2">固定資産税評価額</div>
    <v-text-field
      v-model.number="landValue"
      label="土地の固定資産税評価額"
      type="number"
      min="0"
      step="100000"
      prepend-inner-icon="mdi-currency-jpy"
      class="mb-4"
      hide-details
    />
    <v-text-field
      v-model.number="buildingValue"
      label="建物の固定資産税評価額"
      type="number"
      min="0"
      step="100000"
      prepend-inner-icon="mdi-currency-jpy"
      class="mb-4"
      hide-details
    />
    <v-text-field
      v-model.number="mortgageAmount"
      label="住宅ローンの借入金額"
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
        <div class="font-weight-bold mb-1">固定資産税評価額の確認方法</div>
        <div>1. 売主に固定資産税評価証明書の交付を依頼</div>
        <div>2. 市区町村の窓口で取得（手数料：300円程度）</div>
        <div>3. 固定資産税の納税通知書でも確認可能</div>
        <div class="mt-2 text-grey">※実際の取引価格（売買価格）とは異なります</div>
        <div class="mt-2 text-grey">※住宅ローンを利用する場合は、借入金額を入力してください</div>
        <div class="text-grey">※住宅ローンを利用しない場合は、0円と入力してください</div>
      </div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: {
    landValue: number
    buildingValue: number
    mortgageAmount: number
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: { landValue: number; buildingValue: number; mortgageAmount: number }]
}>()

const landValue = ref(props.modelValue.landValue)
const buildingValue = ref(props.modelValue.buildingValue)
const mortgageAmount = ref(props.modelValue.mortgageAmount)

watch([landValue, buildingValue, mortgageAmount], ([newLand, newBuilding, newMortgage]) => {
  emit('update:modelValue', {
    landValue: newLand,
    buildingValue: newBuilding,
    mortgageAmount: newMortgage
  })
})
</script>
