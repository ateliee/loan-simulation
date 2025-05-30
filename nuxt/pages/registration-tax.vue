<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12" md="6" class="bg-grey-lighten-4 rounded-lg">
        <v-card>
          <v-card-text>
            <v-form>
              <RegistrationTaxPropertyTypeForm
                v-model:property-type="propertyInfo.propertyType"
                v-model:property-status="propertyInfo.propertyStatus"
              />
              <RegistrationTaxPropertyValueForm
                v-model:land-value="propertyValue.landValue"
                v-model:building-value="propertyValue.buildingValue"
                v-model:mortgage-amount="propertyValue.mortgageAmount"
              />
              <RegistrationTaxPropertyConditionForm
                v-model="propertyCondition"
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="text-h5 font-weight-bold mb-4">計算結果</div>
            <RegistrationTaxCalculationResult
              :property-type="propertyInfo.propertyType"
              :property-status="propertyInfo.propertyStatus"
              :is-first-time="propertyCondition.isFirstTime"
              :is-eco-friendly="propertyCondition.isEcoFriendly"
              :land-value="propertyValue.landValue"
              :building-value="propertyValue.buildingValue"
              :mortgage-amount="propertyValue.mortgageAmount"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type PropertyType = 'residential' | 'commercial' | 'office'
type PropertyStatus = 'new' | 'used'

definePageMeta({
  layout: 'default',
  layoutProps: {
    title: '登録免許税シミュレーション',
    description: '不動産の登録免許税と司法書士報酬を計算できます。住宅、店舗、事務所の種類や、初めての住宅取得、省エネ住宅などの条件に応じて計算します。',
  },
})

const propertyInfo = ref({
  propertyType: 'residential' as PropertyType,
  propertyStatus: 'used' as PropertyStatus
})

const propertyValue = ref({
  landValue: 20000000,
  buildingValue: 10000000,
  mortgageAmount: 0
})

const propertyCondition = ref({
  isFirstTime: true,
  isEcoFriendly: false
})
</script>
