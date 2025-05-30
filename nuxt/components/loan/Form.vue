<template>
  <v-card>
    <v-card-title class="text-h6">ローン情報</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model.number="localPrincipal"
          class="mb-4"
          label="借入金額（円）"
          type="number"
          min="1"
          step="1"
          prepend-inner-icon="mdi-currency-jpy"
        />
        <v-select
          v-model.number="localYears"
          class="mb-4"
          label="借入期間（年）"
          :items="yearsOptions"
          item-title="label"
          item-value="value"
        />
        <v-text-field
          v-model.number="localRate"
          class="mb-4"
          label="金利（年利 %）"
          type="number"
          min="0"
          step="0.01"
          prepend-inner-icon="mdi-percent"
        />
        <v-text-field
          v-model.number="localMonthlyCost"
          class="mb-4"
          label="月々の諸経費（円）"
          type="number"
          min="0"
          step="1"
          prepend-inner-icon="mdi-cash"
        />
        <v-text-field
          v-model.number="localSavings"
          class="mb-4"
          label="ローン返済含めた貯蓄（円）"
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

        <div v-if="localRepaymentType === 'principalInterest'" class="mb-4">
          <v-alert
            color="info"
            variant="tonal"
            class="mb-2"
          >
            <div class="text-body-2">
              <div class="mb-2"><strong>メリット</strong></div>
              <ul class="mb-2">
                <li>月々の返済額が一定(5年ルール/125%ルール)</li>
                <li>返済初期の負担が比較的軽い</li>
              </ul>
              <div class="mb-2"><strong>デメリット</strong></div>
              <ul>
                <li>総返済額が元金均等返済より多くなる</li>
                <li>返済後半になっても利息の負担が大きい</li>
              </ul>
            </div>
          </v-alert>
        </div>
        <div v-if="localRepaymentType === 'principalOnly'" class="mb-4">
          <v-alert
            color="info"
            variant="tonal"
            class="mb-2"
          >
            <div class="text-body-2">
              <div class="mb-2"><strong>メリット</strong></div>
              <ul class="mb-2">
                <li>総返済額が元利均等返済より少なくなる</li>
                <li>返済期間が進むにつれて月々の返済額が減少</li>
              </ul>
              <div class="mb-2"><strong>デメリット</strong></div>
              <ul>
                <li>返済初期の月々の返済額が大きい</li>
                <li>返済額が月ごとに変動するため家計管理が難しい</li>
              </ul>
            </div>
          </v-alert>
        </div>

        <v-expand-transition>
          <div v-show="showAdvancedOptions">
            <v-divider class="mb-4" />
            <v-text-field
              v-model.number="localEarlyRepaymentYears"
              class="mb-4"
              label="繰上げ返済完済期間（年）"
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
  /** 借入金額（円） */
  principal: { type: Number, required: true },
  /** 借入期間（年） */
  years: { type: Number, required: true },
  /** 金利（年利%） */
  rate: { type: Number, required: true },
  /** 返済方式（元利均等・元金均等） */
  repaymentType: { type: String, required: true },
  /** 月々の諸経費（円） */
  monthlyCost: { type: Number, required: true },
  /** ローン返済含めた貯蓄（円） */
  savings: { type: Number, required: true },
  /** 繰上げ返済完済期間（年） */
  earlyRepaymentYears: { type: Number, default: undefined },
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
