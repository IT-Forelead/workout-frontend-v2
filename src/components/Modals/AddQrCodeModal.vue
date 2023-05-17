<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '../../store/modal.store'
import { useCustomerStore } from '../../store/customer.store'
import CustomerService from '../../services/customer.service'
import XIcon from '../Icons/XIcon.vue'
import UserIcon from '../Icons/UserIcon.vue'
import QrCodeIcon from '../Icons/QrCodeIcon.vue'
import Spinners270RingIcon from '../Icons/Spinners270RingIcon.vue'

const { t } = useI18n()

const CUSTOMER_IMAGE_URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const selectedCustomer = computed(() => {
  return useCustomerStore().selectedCustomer
})

const closeModal = () => {
  useModalStore().closeAddQrCodeModal()
}

const isLoading = ref(false)

const submitServiceData = (customerId) => {
  isLoading.value = true
  CustomerService.addQrCodeToCustomer(customerId)
    .then(() => {
      notify.success({
        message: t('addedQrCode'),
      })
      isLoading.value = false
      closeModal()
    })
    .catch((err) => {
      notify.error({
        message: t('errorAddingQrCode'),
      })
      isLoading.value = false
    })
}

</script>
<template>
  <div v-if="useModalStore().isAddQrCodeModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('customer') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-5 space-y-5">
          <div class="flex flex-col items-center space-y-2">
            <div v-if="selectedCustomer?.image">
              <img :src="CUSTOMER_IMAGE_URL + selectedCustomer?.image" alt="#"
                class="object-cover w-32 h-32 rounded-lg border duration-500 cursor-zoom-out hover:object-scale-down" />
            </div>
            <div v-else>
              <UserIcon class="w-32 h-32 rounded-lg text-gray-500 border p-1.5" />
            </div>
            <div class="text-lg font-medium capitalize">
              {{ selectedCustomer?.firstname + ' ' + selectedCustomer?.lastname }}
            </div>
            <div class="text-base text-gray-700">
              {{ selectedCustomer?.phone }}
            </div>
          </div>
          <div v-if="selectedCustomer?.barcode" class="relative">
            <input type="text" :value="selectedCustomer?.barcode"
              class="border-none pl-12 text-gray-500 bg-gray-100 rounded-lg w-full text-lg" disabled />
            <QrCodeIcon class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 left-3 w-7 h-7 cursor-pointer" />
          </div>
          <div v-else class="relative">
            <input type="text" class="border-none pl-12 text-gray-500 bg-gray-100 rounded-lg w-full text-lg uppercase"
              :placeholder="t('noQrCodeAvailable')" disabled />
            <QrCodeIcon class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 left-3 w-7 h-7 cursor-pointer" />
          </div>
          <div v-if="selectedCustomer?.barcode" class="flex items-center justify-end space-x-2">
            <button 
              class="py-2 px-4 rounded-md text-white text-base bg-red-600 cursor-pointer hover:bg-red-800">
              {{ $t('deleteQrCode') }}
            </button>
          </div>
          <div v-else class="flex items-center justify-end space-x-2">
            <button v-if="!isLoading" @click="submitServiceData(selectedCustomer?.id)"
              class="py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
              {{ $t('addQrCode') }}
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
  </div>
</template>
