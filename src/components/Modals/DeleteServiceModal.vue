<script setup>
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import ServicesService from '../../services/services.service'
import { useModalStore } from '../../store/modal.store'
import { useServiceStore } from '../../store/service.store'
import WarningCircleIcon from '../../assets/icons/WarningCircleIcon.vue'
import XIcon from '../../assets/icons/XIcon.vue'

const { t } = useI18n()

const selectedService = computed(() => {
  return useServiceStore().selectedService
})

const closeModal = () => {
  useServiceStore().setSelectedService({})
  useModalStore().closeDeleteServiceModal()
}

const deleteData = (id) => {
  ServicesService.deleteService(id)
    .then(() => {
      notify.success({
        message: t('deletedService'),
      })
      ServicesService.getServices({}).then((res) => {
        useServiceStore().clearStore()
        useServiceStore().setServices(res)
      })
      closeModal()
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingService'),
      })
    })
}

const serviceTypeTranslate = (type) => {
  switch (type) {
    case 'usual':
      return t('usual')
    case 'for_students':
      return t('forStudents')
    case 'for_kids':
      return t('forKids')
  }
}

const durationDayTranslate = (n) => {
  switch (n) {
    case 1:
      return t('oneDay')
    case 30:
      return t('oneMonth')
    case 90:
      return t('threeMonths')
    case 180:
      return t('sixMonths')
    case 365:
      return t('oneYear')
  }
}

const monthlyVisitTranslate = (n) => {
  switch (n) {
    case 30:
      return t('everyDay')
    case 15:
      return t('fifteenDays')
  }
}
</script>
<template>
  <div v-if="useModalStore().isDeleteServiceModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('deleteData') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <XIcon />
          </button>
        </div>
        <div class="py-4 px-6 text-center space-y-6">
          <div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('serviceName') }}:</div>
              <div class="text-lg text-gray-700">{{ selectedService?.name }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('serviceType') }}:</div>
              <div class="text-lg text-gray-700">{{ serviceTypeTranslate(selectedService?.serviceType) }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('duration') }}:</div>
              <div class="text-lg text-gray-700">{{ durationDayTranslate(selectedService?.durationDay) }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('monthlyVisit') }}:</div>
              <div class="text-lg text-gray-700">{{ monthlyVisitTranslate(selectedService?.monthlyVisit) }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('priceForMale') }}:</div>
              <div class="text-lg text-gray-700">{{ useMoneyFormatter(selectedService?.priceForMale) }}</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-base text-gray-500">{{ $t('priceForFemale') }}:</div>
              <div class="text-lg text-gray-700">{{ useMoneyFormatter(selectedService?.priceForFemale) }}</div>
            </div>
          </div>
          <h3
            class="flex items-center justify-center mb-5 text-lg font-normal text-red-500 dark:text-gray-400 text-center">
            <WarningCircleIcon class="w-7 h-7 mr-2" />
            {{ $t('doYouDelete') }}
          </h3>
          <button @click="deleteData(selectedService?.id)" type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $t('yesImSure') }}
          </button>
          <button @click="closeModal()" type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ $t('noCancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
