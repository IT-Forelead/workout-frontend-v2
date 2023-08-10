<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import PaymentService from '../../services/payment.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { usePaymentStore } from '../../store/payment.store'
import XIcon from '../../assets/icons/XIcon.vue'
import SelectOptionCustomerTariff from '../Inputs/SelectOptionCustomerTariff.vue'
import SelectOptionCustomerTrainerTariff from '../Inputs/SelectOptionCustomerTrainerTariff.vue'
import SelectOptionPaymentType from '../Inputs/SelectOptionPaymentType.vue'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'

const { t } = useI18n()

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const cost = ref(0)

const selectedPaymentType = computed(() => {
  return useDropdownStore().selectPaymentTypeOption
})

const selectedCustomerTariffOption = computed(() => {
  return useDropdownStore().selectCustomerTariffOption
})

const selectedCustomerTrainerTariffOption = computed(() => {
  return useDropdownStore().selectCustomerTrainerTariffOption
})

const clearForm = () => {
  useDropdownStore().setSelectPaymentTypeOption('')
  useDropdownStore().setSelectCustomerTariffOption('')
  useDropdownStore().setSelectCustomerTrainerTariffOption('')
  cost.value = 0
}

const closeModal = () => {
  useModalStore().closeAddPaymentModal()
  clearForm()
}

const isLoading = ref(false)

const submitServiceData = () => {
  if (!selectedPaymentType?.value?.id) {
    notify.warning({
      message: t('plsSelectPaymentType'),
    })
  } else if (!selectedCustomerTariffOption?.value?.customerTariff?.id && !selectedCustomerTrainerTariffOption?.value?.customerTrainerTariff?.id) {
    notify.warning({
      message: t('plsSelectCustomerTariff'),
    })
  } else if (cost.value == 0) {
    notify.warning({
      message: t('plsEnterPrice'),
    })
  } else {
    isLoading.value = true
    PaymentService.createPayment(
      cleanObjectEmptyFields({
        customerTariffId: selectedCustomerTariffOption?.value?.customerTariff?.id,
        customerTrainerTariffId: selectedCustomerTrainerTariffOption?.value?.customerTrainerTariff?.id,
        price: cost.value,
      })
    )
      .then(() => {
        notify.success({
          message: t('paymentCreated'),
        })
        isLoading.value = false
        PaymentService.getPayments({})
          .then((res) => {
            usePaymentStore().clearStore()
            setTimeout(() => {
              usePaymentStore().setPayments(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingPayments'),
            })
          })
        closeModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingPayment'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddPaymentModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-600">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium dark:text-white">{{ $t('addPayment') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white dark:bg-gray-900 dark:text-gray-300">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="dark:text-white">{{ $t('paymentType') }}</label>
            <SelectOptionPaymentType />
          </div>
          <div v-if="selectedPaymentType.id == 'for_tariff'">
            <label class="dark:text-white">{{ $t('customerTariff') }}</label>
            <SelectOptionCustomerTariff />
          </div>
          <div v-if="selectedPaymentType.id == 'for_trainer_tariff'">
            <label class="dark:text-white">{{ $t('customerTrainerTariff') }}</label>
            <SelectOptionCustomerTrainerTariff />
          </div>
          <div>
            <label for="price" class="dark:text-white">{{ $t('price') }}</label>
            <money3 v-model="cost" v-bind="moneyConf" id="price"
              class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:text-gray-300 dark:bg-gray-900"> </money3>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700">
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
