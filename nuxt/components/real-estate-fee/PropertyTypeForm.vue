<template>
  <div>
    <div class="text-subtitle-1 font-weight-bold mb-2">物件の種類</div>
    <v-select
      v-model="propertyType"
      label="物件の種類"
      :items="propertyTypes"
      class="mb-4"
      hide-details
    />
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
    >
      <div class="text-body-2">
        <div class="font-weight-bold">物件種別による手数料の違い</div>
        <div>・住宅：3% + 6万円</div>
        <div>・店舗・事務所：5% + 6万円</div>
      </div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
const propertyType = defineModel<string>('propertyType', { required: true })

const propertyTypes = [
  { title: '住宅（一戸建て・マンション）', value: 'residential' },
  { title: '店舗', value: 'commercial' },
  { title: '事務所', value: 'office' },
]
</script>
