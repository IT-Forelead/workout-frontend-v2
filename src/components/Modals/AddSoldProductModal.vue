<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import SoldProductService from '../../services/soldProduct.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useSoldProductStore } from '../../store/soldProduct.store'
import Spinners270RingIcon from '../Icons/Spinners270RingIcon.vue'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionCustomer from '../Inputs/SelectOptionCustomer.vue'

const { t } = useI18n()

const selectedCustomer = computed(() => {
  return useDropdownStore().selectCustomerOption
})

const clearForm = () => {
  useDropdownStore().setSelectCustomerOption('')
  submitForm.productType = 'water'
  submitForm.quantity = 1
}

const closeModal = () => {
  useModalStore().closeAddSoldProdoctModal()
  clearForm()
}

const isLoading = ref(false)

const submitForm = reactive({
  productType: 'water',
  quantity: 1,
})

const optionClicked = (data) => {
  submitForm.quantity = data
}

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
        SoldProductService.getSales({})
          .then((res) => {
            useSoldProductStore().clearStore()
            useSoldProductStore().setSoldProducts(res?.data)
          })
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
          <div class="select-none">
            <label>{{ $t('productType') }}</label>
            <div
              class="flex items-center justify-around border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg">
              <input id="toggle-05" @click="optionClicked('0.5')" class="toggle toggle-left" name="toggle" value="false"
                type="radio" :checked="submitForm.quantity == 0.5" />
              <label for="toggle-05" class="relative flex items-center justify-center py-2">
                <img class="w-12 h-12" src="/images/0.5l.png" alt="#">
              </label>
              <input id="toggle-1" @click="optionClicked('1.0')" class="toggle toggle-right" name="toggle" value="true"
                type="radio" :checked="submitForm.quantity == 1" />
              <label for="toggle-1" class="relative flex items-center justify-center py-2">
                <img class="w-12 h-12" src="/images/1l.png" alt="#">
              </label>
              <input id="toggle-15" @click="optionClicked('1.5')" class="toggle toggle-right" name="toggle" value="true"
                type="radio" :checked="submitForm.quantity == 1.5" />
              <label for="toggle-15" class="relative flex items-center justify-center py-2">
                <img class="w-12 h-12" src="/images/1.5l.png" alt="#">
              </label>
            </div>
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
<style scoped>
input[type='radio'].toggle {
  @apply hidden;
}

input[type='radio'].toggle+label {
  @apply cursor-pointer;
  @apply text-gray-900;
  @apply w-1/2;
}

input[type='radio'].toggle.toggle-left+label {
  @apply border-r-0;
}

input[type='radio'].toggle.toggle-left+label:after {
  @apply left-full;
}

input[type='radio'].toggle.toggle-right+label {
  @apply -ml-1;
}

input[type='radio'].toggle.toggle-right+label:after {
  @apply -left-full;
}

input[type='radio'].toggle:checked+label {
  @apply cursor-default;
  @apply text-blue-500;
  @apply bg-white;
  @apply border-4;
  @apply border-blue-200;
  @apply rounded-lg;
}

input[type='radio'].toggle:checked+label>span {
  @apply inline-block;
}

input[type='radio'].toggle:checked+label:after {
  @apply left-0;
}
</style>
