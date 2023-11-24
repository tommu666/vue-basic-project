<script setup lang="ts">
import { useCounterStore } from '../store/store'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store
</script>

<template>
  <div class="card">
    <Button raised severity="secondary" @click="increment" :label="$t('storeCounter.count', { count })" />
  </div>
</template>

<style scoped></style>
