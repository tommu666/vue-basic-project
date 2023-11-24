<script setup lang="ts">
import { useFetchAPI } from '../composables/useFetchAPI'

const { data, fetchData } = useFetchAPI()

const fetchRomeTime = () => {
  fetchData('http://worldtimeapi.org/api/timezone/Europe/Rome')
}

const fetchWrongTime = () => {
  fetchData('http://worldtimeapi.org/api/timezone/Europe/wrong')
}
</script>

<template>
  <div>
    <h1>{{ data.value ? new Date(data.value.unixtime * 1000).toLocaleString() : 'No time requested' }}</h1>
    <div class="container">
      <Button @click="fetchRomeTime">Fetch Rome time</Button>
      <Button @click="fetchWrongTime">Fetch Wrong time</Button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
</style>
