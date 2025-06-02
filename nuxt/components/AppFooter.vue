<template>
  <v-footer class="d-flex flex-column">
    <div class="d-flex w-100 align-center px-4">
      <a href="https://ateliee.com" target="_blank" class="text-decoration-none">© {{ new Date().getFullYear() }} ateliee</a>
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        href="https://github.com/ateliee/loan-simulation/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-none"
      >
        <v-icon start icon="mdi-github"></v-icon>
        GitHub
      </v-btn>
    </div>
    <div class="px-4 py-2 text-center w-100">
      <span class="text-caption">
        このプロジェクトのコードは、AIを活用して生成されています。
      </span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
// コンポーネントのロジック
</script>

<style scoped>
.v-footer {
  border-top: 1px solid rgba(0 0 0 / 12%);
}
</style>
