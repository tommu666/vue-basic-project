import { ref, onMounted } from 'vue'
import { getCollectionDoc, setCollectionDoc, updateCollectionDoc } from '../utilities/firebase'
import { useCall } from './useCall'
import { firestoreCollections } from '../constants/firebaseConfigs'
import { useAuthStore } from '../store/store'
import { formatNewShoppingList, formatNewShoppingListItem, tShoppingListDoc, tShoppingListItem } from '../types'

export const useShoppingList = () => {
  const authStore = useAuthStore()
  const shoppingList = ref<tShoppingListItem[]>([])
  const { call } = useCall()

  const createShoppingList = () =>
    call(async function createShoppingList() {
      if (!authStore.user?.userId) return
      const newShoppingListDoc = formatNewShoppingList(authStore.user.userId)
      await setCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: authStore.user?.userId,
        data: newShoppingListDoc,
      })
      shoppingList.value = newShoppingListDoc.list
    })

  const fetchShoppingList = () =>
    call(async function fetchShoppingList() {
      if (!authStore.user?.userId) return
      const response = (await getCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: authStore.user?.userId,
      })) as tShoppingListDoc
      if (!response.userId) createShoppingList()
      else shoppingList.value = response.list
    })

  const addItem = () =>
    call(async function addItem() {
      const item = formatNewShoppingListItem()
      shoppingList.value.push(item)
      await updateCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: authStore.user!.userId,
        data: { list: shoppingList.value },
      })
    })

  const removeItem = (id: string) =>
    call(async function removeItem() {
      shoppingList.value = shoppingList.value.filter(item => item.id !== id)
      await updateCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: authStore.user!.userId,
        data: { list: shoppingList.value },
      })
    })

  const editItem = (id: string, data: Partial<tShoppingListItem>) =>
    call(async function editItem() {
      console.log('editing item', id, data)
      const index = shoppingList.value.findIndex(item => item.id === id)
      shoppingList.value[index] = { ...shoppingList.value[index], ...data }
    })

  const saveShoppingList = () =>
    call(async function saveShoppingList() {
      await updateCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: authStore.user!.userId,
        data: { list: shoppingList.value },
      })
    })

  onMounted(fetchShoppingList)

  return {
    shoppingList,
    fetchShoppingList,
    addItem,
    removeItem,
    editItem,
    saveShoppingList,
  }
}
