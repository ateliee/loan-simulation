<template>
  <div class="chart-container">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { type PropType, computed } from 'vue'
import type { LoanResult } from '~/types/loan'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

const props = defineProps({
  /** 返済計画表のデータ */
  resultTable: { type: Object as PropType<LoanResult[]>, required: true },
})

const chartOption = computed(() => {
  const maxTotal = Math.max(
    ...props.resultTable.map(row => row.remainingPrincipal)
  )
  const maxValue = Math.ceil(maxTotal / 1000000) * 1000000 // 100万円単位で切り上げ

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      },
      formatter: (params: { dataIndex: number }[]) => {
        const month = params[0].dataIndex + 1
        const year = Math.floor(month / 12) + 1
        const monthInYear = month % 12 || 12
        const row = props.resultTable[params[0].dataIndex]
        const totalPayment = row.principalPayment + row.interest
        const principalRatio = (row.principalPayment / totalPayment * 100).toFixed(1)
        const interestRatio = (row.interest / totalPayment * 100).toFixed(1)

        let result = `${month}ヶ月目 (${year}年${monthInYear}ヶ月)<br/>`
        result += `ローン返済額: ${totalPayment.toLocaleString()}円<br/>`
        result += `元本返済額: ${row.principalPayment.toLocaleString()}円 (${principalRatio}%)<br/>`
        result += `利息: ${row.interest.toLocaleString()}円 (${interestRatio}%)<br/>`
        result += `残元金: ${row.remainingPrincipal.toLocaleString()}円`
        return result
      },
    },
    legend: {
      data: ['元本', '利息'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: props.resultTable.map((_, idx) => idx + 1),
      name: '月',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      name: '金額（円）',
      max: maxValue,
      axisLabel: {
        formatter: (value: number) => (value / 10000).toLocaleString() + '万円',
      },
    },
    series: [
      {
        name: '元本',
        type: 'line',
        stack: 'total',
        data: props.resultTable.map(row => row.principalPayment / (row.principalPayment + row.interest) * row.remainingPrincipal),
        itemStyle: { color: '#1867C0' },
        lineStyle: {
          width: 0
        },
        symbol: 'none',
        areaStyle: {
          opacity: 0.8,
          color: '#1867C0'
        }
      },
      {
        name: '利息',
        type: 'line',
        stack: 'total',
        data: props.resultTable.map(row => row.interest / (row.principalPayment + row.interest) * row.remainingPrincipal),
        itemStyle: { color: '#FF5252' },
        lineStyle: {
          width: 0
        },
        symbol: 'none',
        areaStyle: {
          opacity: 0.8,
          color: '#FF5252'
        }
      },
    ],
  }
})
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
