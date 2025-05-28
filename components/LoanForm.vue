<template>
  <v-card>
    <v-card-title class="text-h6">住宅ローンシミュレーション</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          class="mb-4"
          label="借入金額（円）"
          v-model.number="localPrincipal"
          type="number"
          min="1"
          step="1"
          prepend-inner-icon="mdi-currency-jpy"
        />
        <v-select
          class="mb-4"
          label="借入期間（年）"
          :items="yearsOptions"
          v-model.number="localYears"
          item-title="label"
          item-value="value"
        />
        <v-text-field
          class="mb-4"
          label="金利（年利 %）"
          v-model.number="localRate"
          type="number"
          min="0"
          step="0.01"
          prepend-inner-icon="mdi-percent"
        />
        <v-text-field
          class="mb-4"
          label="月々の諸経費（円）"
          v-model.number="localMonthlyCost"
          type="number"
          min="0"
          step="1"
          prepend-inner-icon="mdi-cash"
        />
        <v-text-field
          class="mb-4"
          label="ローン返済含めた貯蓄（円）"
          v-model.number="localSavings"
          type="number"
          min="0"
          step="1"
          prepend-inner-icon="mdi-bank"
        />
        <v-btn-toggle
          v-model="localRepaymentType"
          mandatory
          class="mb-4 w-100"
          color="primary"
        >
          <v-btn value="principalInterest" class="flex-grow-1">元利均等返済</v-btn>
          <v-btn value="principalOnly" class="flex-grow-1">元金均等返済</v-btn>
        </v-btn-toggle>

        <v-expand-transition>
          <div v-show="showAdvancedOptions">
            <v-divider class="mb-4" />
            <v-text-field
              class="mb-4"
              label="繰上げ返済完済期間（年）"
              v-model.number="localEarlyRepaymentYears"
              type="number"
              min="1"
              :max="localYears"
              step="1"
              prepend-inner-icon="mdi-calendar"
            />
          </div>
        </v-expand-transition>

        <v-btn
          variant="text"
          class="mt-2"
          @click="showAdvancedOptions = !showAdvancedOptions"
        >
          {{ showAdvancedOptions ? '詳細を隠す' : '細かい条件入力' }}
          <v-icon>{{ showAdvancedOptions ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps({
  principal: { type: Number, required: true },
  years: { type: Number, required: true },
  rate: { type: Number, required: true },
  repaymentType: { type: String, required: true },
  monthlyCost: { type: Number, required: true },
  savings: { type: Number, required: true },
  earlyRepaymentYears: { type: Number, default: null },
})
const emit = defineEmits([
  'update:principal', 'update:years', 'update:rate', 'update:repaymentType',
  'update:monthlyCost', 'update:savings', 'update:earlyRepaymentYears',
])

const localPrincipal = ref(props.principal)
const localYears = ref(props.years)
const localRate = ref(props.rate)
const localRepaymentType = ref(props.repaymentType)
const localMonthlyCost = ref(props.monthlyCost)
const localSavings = ref(props.savings)
const localEarlyRepaymentYears = ref(props.earlyRepaymentYears)
const showAdvancedOptions = ref(false)

const yearsOptions = computed(() => Array.from({ length: 35 }, (_, i) => ({ label: `${i + 1}年`, value: i + 1 })))

watch(localPrincipal, v => emit('update:principal', v))
watch(localYears, v => emit('update:years', v))
watch(localRate, v => emit('update:rate', v))
watch(localRepaymentType, v => emit('update:repaymentType', v))
watch(localMonthlyCost, v => emit('update:monthlyCost', v))
watch(localSavings, v => emit('update:savings', v))
watch(localEarlyRepaymentYears, v => emit('update:earlyRepaymentYears', v))
</script> 