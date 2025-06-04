<template>
  <v-card>
    <v-card-title>計算結果</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-icon>mdi-cash</v-icon>
          </template>
          <div>
            <v-list-item-title>年収</v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis">
              <template v-if="monthlyIncome && bonus">
                月収 {{ formatNumber(monthlyIncome) }}円 × 12ヶ月 + ボーナス {{ formatNumber(bonus) }}円
              </template>
            </v-list-item-subtitle>
          </div>
          <div class="text-right">
            <div class="font-weight-bold">{{ formatNumber(annualIncome) }}円</div>
          </div>
        </v-list-item>

        <v-expansion-panels class="mt-2">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon start>mdi-calculator</v-icon>
              控除・課税所得の詳細
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list>
                <v-list-item>
                  <template #prepend>
                    <v-icon>mdi-cash-minus</v-icon>
                  </template>
                  <div>
                    <v-list-item-title>給与所得控除</v-list-item-title>
                    <v-list-item-subtitle class="text-caption text-medium-emphasis">
                      {{ getSalaryDeductionFormula(annualIncome) }}
                    </v-list-item-subtitle>
                  </div>
                  <div class="text-right">
                    <div class="font-weight-bold">{{ formatNumber(salaryDeduction) }}円</div>
                  </div>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon>mdi-cash-minus</v-icon>
                  </template>
                  <div>
                    <v-list-item-title>基礎控除</v-list-item-title>
                    <v-list-item-subtitle class="text-caption text-medium-emphasis">
                      年収2,400万円以下の場合48万円
                    </v-list-item-subtitle>
                  </div>
                  <div class="text-right">
                    <div class="font-weight-bold">{{ formatNumber(basicDeduction) }}円</div>
                  </div>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon>mdi-cash-minus</v-icon>
                  </template>
                  <div>
                    <v-list-item-title>社会保険料控除</v-list-item-title>
                    <v-list-item-subtitle class="text-caption text-medium-emphasis">
                      健康保険料 + 厚生年金保険料
                    </v-list-item-subtitle>
                  </div>
                  <div class="text-right">
                    <div class="font-weight-bold">{{ formatNumber(socialInsuranceDeduction) }}円</div>
                  </div>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon>mdi-calculator</v-icon>
                  </template>
                  <div>
                    <v-list-item-title>課税所得</v-list-item-title>
                    <v-list-item-subtitle class="text-caption text-medium-emphasis">
                      {{ getTaxableIncomeFormula() }}
                    </v-list-item-subtitle>
                  </div>
                  <div class="text-right">
                    <div class="font-weight-bold">{{ formatNumber(taxableIncome) }}円</div>
                  </div>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-divider class="my-2" />

        <v-list-item>
          <template #prepend>
            <v-icon>mdi-cash-minus</v-icon>
          </template>
          <div>
            <v-list-item-title>所得税</v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis">
              {{ getIncomeTaxFormula(annualIncome) }}
            </v-list-item-subtitle>
          </div>
          <div class="text-right">
            <div class="font-weight-bold">{{ formatNumber(incomeTax) }}円</div>
            <div class="text-caption text-medium-emphasis">（月額 {{ formatNumber(Math.floor(incomeTax / 12)) }}円）</div>
          </div>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-icon>mdi-cash-minus</v-icon>
          </template>
          <div>
            <v-list-item-title>住民税</v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis">
              {{ getResidentTaxFormula(annualIncome) }}
            </v-list-item-subtitle>
          </div>
          <div class="text-right">
            <div class="font-weight-bold">{{ formatNumber(residentTax) }}円</div>
            <div class="text-caption text-medium-emphasis">（月額 {{ formatNumber(Math.floor(residentTax / 12)) }}円）</div>
          </div>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-icon>mdi-hospital-box</v-icon>
          </template>
          <div>
            <v-list-item-title>健康保険料</v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis">
              {{ getHealthInsuranceDescription() }}
            </v-list-item-subtitle>
          </div>
          <div class="text-right">
            <div class="font-weight-bold">{{ formatNumber(healthInsurance) }}円</div>
            <div class="text-caption text-medium-emphasis">（月額 {{ formatNumber(Math.floor(healthInsurance / 12)) }}円）</div>
          </div>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-icon>mdi-account-group</v-icon>
          </template>
          <div>
            <v-list-item-title>年金保険料</v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis">
              {{ getPensionDescription() }}
            </v-list-item-subtitle>
          </div>
          <div class="text-right">
            <div class="font-weight-bold">{{ formatNumber(pension) }}円</div>
            <div class="text-caption text-medium-emphasis">（月額 {{ formatNumber(Math.floor(pension / 12)) }}円）</div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { TaxCalculationResultData } from '~/types/tax-calculator'

