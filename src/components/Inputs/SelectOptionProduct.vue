<script setup>
import { computed, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { onMounted } from 'vue'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import ProductService from '../../services/product.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useProductStore } from '../../store/product.store'
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue'
import SearchIcon from '../Icons/SearchIcon.vue'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionProductItem from '../Items/SelectOptionProductItem.vue'

const isLoading = ref(false)
const dropdown = ref(null)

// load products
const products = computed(() => {
  return useProductStore().products
})
const total = ref(1)
const target = ref('.products-wrapper')
const distance = ref(20)

let page = 0
const loadProducts = async ($state) => {
  page++
  let additional = total.value % 8 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 8 + additional >= page) {
    ProductService.getProducts(
      cleanObjectEmptyFields({
        name: searchProduct.value ? `%${searchProduct.value}%` : '',
        page: page,
        limit: 8,
      })
    ).then((result) => {
        total.value = result?.total
        useProductStore().setProducts(result?.data)
        $state.loaded()
      })
      .catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

onMounted(() => {
  useProductStore().clearStore()
})

onClickOutside(dropdown, () => {
  useDropdownStore().closeProductDropDown()
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectProductOption('')
}

const searchProduct = ref('')

const submitFilterData = () => {
  isLoading.value = true
  ProductService.getProducts(
    cleanObjectEmptyFields({
      productName: searchProduct.value ? `%${searchProduct.value}%` : '',
      page: 1,
      limit: 8,
    })
  ).then((res) => {
    useProductStore().clearStore()
    useProductStore().setProducts(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

const whenPressEnter = (e) => {
  if (e.keyCode === 13) {
    submitFilterData()
  }
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="useDropdownStore().selectProductOption"
        class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2 capitalize">
        {{ useDropdownStore().selectProductOption?.name }}
      </div>
      <input type="text" v-model="searchProduct" v-on:keypress="whenPressEnter($event)"
        v-if="useDropdownStore().isOpenProductDropDown"
        class="relative w-full foucus:ring-0 focus:outline-none border-none rounded-lg bg-gray-100 py-2"
        :placeholder="$t('enterCustomerName')" />
      <SearchIcon v-if="useDropdownStore().isOpenProductDropDown" @click="submitFilterData()"
        class="w-5 h-5 absolute right-2 cursor-pointer hover:text-red-500" />
      <div @click="useDropdownStore().openProductDropDown()"
        v-if="!useDropdownStore().isOpenProductDropDown && !useDropdownStore().selectProductOption"
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">
        {{ $t('select') }}
      </div>
      <ChevronRightIcon @click="useDropdownStore().openProductDropDown()"
        v-if="!useDropdownStore().isOpenProductDropDown && !useDropdownStore().selectProductOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="useDropdownStore().selectProductOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <ul v-if="useDropdownStore().isOpenProductDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 right-0 max-h-56 overflow-auto divide-y divide-gray-200 products-wrapper">
        <SelectOptionProductItem :products="products" :distance="distance" :target="target"
          @infinite="loadProducts" />
        <li v-if="products?.length === 0" class="w-full text-center text-red-500 p-2">
          {{ $t('empty') }}
        </li>
      </ul>
    </label>
  </div>
</template>
<style scoped></style>
