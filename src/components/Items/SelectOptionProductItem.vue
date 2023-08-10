<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { toRefs } from 'vue'
import { useDropdownStore } from '../../store/dropdown.store'

const props = defineProps({
  products: { type: Array, required: true },
})

const { products } = toRefs(props)

const optionClicked = (data) => {
  useDropdownStore().setSelectProductOption(data)
  useDropdownStore().closeProductDropDown()
}
</script>
<template>
  <li v-for="(product, idx) in products" :key="idx" @click="optionClicked(product)" class="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer p-2 dark:hover:bg-gray-700">
    {{ product?.name }}
  </li>
  <li class="flex items-center justify-center w-full p-2">
    <InfiniteLoading v-bind="$attrs" />
  </li>
</template>
