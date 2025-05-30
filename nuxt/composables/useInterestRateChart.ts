import { computed } from 'vue'
import type { EChartsOption, SeriesOption } from 'echarts'
import { INTEREST_RATE_DATA, POLICY_RATE_DATA } from '~/data/interest-rate'

export const useInterestRateChart = () => {
  // 政策金利の日付を基準に日付リストを作成
  const dates = POLICY_RATE_DATA.map(item => item.date)

  // 変動金利のデータを整形
  const variableRates = {
    store: Object.fromEntries(
      INTEREST_RATE_DATA.map(bank => [
        bank.bankName,
        dates.map(date => {
          const rate = INTEREST_RATE_DATA.find(data => data.bankName === bank.bankName)?.variable.find(r => r.date === date)
          return rate?.store ?? null
        })
      ])
    ),
    discount: Object.fromEntries(
      INTEREST_RATE_DATA.map(bank => [
        bank.bankName,
        dates.map(date => {
          const rate = INTEREST_RATE_DATA.find(data => data.bankName === bank.bankName)?.variable.find(r => r.date === date)
          return rate?.discount ?? null
        })
      ])
    ),
    applied: Object.fromEntries(
      INTEREST_RATE_DATA.map(bank => [
        bank.bankName,
        dates.map(date => {
          const rate = INTEREST_RATE_DATA.find(data => data.bankName === bank.bankName)?.variable.find(r => r.date === date)
          return rate?.applied ?? null
        })
      ])
    )
  }

  // 固定金利のデータを整形
  const fixedRates = {
    store: Object.fromEntries(
      INTEREST_RATE_DATA.map(bank => [
        bank.bankName,
        dates.map(date => {
          const rate = INTEREST_RATE_DATA.find(data => data.bankName === bank.bankName)?.fixed.find(r => r.date === date)
          return rate?.store ?? null
        })
      ])
    ),
    discount: Object.fromEntries(
      INTEREST_RATE_DATA.map(bank => [
        bank.bankName,
        dates.map(date => {
          const rate = INTEREST_RATE_DATA.find(data => data.bankName === bank.bankName)?.fixed.find(r => r.date === date)
          return rate?.discount ?? null
        })
      ])
    ),
    applied: Object.fromEntries(
      INTEREST_RATE_DATA.map(bank => [
        bank.bankName,
        dates.map(date => {
          const rate = INTEREST_RATE_DATA.find(data => data.bankName === bank.bankName)?.fixed.find(r => r.date === date)
          return rate?.applied ?? null
        })
      ])
    )
  }

  const createChartOption = (data: Record<string, (number | null)[]>, showPolicyRate = false): EChartsOption => {
    const series: SeriesOption[] = INTEREST_RATE_DATA.map(bank => ({
      name: bank.bankName,
      type: 'line',
      data: data[bank.bankName],
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 2
      },
      connectNulls: true // null値を線で接続
    }))

    // 政策金利を追加
    if (showPolicyRate) {
      series.push({
        name: '政策金利',
        type: 'line',
        data: POLICY_RATE_DATA.map(item => item.rate),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 2,
          type: 'dashed'
        },
        itemStyle: {
          color: '#FF0000'
        }
      })
    }

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
        data: showPolicyRate ? [...INTEREST_RATE_DATA.map(bank => bank.bankName), '政策金利'] : INTEREST_RATE_DATA.map(bank => bank.bankName),
        type: 'scroll',
        bottom: 0
      },
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
        name: '金利',
        min: -0.2,
        max: 4,
        interval: 0.5
      },
      series
    }
  }

  const variableStoreRateOption = computed<EChartsOption>(() => createChartOption(variableRates.store, true))
  const variableDiscountOption = computed<EChartsOption>(() => createChartOption(variableRates.discount))
  const variableAppliedRateOption = computed<EChartsOption>(() => createChartOption(variableRates.applied))

  const fixedStoreRateOption = computed<EChartsOption>(() => createChartOption(fixedRates.store, true))
  const fixedDiscountOption = computed<EChartsOption>(() => createChartOption(fixedRates.discount))
  const fixedAppliedRateOption = computed<EChartsOption>(() => createChartOption(fixedRates.applied))

  return {
    variableStoreRateOption,
    variableDiscountOption,
    variableAppliedRateOption,
    fixedStoreRateOption,
    fixedDiscountOption,
    fixedAppliedRateOption
  }
}
