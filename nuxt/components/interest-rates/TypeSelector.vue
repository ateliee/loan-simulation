<template>
  <v-card class="pa-4">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      銀行選択
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="bank in INTEREST_RATE_DATA"
          :key="bank.bankName"
          class="bank-list-item"
          @click="handleBankClick(bank.bankName)"
        >
          <template #prepend>
            <div
              class="color-indicator"
              :style="{ backgroundColor: getBankColor(bank.bankName, INTEREST_RATE_DATA) }"
            />
          </template>
          <v-list-item-title class="text-body-1">
            {{ bank.bankName }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            {{ getLatestRateInfo(bank) }}
          </v-list-item-subtitle>
          <template #append>
            <div class="d-flex align-center">
              <v-btn
                variant="text"
                size="small"
                :href="bank.url"
                target="_blank"
                rel="noopener noreferrer"
                class="mr-2"
              >
                <v-icon size="small">mdi-open-in-new</v-icon>
              </v-btn>
              <v-icon
                :icon="selectedBanks.has(bank.bankName) ? 'mdi-check' : 'mdi-checkbox-blank-outline'"
                :color="selectedBanks.has(bank.bankName) ? 'primary' : 'grey'"
              />
            </div>
          </template>
        </v-list-item>
      </v-list>
      <v-divider class="my-4" />
      <v-list-item @click="handlePolicyRateClick()">
        <template #prepend>
          <div
            class="color-indicator"
            :style="{ backgroundColor: policyRateColor }"
          />
        </template>
        <v-list-item-title class="text-body-1">
          政策金利
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption">
          {{ getLatestPolicyRateInfo() }}
        </v-list-item-subtitle>
        <template #append>
          <v-icon
            :icon="store.showPolicyRate ? 'mdi-check' : 'mdi-checkbox-blank-outline'"
            :color="store.showPolicyRate ? 'primary' : 'grey'"
          />
        </template>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { INTEREST_RATE_DATA, POLICY_RATE_DATA, getBankColor } from '~/data/interest-rate'
import { type RateType, policyRateColor } from '~/data/interest-rate'
import { useInterestRateStore } from '~/stores/interestRate'
import { computed } from 'vue'

const props = defineProps<{
  selectedRateType: RateType
}>()

const emit = defineEmits<{
  (e: 'updateCharts'): void
}>()

const store = useInterestRateStore()
const selectedBanks = computed(() => useInterestRateStore().selectedBanks)

const handleBankClick = (bankName: string) => {
  store.toggleBank(bankName)
  emit('updateCharts')
}

const handlePolicyRateClick = () => {
  store.togglePolicyRate()
  emit('updateCharts')
}

// 最新の金利情報を取得（日付付き）
const getLatestRateInfo = (bank: typeof INTEREST_RATE_DATA[0]) => {
  const rate = bank[props.selectedRateType][bank[props.selectedRateType].length - 1]
  const rateType = props.selectedRateType === 'variable' ? '変動' : '固定'
  return `${rate.date}時点 ${rateType}金利: ${rate.store}%`
}

// 最新の政策金利情報を取得（日付付き）
const getLatestPolicyRateInfo = () => {
  const latestPolicyRate = POLICY_RATE_DATA[POLICY_RATE_DATA.length - 1]
  return `${latestPolicyRate.date}時点 ${latestPolicyRate.rate}%`
}
</script>

<style scoped>
.bank-list-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.bank-list-item:hover {
  background-color: rgb(0 0 0 / 4%);
}

.color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
