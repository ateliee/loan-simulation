<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title class="text-h5 font-weight-bold">
            物件情報
          </v-card-title>
          <v-card-text>
            <RealEstateFeePropertyTypeForm
              v-model:property-type="propertyType"
            />
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="text-h5 font-weight-bold">
            物件価格
          </v-card-title>
          <v-card-text>
            <RealEstateFeePropertyValueForm
              v-model:property-price="propertyPrice"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold">
            計算結果
          </v-card-title>
          <v-card-text>
            <RealEstateFeeCalculationResult
              :property-type="propertyType"
              :property-price="propertyPrice"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  layoutProps: {
    title: '仲介手数料シミュレーション',
    description: '不動産取引における仲介手数料を計算します。物件種別（住宅・店舗・事務所）と価格から、宅地建物取引業法に基づく上限額を計算し、消費税も含めた総額を表示します。'
  }
})

// 物件情報の状態管理
const propertyType = ref('residential')
const propertyPrice = ref(60000000)
</script>
