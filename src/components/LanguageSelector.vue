<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
</script>

<template>
  <div id="language-selector">
    <Dropdown :options="$i18n.availableLocales" v-model="$i18n.locale">
      <template #option="{ option }">
        <img class="flag" :src="`src/assets/flags/${option}.png`" :alt="option" />
      </template>
    </Dropdown>
  </div>
</template>

<style scoped>
.flag {
  width: 1.5em;
  height: 1em;
}

#language-selector {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  position: fixed;
  top: 4px;
  right: 4px;
}
</style>
```
