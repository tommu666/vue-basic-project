<script setup lang="ts">
import { useLoadingStore } from '../store/store.js'

const loadingStore = useLoadingStore()
</script>

<template>
  <div v-if="loadingStore.isLoading" id="loadingToast">
    <h1>{{ 'Loading...' }}</h1>
  </div>
</template>

<style scoped>
#loadingToast {
  position: fixed;
  bottom: 8px;
  right: 8px;
  padding: 0em 2em;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
}
</style>
