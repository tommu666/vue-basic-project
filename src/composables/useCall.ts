import uniqid from 'uniqid'
import { useLoadingStore, useToastsStore } from '../store/store'

export function useCall() {
  const loadingStore = useLoadingStore()
  const toastsStore = useToastsStore()

  // eslint-disable-next-line @typescript-eslint/ban-types
  async function call(func: Function) {
    const id = uniqid()
    loadingStore.addLoading(id)
    try {
      const response = await func()
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      toastsStore.addToast(err.message ?? String(err), 'error')
    } finally {
      loadingStore.removeLoading(id)
    }
  }

  return {
    call,
  }
}