const props = defineProps<TaxCalculationResultData>()

const formatNumber = (num: number): string => {
  return Number(num).toLocaleString('ja-JP')
}

// 給与所得控除の計算式を取得
const getSalaryDeductionFormula = (income: number): string => {
  if (income <= 1_625_000) {
    return '550,000円（年収1,625,000円以下の場合）'
  } else if (income <= 1_800_000) {
    return `年収 × 40% = ${formatNumber(Math.floor(income * 0.4))}円`
  } else if (income <= 3_600_000) {
    return `年収 × 30% + 180,000円 = ${formatNumber(Math.floor(income * 0.3 + 180_000))}円`
  } else if (income <= 6_600_000) {
    return `年収 × 20% + 540,000円 = ${formatNumber(Math.floor(income * 0.2 + 540_000))}円`
  } else if (income <= 8_500_000) {
    return `年収 × 10% + 1,200,000円 = ${formatNumber(Math.floor(income * 0.1 + 1_200_000))}円`
  } else {
    return '1,950,000円（年収8,500,000円超の場合）'
  }
}

// 所得税の計算式を取得
const getIncomeTaxFormula = (income: number): string => {
  const deduction = getSalaryDeductionAmount(income)
  const taxableIncome = income - deduction

  if (taxableIncome <= 1_950_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 5%`
  } else if (taxableIncome <= 3_300_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 10% - 97,500円`
  } else if (taxableIncome <= 6_950_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 20% - 427,500円`
  } else if (taxableIncome <= 9_000_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 23% - 636,000円`
  } else if (taxableIncome <= 18_000_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 33% - 1,536,000円`
  } else if (taxableIncome <= 40_000_000) {
    return `課税所得（${formatNumber(taxableIncome)}円）× 40% - 2,796,000円`
  } else {
    return `課税所得（${formatNumber(taxableIncome)}円）× 45% - 4,796,000円`
  }
}

// 住民税の計算式を取得
const getResidentTaxFormula = (income: number): string => {
  const deduction = getSalaryDeductionAmount(income)
  const taxableIncome = income - deduction
  return `課税所得（${formatNumber(taxableIncome)}円）× 10%`
}

// 給与所得控除額を計算
const getSalaryDeductionAmount = (income: number): number => {
  if (income <= 1_625_000) {
    return 550_000
  } else if (income <= 1_800_000) {
    return Math.floor(income * 0.4)
  } else if (income <= 3_600_000) {
    return Math.floor(income * 0.3 + 180_000)
  } else if (income <= 6_600_000) {
    return Math.floor(income * 0.2 + 540_000)
  } else if (income <= 8_500_000) {
    return Math.floor(income * 0.1 + 1_200_000)
  } else {
    return 1_950_000
  }
}

// 課税所得の計算式を取得
const getTaxableIncomeFormula = (): string => {
  return `年収 - 給与所得控除 - 基礎控除 - 社会保険料控除`
}

// 健康保険料の説明を取得
const getHealthInsuranceDescription = (): string => {
  if (props.employmentType === 'fullTime') {
    return '標準報酬月額 × 9.81% × 12ヶ月（厚生年金）'
  } else {
    return '標準報酬月額 × 8% × 12ヶ月（国民健康保険）'
  }
}

// 年金保険料の説明を取得
const getPensionDescription = (): string => {
  if (props.employmentType === 'fullTime') {
    return '標準報酬月額 × 9.15% × 12ヶ月（厚生年金）'
  } else {
    return '16,650円 × 12ヶ月（国民年金）'
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  padding: 12px 16px;
}

.v-list-item-subtitle {
  min-width: 150px;
}

.v-list-item-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.text-h6 {
  font-size: 1.25rem !important;
  font-weight: 500 !important;
}
</style>
