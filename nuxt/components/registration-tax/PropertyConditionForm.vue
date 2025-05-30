<template>
  <div>
    <div class="text-subtitle-1 font-weight-bold mb-2">住宅取得の条件</div>
    <v-row>
      <v-col cols="6">
        <v-checkbox
          v-model="isFirstTime"
          label="初めての住宅取得"
          hide-details
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-model="isEcoFriendly"
          label="省エネ住宅"
          hide-details
        />
      </v-col>
    </v-row>
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
    >
      <div class="text-body-2">
        <div class="font-weight-bold mb-1">条件の説明</div>
        <div>・初めての住宅取得：登録免許税が安くなります</div>
        <div>・省エネ住宅：建物部分の登録免許税が安くなります</div>
      </div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: {
    isFirstTime: boolean
    isEcoFriendly: boolean
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: { isFirstTime: boolean; isEcoFriendly: boolean }]
}>()

const isFirstTime = ref(props.modelValue.isFirstTime)
const isEcoFriendly = ref(props.modelValue.isEcoFriendly)

watch([isFirstTime, isEcoFriendly], ([newFirstTime, newEcoFriendly]) => {
  emit('update:modelValue', {
    isFirstTime: newFirstTime,
    isEcoFriendly: newEcoFriendly
  })
})
</script>
