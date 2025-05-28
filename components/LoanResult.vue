<template>
  <v-card flat>
    <v-card-title class="text-h6">シミュレーション結果</v-card-title>
    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-end">月</th>
            <th class="text-end">ローン返済額</th>
            <th class="text-end">諸経費</th>
            <th class="text-end">合計返済額</th>
            <th class="text-end">元本返済額</th>
            <th class="text-end">利息</th>
            <th class="text-end">残元金</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in resultTable" :key="idx">
            <td class="text-end">{{ idx + 1 }}</td>
            <td class="text-end">{{ row.loanPayment.toLocaleString() }}</td>
            <td class="text-end">{{ row.cost.toLocaleString() }}</td>
            <td class="text-end">{{ row.totalPayment.toLocaleString() }}</td>
            <td class="text-end">{{ row.principalPayment.toLocaleString() }}</td>
            <td class="text-end">{{ row.interest.toLocaleString() }}</td>
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
})
</script> 