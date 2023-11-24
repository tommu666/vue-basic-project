import { reactive } from 'vue'
import { useCall } from './useCall'

export function useFetchAPI() {
  const data = reactive<{ value: null | { unixtime: number } }>({ value: null })
  const { call } = useCall()

  const fetchData = (url: string) =>
    call(async function fetchData() {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch data')
      const responseData = await response.json()

      data.value = responseData
    })

  return {
    data,
    fetchData,
  }
}
