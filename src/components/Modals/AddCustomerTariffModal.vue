<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import CustomerTariffService from '../../services/customerTariff.service'
import { useCustomerTariffStore } from '../../store/customerTariff.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionCustomer from '../Inputs/SelectOptionCustomer.vue'
import SelectOptionService from '../Inputs/SelectOptionService.vue'

const { t } = useI18n()

const createdAt = ref('')

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
}

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
    CustomerTariffService.createCustomerTariff(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        serviceId: selectedService.value?.id,
        createdAt: createdAt.value,
      })
    )
      .then(() => {
        clearForm()
        notify.success({
          message: t('customerTariffCreated'),
        })
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
        useModalStore().closeAddCustomerTariffModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingCustomerTariff'),
        })
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddCustomerTariffModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addCustomerTariff') }}</div>
          <button @click="useModalStore().closeAddCustomerTariffModal()"
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
            <label>{{ $t('service') }}</label>
            <SelectOptionService />
          </div>
          <div>
            <label for="createdAt">{{ $t('createdAt') }}</label>
            <input v-model="createdAt" type="datetime-local" id="createdAt"
              class="block border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg" />
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
