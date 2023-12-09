import { useAuthStore } from '../store/store'
import { getLoggedUser, googleSignIn, userSignOut } from '../utilities/firebase'
import { useCall } from './useCall'
import { onMounted } from 'vue'

export const useAutoLogin = () => {
  const authStore = useAuthStore()

  onMounted(async () => {
    const loggedUser = await getLoggedUser()
    if (loggedUser)
      authStore.setUser({
        name: loggedUser.displayName!,
        email: loggedUser.email!,
        userId: loggedUser.uid,
      })
    else authStore.setUser(null)
  })

  return {}
}

export const useLogin = () => {
  const authStore = useAuthStore()
  const { call } = useCall()

  const login = () =>
    call(async function login() {
      const response = await googleSignIn()
      if (response.user)
        authStore.setUser({
          name: response.user.displayName!,
          email: response.user.email!,
          userId: response.user.uid,
        })
    })

  return {
    login,
  }
}

export const useLogout = () => {
  const authStore = useAuthStore()

  const logout = async () => {
    await userSignOut()
    authStore.setUser(null)
  }

  return {
    logout,
  }
}
