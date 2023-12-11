<script setup lang="ts">
import { useLogin } from '../composables/userComposables'

const { login } = useLogin()
</script>

<template>
  <div>
    <Button @click="login">Google Login</Button>
  </div>
</template>

<style scoped></style>
