<script setup lang="ts">
import LoadingToast from './components/LoadingToast.vue'
import ToastsDisplayer from './components/ToastsDisplayer.vue'
import TopMenu from './components/TopMenu.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import { useAutoLogin } from './composables/userComposables'
import LoginPage from './components/LoginPage.vue'
import { useAuthStore } from './store/store'

useAutoLogin()
const authStore = useAuthStore()
</script>

<template>
  <div id="app-container">
    <LanguageSelector />
    <LoadingToast />
    <ToastsDisplayer />
    <template v-if="authStore.isLogged">
      <TopMenu />
      <router-view />
    </template>
    <LoginPage v-else />
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
