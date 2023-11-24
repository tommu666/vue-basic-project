<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <button type="button" @click="count++">component count is {{ count }}</button>
  </div>
</template>

<style scoped>
button {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  padding: 6px 12px;
}
</style>
