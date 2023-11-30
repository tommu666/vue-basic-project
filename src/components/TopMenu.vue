<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <div id="menu-container">
    <button :class="route.name === 'Home' ? 'selected' : ''" @click="router.push({ name: 'Home' })">Home</button>
    <button :class="route.name === 'Api' ? 'selected' : ''" @click="router.push({ name: 'Api' })">API</button>
    <button :class="route.name === 'Forbidden' ? 'selected' : ''" @click="router.push({ name: 'Forbidden' })">
      {{ route.name === 'Api' ? 'Forbidden' : 'Secret' }}
    </button>
  </div>
</template>

<style scoped>
.selected {
  background-color: #ff6464;
  color: #fff;
}

#menu-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  position: fixed;
  top: 4px;
  left: 4px;
}
</style>
