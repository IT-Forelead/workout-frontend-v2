<script setup>
import { computed, reactive } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import PaymentService from '../../services/payment.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { usePaymentStore } from '../../store/payment.store'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionPaymentType from '../Inputs/SelectOptionPaymentType.vue'

const { t } = useI18n()

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const selectedPaymentType = computed(() => {
  return useDropdownStore().selectPaymentTypeOption
})

const submitForm = reactive({
  paymentType: '',
  customerTariffId: '',
  customerTrainerTariffId: '',
  price: '',
})

const clearForm = () => {
  useDropdownStore().setSelectPaymentTypeOption('')
  submitForm.paymentType = ''
  submitForm.customerTariffId = ''
  submitForm.customerTrainerTariffId = ''
  submitForm.price = ''
}

const submitServiceData = () => {
  if (!selectedPaymentType?.value?.id) {
    notify.warning({
      message: t('plsSelectPaymentType'),
    })
  } else if (!submitForm.customerTariffId && !submitForm.customerTrainerTariffId) {
    notify.warning({
      message: t('plsSelectDurationDay'),
    })
  } else if (!submitForm.price == 0) {
    notify.warning({
      message: t('plsEnterPrice'),
    })
  } else {
    PaymentService.createPayment(
      cleanObjectEmptyFields({
        customerTariffId: '',
        customerTrainerTariffId: '',
        price: '',
      })
    )
      .then(() => {
        clearForm()
        notify.success({
          message: t('serviceCreated'),
        })
        PaymentService.getPayments({})
          .then((res) => {
            usePaymentStore().clearStore()
            setTimeout(() => {
              usePaymentStore().setPayments(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingServices'),
            })
          })
        useModalStore().closeAddPaymentModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingService'),
        })
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddPaymentModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addService') }}</div>
          <button @click="useModalStore().closeAddPaymentModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label>{{ $t('paymentType') }}</label>
            <SelectOptionPaymentType />
          </div>
          <div v-if="selectedPaymentType.id == 'for_tariff'">
            <label for="monthlyArrival">{{ $t('for_tariff') }}</label>
            <select v-model="submitForm.monthlyArrival" id="monthlyArrival"
              class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
              <option value="" selected>{{ $t('selectServiceType') }}</option>
              <option value="30">{{ $t('evriyday') }}</option>
              <option value="15">1/2</option>
            </select>
          </div>
          <div v-if="selectedPaymentType.id == 'for_trainer_tariff'">
            <label for="monthlyArrival">{{ $t('for_trainer_tariff') }}</label>
            <select v-model="submitForm.monthlyArrival" id="monthlyArrival"
              class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
              <option value="" selected>{{ $t('selectServiceType') }}</option>
              <option value="30">{{ $t('evriyday') }}</option>
              <option value="15">1/2</option>
            </select>
          </div>
          <div>
            <label for="price">{{ $t('price') }}</label>
            <money3 v-model="price" v-bind="moneyConf" id="price"
              class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"> </money3>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
            {{ $t('reset') }}
          </button>
          <button @click="submitServiceData()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
