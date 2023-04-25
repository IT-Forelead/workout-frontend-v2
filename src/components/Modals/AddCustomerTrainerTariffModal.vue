<script setup>
import { computed, reactive } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomerTrainerTariffService from '../../services/customerTrainerTariff.service'
import trainerServiceService from '../../services/trainerService.service'
import { useCustomerTrainerTariffStore } from '../../store/customerTrainerTariff.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useTrainerServiceStore } from '../../store/trainerService.store'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionTrainer from '../Inputs/SelectOptionTrainer.vue'
import SelectOptionTrainerService from '../Inputs/SelectOptionTrainerService.vue'
import SelectOptionCustomerTariff from '../Inputs/SelectOptionCustomerTariff.vue'

const { t } = useI18n()

const customerTrainerTariffForm = reactive({
  customerTariffId: '',
  trainerServiceId: '',
})

const selectedTrainer = computed(() => {
  return useDropdownStore().selectTrainerOption
})

const selectedTrainerService = computed(() => {
  return useDropdownStore().selectTrainerServiceOption
})

watch(
  () => selectedTrainer.value,
  (data) => {
    if (data) {
      trainerServiceService.getTrainerServicesByUserId(selectedTrainer.value?.id).then((res) => {
        useTrainerServiceStore().clearStore()
        useTrainerServiceStore().setTrainerServicesByUserId(res)
      })
    }
  })

const clearForm = () => {
  customerTrainerTariffForm.customerTariffId = ''
  useDropdownStore().setSelectTrainerOption('')
  useDropdownStore().setSelectTrainerServiceOption('')
}

const submitServiceData = () => {
  if (customerTrainerTariffForm.customerTariffId) {
    notify.warning({
      message: t('plsSelectCustomertariff'),
    })
  } else if (!selectedTrainerService?.value?.id) {
    notify.warning({
      message: t('plsSelectTrainerService'),
    })
  } else {
    CustomerTrainerTariffService.createCustomerTrainerTariff({
      customerTariffId: '',
      trainerServiceId: selectedTrainerService?.value?.id,
    })
      .then(() => {
        clearForm()
        notify.success({
          message: t('serviceCreated'),
        })
        CustomerTrainerTariffService.getCustomerTrainerTariffs({})
          .then((res) => {
            useCustomerTrainerTariffStore().clearStore()
            setTimeout(() => {
              useCustomerTrainerTariffStore().setCustomerTrainerTariffs(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingServices'),
            })
          })
        useModalStore().closeAddCustomerTrainerTariffModal()
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
  <div v-if="useModalStore().isAddCustomerTrainerTariffModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addService') }}</div>
          <button @click="useModalStore().closeAddCustomerTrainerTariffModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label for="durationDay">{{ $t('customerTariff') }}</label>
            <SelectOptionCustomerTariff />
          </div>
          <div>
            <label>{{ $t('trainer') }}</label>
            <SelectOptionTrainer />
          </div>
          <div>
            <label>{{ $t('trainerService') }}</label>
            <SelectOptionTrainerService />
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
