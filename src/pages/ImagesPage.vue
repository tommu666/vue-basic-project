<script setup lang="ts">
import { ref } from 'vue'
import { getStorageUrl } from '../utilities/firebase'
import { onMounted } from 'vue'

const imagesList = ['01', '02', '03']
const selectedImageIndex = ref(0)
const selectedImageUrl = ref('')

const selectNext = () => {
  const nextIndex = selectedImageIndex.value + 1 >= imagesList.length ? 0 : selectedImageIndex.value + 1
  selectedImageIndex.value = nextIndex
  getImageUrl(imagesList[nextIndex])
}

const selectPrevious = () => {
  const previousIndex = selectedImageIndex.value - 1 < 0 ? imagesList.length - 1 : selectedImageIndex.value - 1
  selectedImageIndex.value = previousIndex
  getImageUrl(imagesList[previousIndex])
}

const getImageUrl = async (image: string) => {
  selectedImageUrl.value = ''
  const url = await getStorageUrl({ path: `examples/${image}.png` })
  selectedImageUrl.value = url
}

onMounted(() => {
  getImageUrl(imagesList[selectedImageIndex.value])
})
</script>

<template>
  <div>
    <div class="image" :style="{ backgroundImage: `url(${selectedImageUrl})` }"></div>
    <div class="bottom-bar">
      <button @click="selectPrevious">{{ '<' }}</button>
      <p>{{ `Image number: ${selectedImageIndex + 1}` }}</p>
      <button @click="selectNext">{{ '>' }}</button>
    </div>
  </div>
</template>

<style scoped>
.image {
  width: 200px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.bottom-bar {
  display: flex;
  justify-content: space-between;
  width: 200px;
}
</style>
