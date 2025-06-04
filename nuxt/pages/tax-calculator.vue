<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12" md="6">
        <TaxCalculatorForm
          ref="formRef"
          @update:results="updateResults"
        />
        <TakeHomePay
          v-if="results"
          :take-home-pay="results.takeHomePay"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TaxCalculationResult
          v-if="results"
          v-bind="results"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TaxCalculatorForm from '~/components/tax-calculator/Form.vue'
import TaxCalculationResult from '~/components/tax-calculator/Result.vue'
import TakeHomePay from '~/components/tax-calculator/TakeHomePay.vue'
import type { TaxCalculationResultData } from '~/types/tax-calculator'

const formRef = ref()
const results = ref<TaxCalculationResultData | null>(null)

const updateResults = (newResults: typeof results.value) => {
  results.value = newResults
}

onMounted(() => {
  formRef.value?.calculateTax()
})

definePageMeta({
  layout: 'default',
  layoutProps: {
    title: '年収計算',
    description: '年収または月収とボーナスから、所得税、住民税、手取り額を計算します。給与所得控除、所得税の累進課税、住民税の計算を考慮しています。',
  },
})
</script>
