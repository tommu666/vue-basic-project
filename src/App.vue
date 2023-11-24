<script setup lang="ts">
import ApiDisplayer from './components/ApiDisplayer.vue'
import HelloWorld from './components/HelloWorld.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import LoadingToast from './components/LoadingToast.vue'
import StoreCounter from './components/StoreCounter.vue'
import ToastsDisplayer from './components/ToastsDisplayer.vue'
</script>

<template>
  <div id="app-container">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld :msg="$t('message.hello')" />
    <StoreCounter />
    <LanguageSelector />
    <ApiDisplayer />
    <LoadingToast />
    <ToastsDisplayer />
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
