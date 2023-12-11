<script setup lang="ts">
import { useShoppingList } from '../composables/shoppingListComposables'

const { shoppingList, addItem, removeItem, editItem, saveShoppingList } = useShoppingList()
</script>

<template>
  <div>
    <h1>Shopping list</h1>
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
      <Button @click="addItem">+</Button>
      <Button @click="saveShoppingList">SAVE</Button>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-item {
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-bottom: 10px;
}

.bottom-bar {
  display: flex;
  justify-content: space-between;
  width: 200px;
}
</style>
