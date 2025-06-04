<template>
  <v-container fluid class="fill-height error-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
        <v-card class="pa-6 rounded-lg" elevation="4">
          <v-icon
            :icon="error.statusCode === 404 ? 'mdi-alert-circle-outline' : 'mdi-alert'"
            size="64"
            color="error"
            class="mb-4"
          />
          <v-card-title class="text-h4 font-weight-bold mb-2">
            {{ error.statusCode === 404 ? 'ページが見つかりません' : 'エラーが発生しました' }}
          </v-card-title>
          <v-card-text class="text-body-1 mb-4">
            {{ error.message || '申し訳ありません。お探しのページは存在しないか、アクセスできません。' }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              to="/"
              size="large"
              prepend-icon="mdi-home"
              class="px-6"
            >
              トップページに戻る
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number;
    message?: string;
  };
}>();
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(var(--v-theme-surface)) 0%, rgb(var(--v-theme-background)) 100%);
}

.v-card {
  backdrop-filter: blur(10px);
  background-color: rgba(var(--v-theme-surface), 0.9) !important;
}
</style>
