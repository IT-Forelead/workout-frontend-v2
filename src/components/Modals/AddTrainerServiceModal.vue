<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import TrainerServiceService from '../../services/trainerService.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useTrainerServiceStore } from '../../store/trainerService.store'
import XIcon from '../../assets/icons/XIcon.vue'
import SelectOptionDurationDay from '../Inputs/SelectOptionDurationDay.vue'
import SelectOptionMonthlyVisit from '../Inputs/SelectOptionMonthlyVisit.vue'
import SelectOptionServiceType from '../Inputs/SelectOptionServiceType.vue'
import SelectOptionTrainer from '../Inputs/SelectOptionTrainer.vue'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'

const { t } = useI18n()

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const selectServiceType = computed(() => {
  return useDropdownStore().selectServiceTypeOption
})

const selectTrainer = computed(() => {
  return useDropdownStore().selectTrainerOption
})

const selectDurationDay = computed(() => {
  return useDropdownStore().selectDurationDayOption
})

const selectMonthlyVisit = computed(() => {
  return useDropdownStore().selectMonthlyVisitOption
})

const submitForm = reactive({
  name: '',
  price: 0,
})

const clearForm = () => {
  submitForm.name = ''
  submitForm.price = 0
  useDropdownStore().clearStore()
}

const closeModal = () => {
  useModalStore().closeAddTrainerServiceModal()
  clearForm()
}

const isLoading = ref(false)

const submitTrainerServiceData = () => {
  if (!selectTrainer?.value?.id) {
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
  } else if (!selectMonthlyVisit?.value?.id) {
    notify.warning({
      message: t('plsSelectMonthlyVisit'),
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
    isLoading.value = true
    TrainerServiceService.createTrainerService(
      cleanObjectEmptyFields({
        userId: selectTrainer?.value?.id,
        name: submitForm.name,
        serviceType: selectServiceType?.value?.id,
        durationDay: selectDurationDay?.value?.id,
        monthlyVisit: selectMonthlyVisit?.value?.id,
        price: submitForm.price,
      })
    )
      .then(() => {
        notify.success({
          message: t('trainerServiceCreated'),
        })
        isLoading.value = false
        TrainerServiceService.getTrainerServices({})
          .then((res) => {
            useTrainerServiceStore().clearStore()
            setTimeout(() => {
              useTrainerServiceStore().setTrainerServices(res)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingTrainerServices'),
            })
          })
        closeModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingTrainerService'),
        })
        isLoading.value = false
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddTrainerServiceModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-4xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-600">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium dark:text-white">{{ $t('addTrainerService') }}</div>
          <button @click="closeModal()"
                                                                                                        class="dark:bg-gray-900 dark:text-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <XIcon />
        </button>
        </div>
        <div class="p-6">
          <div class="grid gap-5 grid-cols-2">
            <div class="space-y-4">
              <div>
                <label class="dark:text-white" for="serviceType">{{ $t('trainer') }}</label>
                <SelectOptionTrainer />
              </div>
              <div>
                <label class="dark:text-white" for="serviceName">{{ $t('serviceName') }}</label>
                <input v-model="submitForm.name" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:text-gray-300 dark:bg-gray-900 dark:placeholder-gray-400"
                  type="text" id="serviceName" :placeholder="$t('enterServiceName')" />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('serviceType') }}</label>
                <SelectOptionServiceType />
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="dark:text-white">{{ $t('durationDay') }}</label>
                <SelectOptionDurationDay />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('monthlyVisit') }}</label>
                <SelectOptionMonthlyVisit />
              </div>
              <div>
                <label class="dark:text-white" for="price">{{ $t('price') }}</label>
                <money3 v-model="submitForm.price" v-bind="moneyConf" id="price"
                  class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg dark:text-gray-300 dark:bg-gray-900 dark:placeholder-gray-400"> </money3>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700">
            {{ $t('reset') }}
          </button>
          <button v-if="!isLoading" @click="submitTrainerServiceData()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
          <button v-else class="w-36 p-2 rounded-md text-white text-base bg-blue-500 select-none">
            <div class="flex items-center justify-center ">
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
