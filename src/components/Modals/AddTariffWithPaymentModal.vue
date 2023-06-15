<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import CustomerTariffService from '../../services/customerTariff.service'
import PaymentService from '../../services/payment.service.js'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import Spinners270RingIcon from '../Icons/Spinners270RingIcon.vue'
import UserIcon from '../Icons/UserIcon.vue'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionService from '../Inputs/SelectOptionService.vue'

const { t } = useI18n()

const createdAt = ref('')

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const cost = ref(0)

const selectedCustomer = computed(() => {
  return useDropdownStore().selectCustomerOption
})

const selectedService = computed(() => {
  return useDropdownStore().selectServiceOption
})

const clearForm = () => {
  useDropdownStore().setSelectCustomerOption('')
  useDropdownStore().setSelectServiceOption('')
  createdAt.value = ''
  cost.value = 0
}

const closeModal = () => {
  useModalStore().closeAddTariffWithPaymentModal()
  clearForm()
}

const isLoading = ref(false)

const submitServiceData = () => {
  if (!selectedCustomer.value?.id) {
    notify.warning({
      message: t('plsSelectCustomer'),
    })
  } else if (!selectedService.value?.id) {
    notify.warning({
      message: t('plsSelectService'),
    })
  } else {
    isLoading.value = true
    CustomerTariffService.createCustomerTariff(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        serviceId: selectedService.value?.id,
        createdAt: createdAt.value,
      })
    ).then((data) => {
      notify.success({
        message: t('customerTariffCreated'),
      })
      isLoading.value = false
      if (cost.value > 0) {
        PaymentService.createPayment(
          cleanObjectEmptyFields({
            customerTariffId: data?.id,
            price: cost.value,
          })
        ).then(() => {
          notify.success({
            message: t('paymentCreated'),
          })
        })
          .catch((err) => {
            notify.error({
              message: t('errorCreatingPayment'),
            })
          })
      }
      closeModal()
    })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingCustomerTariff'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddTariffWithPaymentModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addCustomerTariff') }}</div>
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
                <div v-if="useDropdownStore().selectCustomerOption"
                  class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize">
                  {{ useDropdownStore().selectCustomerOption?.firstname + ' ' +
                    useDropdownStore().selectCustomerOption?.lastname }}
                </div>
              </label>
            </div>
          </div>
          <div>
            <label>{{ $t('service') }}</label>
            <SelectOptionService />
          </div>
          <div>
            <label for="createdAt">{{ $t('createdAt') }}</label>
            <input v-model="createdAt" type="datetime-local" id="createdAt"
              class="block border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg" />
          </div>
          <div>
            <label for="price">{{ $t('price') }}</label>
            <money3 v-model="cost" v-bind="moneyConf" id="price"
              class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"> </money3>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
            {{ $t('reset') }}
          </button>
          <button v-if="!isLoading" @click="submitServiceData()"
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
