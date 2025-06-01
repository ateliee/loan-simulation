import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { INTEREST_RATE_DATA, POLICY_RATE_DATA, type RateType, getBankColor, policyRateColor } from '~/data/interest-rate'
import type { EChartsOption, LineSeriesOption, LegendComponentOption } from 'echarts'
import { useInterestRateStore } from '~/stores/interestRate'

// 重要な出来事のマークライン定義
const IMPORTANT_EVENTS = [
  {
    name: 'バブル崩壊',
    xAxis: '1991/04',
    label: {
      formatter: 'バブル崩壊',
      position: 'insideStartTop' as const
    }
  },
  {
    name: 'ゼロ金利政策開始',
    xAxis: '1999/02',
    label: {
      formatter: 'ゼロ金利政策開始',
      position: 'insideStartTop' as const
    }
  },
  {
    name: 'リーマンショック',
    xAxis: '2008/09',
    label: {
      formatter: 'リーマンショック',
      position: 'insideStartTop' as const
    }
  },
  {
    name: 'マイナス金利導入',
    xAxis: '2016/02',
    label: {
      formatter: 'マイナス金利導入',
      position: 'insideStartTop' as const
    }
  },
  {
    name: '金融政策正常化',
    xAxis: '2024/03',
    label: {
      formatter: '金融政策正常化',
      position: 'insideStartTop' as const
    }
  }
]

// マークラインの共通設定
const MARK_LINE_CONFIG = {
  silent: true,
  symbol: 'none',
  lineStyle: {
    color: '#999',
    type: 'dashed' as const,
    width: 1
  },
  label: {
    show: true,
    fontSize: 10,
    color: '#666'
  },
  data: IMPORTANT_EVENTS
}

// EChartsコンポーネントの登録
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
])

// 全期間の年月データを作成
const createDateList = () => {
  const allDates = new Set<string>()

  // 政策金利の日付を追加
  POLICY_RATE_DATA.forEach(item => allDates.add(item.date))

  // 各銀行の日付を追加
  INTEREST_RATE_DATA.forEach(bank => {
    bank.variable.forEach(item => allDates.add(item.date))
    bank.fixed.forEach(item => allDates.add(item.date))
  })

  // マークラインの日付を追加
  IMPORTANT_EVENTS.forEach(event => allDates.add(event.xAxis))

  // 日付を昇順にソート
  return Array.from(allDates).sort()
}

// 指定された日付のデータを取得（データが存在しない場合はnull）
const getRateData = (bank: typeof INTEREST_RATE_DATA[0], date: string, rateType: RateType, category: 'store' | 'discount' | 'applied') => {
  const rates = bank[rateType]
  const rateData = rates.find(item => item.date === date)
  return rateData ? rateData[category] : null
}

export const useInterestRateChart = () => {
  const dates = createDateList()
  const store = useInterestRateStore()

  const createChartOption = (rateType: RateType, category: 'store' | 'discount' | 'applied', showPolicyRate = false): EChartsOption => {
    const series: LineSeriesOption[] = [
      ...INTEREST_RATE_DATA
        .filter(bank => store.selectedBanks.has(bank.bankName))
        .map(bank => ({
          name: bank.bankName,
          type: 'line' as const,
          data: dates.map(date => getRateData(bank, date, rateType, category)),
          connectNulls: true,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 2
          },
          itemStyle: {
            color: getBankColor(bank.bankName, INTEREST_RATE_DATA)
          },
          markLine: MARK_LINE_CONFIG
        }))
    ]

    if (showPolicyRate && store.showPolicyRate) {
      series.push({
        name: '政策金利',
        type: 'line' as const,
        data: dates.map(date => {
          const policyRate = POLICY_RATE_DATA.find(item => item.date === date)
          return policyRate ? policyRate.rate : null
        }),
        connectNulls: true,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 2,
          type: 'dashed',
          color: policyRateColor,
        },
        itemStyle: {
          color: policyRateColor,
        },
        markLine: MARK_LINE_CONFIG
      })
    }

    const legendData = series.map(s => s.name || '')

    // データの最大値と最小値を計算
    const allValues = series.flatMap(s => s.data).filter((v): v is number => v !== null)
    const maxValue = Math.max(...allValues)
    const minValue = Math.min(...allValues)

    // Y軸の範囲を設定（余裕を持たせる）
    const yAxisMax = Math.ceil(maxValue * 1.1)
    const yAxisMin = category === 'discount'
      ? 0 // 引き下げ幅は0%が最小
      : Math.floor(minValue * 1.1) // 金利は10%の余裕

    return {
      tooltip: {
        trigger: 'axis',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const date = params[0].axisValue
          let result = `${date}<br/>`
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          params.forEach((param: any) => {
            if (param.value !== null && param.value !== undefined) {
              result += `${param.seriesName}: ${param.value}%<br/>`
            }
          })
          return result
        }
      },
      legend: {
        data: legendData,
        type: 'scroll',
        bottom: 0,
        selected: Object.fromEntries(store.banks.map(bank => [bank, store.selectedBanks.has(bank)]))
      } as LegendComponentOption,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        name: '年月',
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        },
        name: category === 'discount' ? '引き下げ幅' : '金利',
        min: yAxisMin,
        max: yAxisMax,
        interval: category === 'discount' ? 0.2 : 0.5
      },
      series
    }
  }

  const createChartsOptions = (): { [key: string]: EChartsOption } => {
    // 変動金利のグラフオプション
    const variableStoreRateOption = createChartOption('variable', 'store', true)
    const variableDiscountOption = createChartOption('variable', 'discount')
    const variableAppliedRateOption = createChartOption('variable', 'applied')

    // 固定金利のグラフオプション
    const fixedStoreRateOption = createChartOption('fixed', 'store', true)
    const fixedDiscountOption = createChartOption('fixed', 'discount')
    const fixedAppliedRateOption = createChartOption('fixed', 'applied')

    return {
      variableStoreRateOption,
      variableDiscountOption,
      variableAppliedRateOption,
      fixedStoreRateOption,
      fixedDiscountOption,
      fixedAppliedRateOption
    }
  }

  return {
    VChart,
    selectedBanks: store.selectedBanks,
    toggleBank: store.toggleBank,
    createChartsOptions,
  }
}
