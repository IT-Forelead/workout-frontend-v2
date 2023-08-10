<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import ProductHistoryService from '../../services/productHistory.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useProductHistoryStore } from '../../store/productHistory.store'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'
import XIcon from '../../assets/icons/XIcon.vue'
import SelectOptionProduct from '../Inputs/SelectOptionProduct.vue'
import SelectOptionProductHistoryType from '../Inputs/SelectOptionProductHistoryType.vue'

const { t } = useI18n()
const isLoading = ref(false)

const productCount = ref(0)

const selectedProduct = computed(() => {
  return useDropdownStore().selectProductOption
})

const selectedProductHistoryType = computed(() => {
  return useDropdownStore().selectProductHistoryTypeOption
})

const clearForm = () => {
  useDropdownStore().setSelectProductOption('')
  useDropdownStore().setSelectProductHistoryTypeOption('')
  productCount.value = 0
}

const closeModal = () => {
  useModalStore().closeAddProductHistoryModal()
  clearForm()
}

const submitData = () => {
  if (!selectedProduct.value?.id) {
    notify.warning({
      message: t('plsSelectProduct'),
    })
  } else if (!selectedProductHistoryType.value?.id) {
    notify.warning({
      message: t('plsSelectProductHistoryType'),
    })
  } else if (productCount.value == 0) {
    notify.warning({
      message: t('plsEnterProductCount'),
    })
  } else {
    isLoading.value = true
    ProductHistoryService.createProductHistory({
      productId: selectedProduct.value?.id,
      productHistoryType: selectedProductHistoryType.value?.id,
      count: productCount.value,
    }).then(() => {
      notify.success({
        message: t('productHistoryCreated'),
      })
      isLoading.value = false
      ProductHistoryService.getProductHistories({})
        .then((res) => {
          useProductHistoryStore().clearStore()
          setTimeout(() => {
            useProductHistoryStore().setProductHistories(res?.data)
          }, 500)
        })
        .catch(() => {
          notify.error({
            message: t('errorGettingProductHistories'),
          })
        })
      closeModal()
    })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingProductHistory'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddProductHistoryModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium dark:text-white">{{ $t('addProduct') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white dark:bg-gray-900 dark:text-gray-300">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="dark:text-white">{{ $t('product') }} </label>
            <SelectOptionProduct />
          </div>
          <div>
            <label class="dark:text-white">{{ $t('productHistoryType') }}</label>
            <SelectOptionProductHistoryType />
          </div>
          <div>
            <label class="dark:text-white">{{ $t('productNumber') }}</label>
            <input v-model="productCount" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:text-gray-300 dark:bg-gray-900 dark:placeholder-gray-400"
              type="number" id="serviceName" :placeholder="0" />
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700">
            {{ $t('reset') }}
          </button>
          <button v-if="!isLoading" @click="submitData()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
          <button v-else class="w-36 p-2 rounded-md text-white text-base bg-blue-500 select-none">
            <div class="flex items-center justify-center">
              <Spinners270RingIcon
                class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
              <span>{{ $t('saving') }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
