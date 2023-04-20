<script setup>
import { reactive } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import TrainerServiceService from '../../services/trainerService.service'
import { useTrainerServiceStore } from '../../store/trainerService.store'
import { useModalStore } from '../../store/modal.store'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import XIcon from '../Icons/XIcon.vue'

const { t } = useI18n()

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const serviceTypes = [
  {
    value: 'usual',
    name: 'Usual'
  },
  {
    value: 'for_students',
    name: 'For students'
  },
  {
    value: 'for_kids',
    name: 'For kids'
  },
]

const durationDays = [
  {
    value: 1,
    name: 'Bir kunlik'
  },
  {
    value: 30,
    name: 'Bir oylik'
  },
  {
    value: 90,
    name: 'Uch oylik'
  },
  {
    value: 180,
    name: 'Olti oylik'
  },
  {
    value: 365,
    name: 'Bir yillik'
  }
]

const trainerServiceForm = reactive({
  trainerId: '',
  name: '',
  serviceType: '',
  durationDay: 0,
  monthlyArrival: 0,
  price: 0,
})

const clearForm = () => {
  trainerServiceForm.trainerId = ''
  trainerServiceForm.name = ''
  trainerServiceForm.serviceType = ''
  trainerServiceForm.durationDay = 0
  trainerServiceForm.monthlyArrival = 0
  trainerServiceForm.price = 0
}

const submitTrainerServiceData = () => {
  if (!trainerServiceForm.trainerId) {
    notify.warning({
      message: t('plsSelectTrainer'),
    })
  } else if (!trainerServiceForm.name) {
    notify.warning({
      message: t('plsEnterServiceName'),
    })
  } else if (!trainerServiceForm.durationDay) {
    notify.warning({
      message: t('plsSelectDurationDay'),
    })
  } else if (!trainerServiceForm.monthlyArrival) {
    notify.warning({
      message: t('plsSelectMonthlyArrival'),
    })
  } else if (!trainerServiceForm.serviceType) {
    notify.warning({
      message: t('plsSelectServiceType'),
    })
  } else if (trainerServiceForm.priceForMale == 0) {
    notify.warning({
      message: t('plsEnterPriceForMale'),
    })
  } else if (trainerServiceForm.priceForFemale == 0) {
    notify.warning({
      message: t('plsEnterPriceForFemale'),
    })
  } else {
    TrainerServiceService.createTrainerService(cleanObjectEmptyFields(trainerServiceForm))
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
                <select v-model="trainerServiceForm.trainerId" id="serviceType"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option value="">Jumaniyozov Suroj</option>
                </select>
              </div>
              <div>
                <label for="firstname">{{ $t('serviceName') }}</label>
                <input v-model="trainerServiceForm.name" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
                  type="text" id="firstname" :placeholder="$t('enterFirstname')" />
              </div>
              <div>
                <label for="serviceType">{{ $t('serviceType') }}</label>
                <select v-model="trainerServiceForm.serviceType" id="serviceType"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option v-for="(type, idx) in serviceTypes" :key="idx" :value="type.value">{{ type.name }}</option>
                </select>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label for="durationDay">{{ $t('durationDay') }}</label>
                <select v-model="trainerServiceForm.durationDay" id="durationDay"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option v-for="(type, idx) in durationDays" :key="idx" :value="type.value">{{ type.name }}</option>
                </select>
              </div>
              <div>
                <label for="monthlyArrival">{{ $t('monthlyArrival') }}</label>
                <select v-model="trainerServiceForm.monthlyArrival" id="monthlyArrival"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option value="30">{{ $t('evriyday') }}</option>
                  <option value="15">1/2</option>
                </select>
              </div>
              <div>
                <label for="price">{{ $t('priceForFemale') }}</label>
                <money3 v-model="trainerServiceForm.priceForFemale" v-bind="moneyConf" id="price"
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
