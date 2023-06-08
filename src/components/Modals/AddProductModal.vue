<script setup>
import { computed, ref } from '@vue/reactivity'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import XIcon from '../Icons/XIcon.vue'
import Spinners270RingIcon from '../Icons/Spinners270RingIcon.vue'
import SelectProductOptionType from '../Inputs/SelectProductOptionType.vue'
const { t } = useI18n()

const productCount = ref(0)
const productName = ref('')

const clearForm = () => {
  useDropdownStore().setSelectProductTypeOption('')
  productCount.value = 0
  productName.value = ''
}

const closeModal = () => {
  useModalStore().closeAddProductModal()
  clearForm()
}
</script>
<template>
  <div v-if="useModalStore().isAddProductModalOpen" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addProduct') }}</div>
          <button @click="closeModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label>{{ $t('productName') }}</label>
            <input v-model="productName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg" type="text" id="serviceName" :placeholder="$t('enterProductName')" />
          </div>
          <div>
            <label>{{ $t('productType') }}</label>
            <SelectProductOptionType />
          </div>
          <div>
            <label>{{ $t('productNumber') }}</label>
            <input v-model="productCount" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg" type="number" id="serviceName" :placeholder="0" />
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()" class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
            {{ $t('reset') }}
          </button>
          <button v-if="!isLoading" @click="submitServiceData()" class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
          <button v-else class="w-36 p-2 rounded-md text-white text-base bg-blue-500 select-none">
            <div class="flex items-center justify-center">
              <Spinners270RingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
              <span>{{ $t('saving') }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
