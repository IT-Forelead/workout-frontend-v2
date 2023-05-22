<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import SoldProductService from '../../services/soldProduct.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionCustomer from '../Inputs/SelectOptionCustomer.vue'
import Spinners270RingIcon from '../Icons/Spinners270RingIcon.vue'

const { t } = useI18n()

const selectedCustomer = computed(() => {
  return useDropdownStore().selectCustomerOption
})

const clearForm = () => {
  useDropdownStore().setSelectCustomerOption('')
  submitForm.productType = ''
  submitForm.quantity = ''
}

const closeModal = () => {
  useModalStore().closeAddSoldProdoctModal()
  clearForm()
}

const isLoading = ref(false)

const submitForm = reactive({
  productType: '',
  quantity: '',
})

const submitData = () => {
  if (!selectedCustomer.value?.id) {
    notify.warning({
      message: t('plsSelectCustomer'),
    })
  } else if (!submitForm.productType) {
    notify.warning({
      message: t('plsSelectProductType'),
    })
  } else if (!submitForm.quantity) {
    notify.warning({
      message: t('plsSelectQuantity'),
    })
  } else {
    isLoading.value = true
    SoldProductService.createSaleProduct({
      customerId: selectedCustomer.value?.id,
      productType: submitForm.productType,
      quantity: submitForm.quantity,
    })
      .then(() => {
        notify.success({
          message: t('soldProductCreated'),
        })
        isLoading.value = false
        closeModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingSoldProduct'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddSoldProdoctModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addSales') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label>{{ $t('customer') }}</label>
            <SelectOptionCustomer />
          </div>
          <div>
            <label>{{ $t('productType') }}</label>
            <select v-model="submitForm.productType" class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">
              <option value="">{{ $t('select') }}</option>
              <option value="water">{{ $t('water') }}</option>
            </select>
          </div>
          <div>
            <label>{{ $t('quantity') }}</label>
            <select v-model="submitForm.quantity" class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">
              <option value="">{{ $t('select') }}</option>
              <option value="0.5">0.5L</option>
              <option value="1.0">1L</option>
              <option value="1.5">1.5L</option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
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
