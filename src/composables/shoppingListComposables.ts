import { ref, onMounted, computed } from 'vue'
import { addCollectionDoc, setCollectionWatcherWithQueries, updateCollectionDoc } from '../utilities/firebase'
import { useCall } from './useCall'
import { firestoreCollections } from '../constants/firebaseConfigs'
import { useAuthStore } from '../store/store'
import { formatNewShoppingList, formatNewShoppingListItem, tShoppingListDoc, tShoppingListItem } from '../types'
import { DocumentData } from 'firebase/firestore'

export const useShoppingList = () => {
  const authStore = useAuthStore()
  const shoppingLists = ref<Record<string, tShoppingListDoc>>({})
  const shoppingListId = ref<string>('')
  const shoppingList = computed(() => shoppingLists.value[shoppingListId.value]?.list || [])
  const { call } = useCall()

  const addShoppingList = async () => {
    if (!authStore.user?.userId) return
    const newShoppingList = formatNewShoppingList(authStore.user.userId)
    const response = await addCollectionDoc({
      collectionId: firestoreCollections.shoppingList,
      data: newShoppingList,
      idName: 'shoppingListId',
    })
    shoppingListId.value = response.shoppingListId
  }

  const addItem = () =>
    call(async function addItem() {
      const item = formatNewShoppingListItem()
      const newList = [...shoppingList.value, item]
      await updateCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: shoppingListId.value,
        data: { list: newList },
      })
    })

  const removeItem = (id: string) =>
    call(async function removeItem() {
      const newList = shoppingList.value.filter(item => item.id !== id)
      await updateCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: shoppingListId.value,
        data: { list: newList },
      })
    })

  const editItem = (id: string, data: Partial<tShoppingListItem>) =>
    call(async function editItem() {
      updateCollectionDoc({
        collectionId: firestoreCollections.shoppingList,
        docId: shoppingListId.value,
        data: { list: shoppingList.value.map(item => (item.id === id ? { ...item, ...data } : item)) },
      })
    })

  const fetchShoppingLists = () =>
    call(async function fetchShoppingLists() {
      if (!authStore.user?.userId) return
      setCollectionWatcherWithQueries({
        collectionId: firestoreCollections.shoppingList,
        queries: [{ key: 'userId', operator: '==', value: authStore.user.userId }],
        setChanges: (changes: Record<string, DocumentData>) => {
          shoppingLists.value = changes as Record<string, tShoppingListDoc>
        },
      })
    })

  const setShoppingListId = (id: string) => {
    shoppingListId.value = id
  }

  onMounted(fetchShoppingLists)

  return {
    shoppingLists,
    shoppingList,
    addItem,
    removeItem,
    editItem,
    shoppingListId,
    setShoppingListId,
    addShoppingList,
  }
}
