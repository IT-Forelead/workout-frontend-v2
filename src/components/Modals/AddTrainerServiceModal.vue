<script setup>
import { computed, reactive } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import TrainerServiceService from '../../services/trainerService.service'
import { useTrainerServiceStore } from '../../store/trainerService.store'
import { useModalStore } from '../../store/modal.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionServiceType from '../Inputs/SelectOptionServiceType.vue'
import SelectOptionDurationDay from '../Inputs/SelectOptionDurationDay.vue'
import SelectOptionMonthlyArrival from '../Inputs/SelectOptionMonthlyArrival.vue'

const { t } = useI18n()

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const selectServiceType = computed(() => {
  return useDropdownStore().selectServiceTypeOption
})

const selectDurationDay = computed(() => {
  return useDropdownStore().selectDurationDayOption
})

const selectMonthlyArrival = computed(() => {
  return useDropdownStore().selectMonthlyArrivalOption
})

const submitForm = reactive({
  trainerId: '',
  name: '',
  price: 0,
})

const clearFormData = () => {
  submitForm.trainerId = ''
  submitForm.name = ''
  submitForm.price = 0
}

const clearForm = () => {
  clearFormData()
  useDropdownStore().clearStore()
}

const submitTrainerServiceData = () => {
  if (!submitForm.trainerId) {
    notify.warning({
      message: t('plsSelectTrainer'),
    })
  } else if (!submitForm.name) {
    notify.warning({
      message: t('plsEnterServiceName'),
    })
  } else if (!selectDurationDay?.value?.id) {
    notify.warning({
      message: t('plsSelectDurationDay'),
    })
  } else if (!selectMonthlyArrival?.value?.id) {
    notify.warning({
      message: t('plsSelectMonthlyArrival'),
    })
  } else if (!selectServiceType?.value?.id) {
    notify.warning({
      message: t('plsSelectServiceType'),
    })
  } else if (submitForm.price == 0) {
    notify.warning({
      message: t('plsEnterPrice'),
    })
  } else {
    TrainerServiceService.createTrainerService(
      cleanObjectEmptyFields({
        trainerId: submitForm.trainerId,
        name: submitForm.name,
        serviceType: selectServiceType?.value?.id,
        durationDay: selectDurationDay?.value?.id,
        monthlyArrival: selectMonthlyArrival?.value?.id,
        price: submitForm.price,
      })
      )
      .then(() => {
        clearForm()
        notify.success({
          message: t('trainerServiceCreated'),
        })
        TrainerServiceService.getAllTrainerServices()
          .then((res) => {
            useTrainerServiceStore().clearStore()
            setTimeout(() => {
              useTrainerServiceStore().setTrainerServices(res)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingServices'),
            })
          })
        useModalStore().closeAddTrainerServiceModal()
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
  <div v-if="useModalStore().isAddTrainerServiceModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-4xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addTrainerService') }}</div>
          <button @click="useModalStore().closeAddTrainerServiceModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6">
          <div class="grid gap-5 grid-cols-2">
            <div class="space-y-4">
              <div>
                <label for="serviceType">{{ $t('trainer') }}</label>
                <select v-model="submitForm.trainerId" id="serviceType"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option value="c671d884-0b3e-43af-a49a-76b05067127f">Jumaniyozov Suroj</option>
                </select>
              </div>
              <div>
                <label for="firstname">{{ $t('serviceName') }}</label>
                <input v-model="submitForm.name" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
                  type="text" id="firstname" :placeholder="$t('enterFirstname')" />
              </div>
              <div>
                <label>{{ $t('serviceType') }}</label>
                <SelectOptionServiceType />
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label>{{ $t('durationDay') }}</label>
                <SelectOptionDurationDay />
              </div>
              <div>
                <label>{{ $t('monthlyArrival') }}</label>
                <SelectOptionMonthlyArrival />
              </div>
              <div>
                <label for="price">{{ $t('price') }}</label>
                <money3 v-model="submitForm.price" v-bind="moneyConf" id="price"
                  class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"> </money3>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
            {{ $t('reset') }}
          </button>
          <button @click="submitTrainerServiceData()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
