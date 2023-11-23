<script setup lang="ts">
import { useCounterStore } from '../store/store'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store
</script>

<template>
  <div class="card">
    <button type="button" @click="increment">store count is {{ count }}</button>
  </div>
</template>

<style scoped></style>
