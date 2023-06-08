<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { vMaska } from "maska"
import { useI18n } from 'vue-i18n'
import CustomerTariffService from '../../services/customerTariff.service'
import VisitService from '../../services/visit.service'
import { useCustomerTariffStore } from '../../store/customerTariff.store'
import { useModalStore } from '../../store/modal.store'
import Spinners270RingIcon from '../Icons/Spinners270RingIcon.vue'
import UserIcon from '../Icons/UserIcon.vue'
import XIcon from '../Icons/XIcon.vue'

const { t } = useI18n()

const visitCount = ref(0)

const selectedCustomerTariff = computed(() => {
  return useCustomerTariffStore().selectedCustomerTariff
})

const clearForm = () => {
  visitCount.value = 0
}

const closeModal = () => {
  useModalStore().closeAddFakeVisitModal()
  clearForm()
}

const isLoading = ref(false)

const submitData = () => {
  if (!selectedCustomerTariff.value?.customerTariff?.customerId) {
    console.log(selectedCustomerTariff.value?.customer?.id);
    notify.warning({
      message: t('plsSelectCustomer'),
    })
  } else if (visitCount.value == 0) {
    notify.warning({
      message: t('plsSelectVisitCount'),
    })
  } else {
    isLoading.value = true
    VisitService.createFakeVisit({
      customerId: selectedCustomerTariff.value?.customer?.id,
      visitCount: visitCount.value,
    }).then(() => {
      notify.success({
        message: t('visitCreated'),
      })
      isLoading.value = false
      CustomerTariffService.getCustomerTariffs({})
        .then((res) => {
          useCustomerTariffStore().clearStore()
          setTimeout(() => {
            useCustomerTariffStore().setCustomerTariffs(res?.data)
          }, 500)
        })
        .catch(() => {
          notify.error({
            message: t('errorGettingCustomerTariffs'),
          })
        })
      closeModal()
    })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingVisit'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddFakeVisitModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addVisit') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label>{{ $t('customer') }}</label>
            <div class="select-none">
              <label ref="dropdown" class="flex items-center w-full relative">
                <div class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer">
                  <UserIcon class="w-10 h-10 border-r rounded-lg p-2" />
                </div>
                <div
                  class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize">
                  {{ selectedCustomerTariff?.customer?.firstname + ' ' + selectedCustomerTariff?.customer?.lastname }}
                </div>
              </label>
            </div>
          </div>
          <div>
            <label>{{ $t('visitCount') }}</label>
            <input v-model="visitCount" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
              type="number" v-maska data-maska="##" placeholder="0" max="30" />
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
