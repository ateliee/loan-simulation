import { defineStore } from 'pinia'
import { ref } from 'vue'
import { INTEREST_RATE_DATA } from '~/data/interest-rate'

export const useInterestRateStore = defineStore('interestRate', () => {
  const banks = INTEREST_RATE_DATA.map(bank => bank.bankName)
  const selectedBanks = ref<Set<string>>(new Set(banks))
  const showPolicyRate = ref(true)
  const updateTrigger = ref(0)

  const toggleBank = (bankName: string) => {
    const newSelectedBanks = new Set(selectedBanks.value)
    if (newSelectedBanks.has(bankName)) {
      newSelectedBanks.delete(bankName)
    } else {
      newSelectedBanks.add(bankName)
    }
    selectedBanks.value = newSelectedBanks
    updateTrigger.value++
  }

  const togglePolicyRate = () => {
    showPolicyRate.value = !showPolicyRate.value
    updateTrigger.value++
  }

  return {
    selectedBanks,
    showPolicyRate,
    toggleBank,
    togglePolicyRate,
    banks,
    updateTrigger
  }
})
