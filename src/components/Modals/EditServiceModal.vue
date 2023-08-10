<script setup>
import { computed, reactive, ref, } from '@vue/reactivity'
import { watch } from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import ServicesService from '../../services/services.service'
import { useServiceStore } from '../../store/service.store'
import { useModalStore } from '../../store/modal.store'
import { useDropdownStore } from '../../store/dropdown.store'
import XIcon from '../../assets/icons/XIcon.vue'
import SelectOptionServiceType from '../Inputs/SelectOptionServiceType.vue'
import SelectOptionDurationDay from '../Inputs/SelectOptionDurationDay.vue'
import SelectOptionMonthlyVisit from '../Inputs/SelectOptionMonthlyVisit.vue'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'

const { t } = useI18n()

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const serviceTypes = [
  {
    id: 'usual',
    name: t('usual')
  },
  {
    id: 'for_students',
    name: t('forStudents')
  },
  {
    id: 'for_kids',
    name: t('forKids')
  },
]

const durationDays = [
  {
    id: 1,
    name: t('oneDay')
  },
  {
    id: 30,
    name: t('oneMonth')
  },
  {
    id: 90,
    name: t('threeMonths')
  },
  {
    id: 180,
    name: t('sixMonths')
  },
  {
    id: 365,
    name: t('oneYear')
  },
]

const monthlyVisits = [
  {
    id: 15,
    name: t('fifteenDays')
  },
  {
    id: 30,
    name: t('everyDay')
  },
]

const selectedService = computed(() => {
  return useServiceStore().selectedService
})

const selectServiceType = computed(() => {
  return useDropdownStore().selectServiceTypeOption
})

const selectDurationDay = computed(() => {
  return useDropdownStore().selectDurationDayOption
})

const selectMonthlyVisit = computed(() => {
  return useDropdownStore().selectMonthlyVisitOption
})

const submitForm = reactive({
  id: '',
  name: '',
  priceForMale: 0,
  priceForFemale: 0,
})

const clearForm = () => {
  submitForm.id = ''
  submitForm.name = ''
  submitForm.priceForMale = 0
  submitForm.priceForFemale = 0
  useDropdownStore().clearStore()
}

const closeModal = () => {
  useModalStore().closeEditServiceModal()
  useServiceStore().setSelectedService({})
  clearForm()
}

watch(
  () => selectedService.value,
  (data) => {
    if (data) {
      submitForm.id = data?.id
      submitForm.name = data?.name
      submitForm.priceForMale = data?.priceForMale
      submitForm.priceForFemale = data?.priceForFemale
      useDropdownStore().setSelectServiceTypeOption(
        serviceTypes.filter(el => el?.id == data?.serviceType)[0]
      )
      useDropdownStore().setSelectDurationDayOption(
        durationDays.filter(el => el?.id == data?.durationDay)[0]
      )
      useDropdownStore().setSelectMonthlyVisitOption(
        monthlyVisits.filter(el => el?.id == data?.monthlyVisit)[0]
      )
    }
  }
)

const isLoading = ref(false)

const submitServiceData = () => {
  if (!submitForm.id) {
    notify.warning({
      message: t('serviceNotFound'),
    })
  } else if (!submitForm.name) {
    notify.warning({
      message: t('plsEnterServiceName'),
    })
  } else if (!selectDurationDay?.value?.id) {
    notify.warning({
      message: t('plsSelectDurationDay'),
    })
  } else if (!selectMonthlyVisit?.value?.id) {
    notify.warning({
      message: t('plsSelectMonthlyVisit'),
    })
  } else if (!selectServiceType?.value?.id) {
    notify.warning({
      message: t('plsSelectServiceType'),
    })
  } else if (submitForm.priceForMale == 0) {
    notify.warning({
      message: t('plsEnterPriceForMale'),
    })
  } else if (submitForm.priceForFemale == 0) {
    notify.warning({
      message: t('plsEnterPriceForFemale'),
    })
  } else {
    isLoading.value = true
    ServicesService.editService({
      id: submitForm.id,
      name: submitForm.name,
      serviceType: selectServiceType?.value?.id,
      durationDay: selectDurationDay?.value?.id,
      monthlyVisit: selectMonthlyVisit?.value?.id,
      priceForMale: submitForm.priceForMale,
      priceForFemale: submitForm.priceForFemale,
    })
      .then(() => {
        notify.success({
          message: t('serviceEdited'),
        })
        isLoading.value = false
        ServicesService.getServices({})
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
        closeModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorEditingService'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isEditServiceModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-4xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-600">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium dark:text-white">{{ $t('editService') }}</div>
          <button @click="closeModal()"
            class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300 dark:bg-gray-900">
            <XIcon />
          </button>
        </div>
        <div class="p-6">
          <div class="grid gap-5 grid-cols-2">
            <div class="space-y-4">
              <div>
                <label class="dark:text-white" for="serviceName">{{ $t('serviceName') }}</label>
                <input v-model="submitForm.name" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:bg-gray-900 dark:text-gray-300"
                  type="text" id="serviceName" :placeholder="$t('enterServiceName')" />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('duration') }}</label>
                <SelectOptionDurationDay />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('monthlyVisit') }}</label>
                <SelectOptionMonthlyVisit />
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="dark:text-white">{{ $t('serviceType') }}</label>
                <SelectOptionServiceType />
              </div>
              <div>
                <label class="dark:text-white" for="priceForMale">{{ $t('priceForMale') }}</label>
                <money3 v-model="submitForm.priceForMale" v-bind="moneyConf" id="priceForMale"
                  class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:text-gray-300 dark:bg-gray-900"> </money3>
              </div>
              <div>
                <label class="dark:text-white" for="priceForFemale">{{ $t('priceForFemale') }}</label>
                <money3 v-model="submitForm.priceForFemale" v-bind="moneyConf" id="priceForFemale"
                  class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:text-gray-300 dark:bg-gray-900"> </money3>
              </div>
            </div>
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
