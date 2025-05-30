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

    <div class="text-subtitle-1 font-weight-bold mb-2 mt-6">物件の状態</div>
    <v-select
      v-model="propertyStatus"
      label="物件の状態"
      :items="propertyStatuses"
      class="mb-4"
      hide-details
    />
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
    >
      <div class="text-body-2">
        <div class="font-weight-bold">新築の方が登録免許税が安くなります</div>
      </div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: {
    propertyType: string
    propertyStatus: string
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: { propertyType: string; propertyStatus: string }]
}>()

const propertyType = ref(props.modelValue.propertyType)
const propertyStatus = ref(props.modelValue.propertyStatus)

const propertyTypes = [
  { title: '住宅（一戸建て・マンション）', value: 'residential' },
  { title: '店舗', value: 'commercial' },
  { title: '事務所', value: 'office' },
]

const propertyStatuses = [
  { title: '中古物件（既存の建物）', value: 'used' },
  { title: '新築物件（新しく建てた建物）', value: 'new' },
]

watch([propertyType, propertyStatus], ([newType, newStatus]) => {
  emit('update:modelValue', {
    propertyType: newType,
    propertyStatus: newStatus
  })
})
</script>
