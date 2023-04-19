<script setup>
import { reactive } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import ServicesService from '../../services/services.service'
import { useServiceStore } from '../../store/service.store'
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

const serviceForm = reactive({
  name: '',
  serviceType: '',
  durationDay: 0,
  monthlyArrival: 0,
  priceForMale: 0,
  priceForFemale: 0,
})

const clearForm = () => {
  serviceForm.name = ''
  serviceForm.serviceType = ''
  serviceForm.durationDay = 0
  serviceForm.monthlyArrival = 0
  serviceForm.priceForMale = 0
  serviceForm.priceForFemale = 0
}

const submitServiceData = () => {
  if (!serviceForm.name) {
    notify.warning({
      message: t('plsEnterServiceName'),
    })
  } else if (!serviceForm.durationDay) {
    notify.warning({
      message: t('plsSelectDurationDay'),
    })
  } else if (!serviceForm.monthlyArrival) {
    notify.warning({
      message: t('plsSelectMonthlyArrival'),
    })
  } else if (!serviceForm.serviceType) {
    notify.warning({
      message: t('plsSelectServiceType'),
    })
  } else if (serviceForm.priceForMale == 0) {
    notify.warning({
      message: t('plsEnterPriceForMale'),
    })
  } else if (serviceForm.priceForFemale == 0) {
    notify.warning({
      message: t('plsEnterPriceForFemale'),
    })
  } else {
    ServicesService.createService(cleanObjectEmptyFields(serviceForm))
      .then(() => {
        clearForm()
        notify.success({
          message: t('serviceCreated'),
        })
        ServicesService.getAllServices()
          .then((res) => {
            useServiceStore().clearStore()
            setTimeout(() => {
              useServiceStore().setServices(res)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingServices'),
            })
          })
        useModalStore().closeAddServiceModal()
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
  <div v-if="useModalStore().isAddServiceModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-4xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addService') }}</div>
          <button @click="useModalStore().closeAddServiceModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="p-6">
          <div class="grid gap-5 grid-cols-2">
            <div class="space-y-4">
              <div>
                <label for="firstname">{{ $t('serviceName') }}</label>
                <input v-model="serviceForm.name" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg"
                  type="text" id="firstname" :placeholder="$t('enterFirstname')" />
              </div>
              <div>
                <label for="durationDay">{{ $t('durationDay') }}</label>
                <select v-model="serviceForm.durationDay" id="durationDay"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option v-for="(type, idx) in durationDays" :key="idx" :value="type.value">{{ type.name }}</option>
                </select>
              </div>
              <div>
                <label for="monthlyArrival">{{ $t('monthlyArrival') }}</label>
                <select v-model="serviceForm.monthlyArrival" id="monthlyArrival"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option value="30">{{ $t('evriyday') }}</option>
                  <option value="15">1/2</option>
                </select>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label for="serviceType">{{ $t('serviceType') }}</label>
                <select v-model="serviceForm.serviceType" id="serviceType"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
                  <option value="" selected>{{ $t('selectServiceType') }}</option>
                  <option v-for="(type, idx) in serviceTypes" :key="idx" :value="type.value">{{ type.name }}</option>
                </select>
              </div>
              <div>
                <label for="gender">{{ $t('priceForMale') }}</label>
                <money3 v-model="serviceForm.priceForMale" v-bind="moneyConf" id="servicePrice"
                  class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"> </money3>
              </div>
              <div>
                <label for="gender">{{ $t('priceForFemale') }}</label>
                <money3 v-model="serviceForm.priceForFemale" v-bind="moneyConf" id="servicePrice"
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
          <button @click="submitServiceData()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
