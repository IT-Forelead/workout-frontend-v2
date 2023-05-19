<script setup>
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import moment from 'moment'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomerService from '../../services/customer.service'
import { useCustomerStore } from '../../store/customer.store'
import { useModalStore } from '../../store/modal.store'
import UserIcon from '../Icons/UserIcon.vue'
import WarningCircleIcon from '../Icons/WarningCircleIcon.vue'
import XIcon from '../Icons/XIcon.vue'

const { t } = useI18n()

const CUSTOMER_IMAGE_URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const selectedCustomer = computed(() => {
  return useCustomerStore().selectedCustomer
})

const genderTranslate = (sex) => {
  switch (sex) {
    case 'male':
      return t('male')
    case 'female':
      return t('female')
  }
}

const closeModal = () => {
  useCustomerStore().setSelectedCustomer({})
  useModalStore().closeDeleteCustomerModal()
}

const deleteData = (id) => {
  CustomerService.deleteCustomer(id)
    .then(() => {
      notify.success({
        message: t('deletedCustomer'),
      })
      CustomerService.getCustomers({}).then((res) => {
        useCustomerStore().clearStore()
        useCustomerStore().setCustomers(res?.data)
      })
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingCustomer'),
      })
    })
}
</script>

<template>
  <div v-if="useModalStore().isDeleteCustomerModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('deleteData') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="py-4 px-6 text-center space-y-6">
          <div>
            <div v-if="selectedCustomer?.image" class="mb-2">
              <img :src="CUSTOMER_IMAGE_URL + selectedCustomer?.image" alt="#"
                class="object-cover w-32 h-32 rounded-lg border duration-500 cursor-zoom-out hover:object-scale-down" />
            </div>
            <div v-else class="mb-2">
              <UserIcon class="w-32 h-32 rounded-lg text-gray-500 border p-1.5" />
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('customer') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedCustomer?.firstname + ' ' + selectedCustomer?.lastname }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('phone') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedCustomer?.phone }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('gender') }}:</div>
              <div class="text-lg text-gray-700">{{ genderTranslate(selectedCustomer?.gender) }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('qrcode') }}:</div>
              <div v-if="selectedCustomer?.barcode" class="text-lg text-gray-700">{{ selectedCustomer?.barcode }}</div>
              <div v-else class="text-sm text-gray-500 uppercase">{{ $t('noQrCodeAvailable') }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('createdAt') }}:</div>
              <div class="text-lg text-gray-700">{{ moment(selectedCustomer?.createdAt).format('DD/MM/YYYY H:mm') }}</div>
            </div>
          </div>
          <h3
            class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deleteData(selectedCustomer?.id)" type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>
    </div>
  </div>
</div></template>
