<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <div id="menu-container">
    <Button raised severity="secondary" @click="router.push({ name: 'Home' })" v-if="route.name !== 'Home'">
      Home
    </Button>
    <Button raised severity="secondary" @click="router.push({ name: 'Api' })" v-if="route.name !== 'Api'"> API </Button>
    <Button raised severity="secondary" @click="router.push({ name: 'Forbidden' })" v-if="route.name !== 'Forbidden'">
      Forbidden
    </Button>
  </div>
</template>

<style scoped>
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
