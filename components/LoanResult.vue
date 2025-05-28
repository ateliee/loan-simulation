<template>
  <v-card flat>
    <v-card-title class="text-h6">シミュレーション結果</v-card-title>
    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-end">月</th>
            <th class="text-end font-weight-bold">ローン返済額</th>
            <th class="text-end">諸経費</th>
            <th class="text-end">月々返済額</th>
            <th class="text-end">残元金</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, idx) in resultTable" 
            :key="idx"
            :class="earlyRepaymentYears && idx === earlyRepaymentYears * 12 - 1 ? 'highlight-row' : ''"
          >
            <td class="text-end">{{ idx + 1 }}</td>
            <td class="text-end">
              <div class="font-weight-bold">{{ row.loanPayment.toLocaleString() }}</div>
              <div class="text-caption">(元本: {{ row.principalPayment.toLocaleString() }} 利息: {{ row.interest.toLocaleString() }})</div>
            </td>
            <td class="text-end">{{ row.cost.toLocaleString() }}</td>
            <td class="text-end">{{ row.totalPayment.toLocaleString() }}</td>
            <td class="text-end">{{ row.remainingPrincipal.toLocaleString() }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  resultTable: { type: Array, required: true },
  earlyRepaymentYears: { type: Number, default: null },
})
</script>

<style lang="scss" scoped>
.highlight-row td {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style> 