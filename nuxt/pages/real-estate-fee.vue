<template>
  <v-container>
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
// 物件情報の状態管理
const propertyType = ref('residential')
const propertyPrice = ref(60000000)
</script>
