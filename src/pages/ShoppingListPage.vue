<script setup lang="ts">
import { useShoppingList } from '../composables/shoppingListComposables'

const { shoppingLists, shoppingList, addItem, removeItem, editItem, shoppingListId, addShoppingList } =
  useShoppingList()
</script>

<template>
  <div>
    <h1>Shopping list</h1>
    <select v-model="shoppingListId">
      <option v-for="list in shoppingLists" :key="list.shoppingListId" :value="list.shoppingListId">
        {{ list.shoppingListId }}
      </option>
    </select>
    <div class="list">
      <div class="list-item" v-for="item in shoppingList" :key="item.id">
        <input
          type="text"
          :value="item.name"
          @input="editItem(item.id, { name: ($event.target as HTMLInputElement).value })"
        />
        <Button @click="removeItem(item.id)">-</Button>
      </div>
    </div>
    <div class="bottom-bar">
      <Button @click="addItem" :disabled="!shoppingListId">Add item</Button>
      <Button @click="addShoppingList">Add shopping list</Button>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

.bottom-bar {
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 10px;
}
</style>
