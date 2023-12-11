import uniqid from 'uniqid'

export type tShoppingListDoc = {
  list: tShoppingListItem[]
  userId: string
}

export type tShoppingListItem = {
  id: string
  name: string
  quantity: number
  unit: string
  checked: boolean
}

export const formatNewShoppingList = (userId: string): tShoppingListDoc => ({
  userId,
  list: [],
})

export const formatNewShoppingListItem = (): tShoppingListItem => ({
  id: uniqid(),
  name: '',
  quantity: 1,
  unit: 'pcs',
  checked: false,
})
