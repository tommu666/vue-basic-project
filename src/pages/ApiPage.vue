<script setup lang="ts">
import ApiDisplayer from '../components/ApiDisplayer.vue'
</script>

<template>
  <div id="app-container">
    <ApiDisplayer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#app-container {
  text-align: center;
  width: '100%';
  height: '100%';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  gap: 2em;
}
</style>
