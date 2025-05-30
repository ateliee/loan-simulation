<template>
  <v-card>
    <v-card-title class="text-subtitle-1 font-weight-bold">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <VChart class="chart" :option="chartOption" autoresize />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

defineProps<{
  title: string
  chartOption: EChartsOption
}>()
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>
