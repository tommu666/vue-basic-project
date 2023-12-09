import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IToast, tUser } from '../types'
import uniqid from 'uniqid'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref<string[]>([])

  function addLoading(id: string) {
    loading.value.push(id)
  }

  function removeLoading(id: string) {
    loading.value = loading.value.filter(item => item !== id)
  }

  const isLoading = computed(() => loading.value.length > 0)

  return { loading, addLoading, removeLoading, isLoading }
})

export const useToastsStore = defineStore('toasts', () => {
  const toasts = ref<IToast[]>([])

  function addToast(message: string, type?: 'success' | 'error') {
    toasts.value.push({ toastId: uniqid(), message, type: type ?? 'success' })
  }

  function removeToast(toastId: string) {
    toasts.value.splice(
      toasts.value.findIndex(toast => toast.toastId === toastId),
      1,
    )
  }

  const firstToast = computed(() => toasts.value[0])
  return { toasts, firstToast, addToast, removeToast }
})

export const useAuthStore = defineStore('auth', () => {
  const user = ref<tUser | null>(null)

  function setUser(newUser: tUser | null) {
    user.value = newUser
  }

  const isLogged = computed(() => user.value !== null)

  return { user, setUser, isLogged }
})
