<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">年収から税金・手取り計算</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <TaxCalculatorForm ref="calculator" />
      </v-col>

      <v-col cols="12" md="6">
        <TaxCalculatorResult
          :annual-income="calculator?.annualIncome ?? 0"
          :income-tax="calculator?.incomeTax ?? 0"
          :resident-tax="calculator?.residentTax ?? 0"
          :take-home-pay="calculator?.takeHomePay ?? 0"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaxCalculatorForm from '~/components/tax-calculator/Form.vue'

const calculator = ref<InstanceType<typeof TaxCalculatorForm> | null>(null)
</script>
