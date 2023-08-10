<script setup>
import { computed, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import CustomerTrainerTariffService from '../../services/customerTrainerTariff.service'
import trainerServiceService from '../../services/trainerService.service'
import { useCustomerTrainerTariffStore } from '../../store/customerTrainerTariff.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useTrainerServiceStore } from '../../store/trainerService.store'
import XIcon from '../../assets/icons/XIcon.vue'
import SelectOptionCustomerTariff from '../Inputs/SelectOptionCustomerTariff.vue'
import SelectOptionTrainer from '../Inputs/SelectOptionTrainer.vue'
import SelectOptionTrainerService from '../Inputs/SelectOptionTrainerService.vue'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'

const { t } = useI18n()

const createdAt = ref('')

const selectedCustomerTariffOption = computed(() => {
  return useDropdownStore().selectCustomerTariffOption
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
        useTrainerServiceStore().clearTrainerServicesByUserId()
        useTrainerServiceStore().setTrainerServicesByUserId(res)
      })
    }
  })

const clearForm = () => {
  useDropdownStore().setSelectCustomerTariffOption('')
  useDropdownStore().setSelectTrainerOption('')
  useDropdownStore().setSelectTrainerServiceOption('')
  createdAt.value = ''
}

const closeModal = () => {
  useModalStore().closeAddCustomerTrainerTariffModal()
  clearForm()
}

const isLoading = ref(false)

const submitServiceData = () => {
  if (!selectedCustomerTariffOption?.value?.customerTariff?.id) {
    notify.warning({
      message: t('plsSelectCustomerTariff'),
    })
  } else if (!selectedTrainerService?.value?.id) {
    notify.warning({
      message: t('plsSelectTrainerService'),
    })
  } else {
    isLoading.value = true
    CustomerTrainerTariffService.createCustomerTrainerTariff(
      cleanObjectEmptyFields({
        customerTariffId: selectedCustomerTariffOption?.value?.customerTariff?.id,
        trainerServiceId: selectedTrainerService?.value?.id,
        createdAt: createdAt.value,
      })
    )
      .then(() => {
        notify.success({
          message: t('customerTrainerTariffCreated'),
        })
        isLoading.value = false
        CustomerTrainerTariffService.getCustomerTrainerTariffs({})
          .then((res) => {
            useCustomerTrainerTariffStore().clearStore()
            setTimeout(() => {
              useCustomerTrainerTariffStore().setCustomerTrainerTariffs(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingCustomerTrainerTariffs'),
            })
          })
        closeModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingCustomerTrainerTariff'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddCustomerTrainerTariffModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-600">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium dark:text-white">{{ $t('addCustomerTrainerTariff') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="dark:text-white">{{ $t('customerTariff') }}</label>
            <SelectOptionCustomerTariff />
          </div>
          <div>
            <label class="dark:text-white">{{ $t('trainer') }}</label>
            <SelectOptionTrainer />
          </div>
          <div>
            <label class="dark:text-white">{{ $t('trainerService') }}</label>
            <SelectOptionTrainerService />
          </div>
          <div>
            <label for="createdAt" class="dark:text-white">{{ $t('createdAt') }}</label>
            <input v-model="createdAt" type="datetime-local" id="createdAt"
              class="block border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:text-gray-300 dark:bg-gray-900" />
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
