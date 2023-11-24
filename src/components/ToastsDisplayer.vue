<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastsStore } from '../store/store.js'

const toastsStore = useToastsStore()
const { firstToast } = storeToRefs(toastsStore)
</script>

<template>
  <div v-if="firstToast" :class="['toast', firstToast.type]">
    <h1>{{ firstToast.message }}</h1>
    <button class="button" @click="toastsStore.removeToast(firstToast.toastId)">X</button>
  </div>
</template>

<style scoped>
.button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.toast {
  position: fixed;
  bottom: 8px;
  left: 8px;
  padding: 0em 2em;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  border-radius: 0.5em;
}

.error {
  background-color: #ff6464;
  color: #fff;
}

.success {
  background-color: #64ff64;
  color: #000;
}
</style>
