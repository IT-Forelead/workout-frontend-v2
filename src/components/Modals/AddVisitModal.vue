<script setup>
import { computed } from '@vue/reactivity'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import VisitService from '../../services/visit.service'
import { useVisitStore } from '../../store/visit.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import XIcon from '../Icons/XIcon.vue'
import SelectOptionCustomer from '../Inputs/SelectOptionCustomer.vue'
import RadionVisitType from '../Inputs/RadionVisitType.vue'

const { t } = useI18n()

const selectedCustomer = computed(() => {
  return useDropdownStore().selectCustomerOption
})

const selectedVisitType = computed(() => {
  return useDropdownStore().selectVisitTypeOption
})

const clearForm = () => {
  useDropdownStore().setSelectCustomerOption('')
  useDropdownStore().setSelectVisitTypeOption('')
}

const closeModal = () => {
  useModalStore().closeAddVisitModal()
  clearForm()
}

const submitData = () => {
  if (!selectedCustomer.value?.id) {
    notify.warning({
      message: t('plsSelectCustomer'),
    })
  } else if (!selectedVisitType.value?.id) {
    notify.warning({
      message: t('plsSelectVisitType'),
    })
  } else {
    VisitService.createVisit({
      customerId: selectedCustomer.value?.id,
      visitType: selectedVisitType.value?.id,
    })
      .then(() => {
        notify.success({
          message: t('visitCreated'),
        })
        VisitService.getVisits({})
          .then((res) => {
            useVisitStore().clearStore()
            setTimeout(() => {
              useVisitStore().setVisits(res?.data)
            }, 500)
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingVisits'),
            })
          })
        closeModal()
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingVisit'),
        })
      })
  }
}
</script>
<template>
  <div v-if="useModalStore().isAddVisitModalOpen"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('addVisit') }}</div>
          <button @click="closeModal()"
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
            <label>{{ $t('visitType') }}</label>
            <RadionVisitType />
          </div>
        </div>
        <div class="flex items-center justify-end p-4 space-x-2 border-t dark:border-gray-600">
          <button @click="clearForm()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-gray-600 cursor-pointer hover:bg-gray-800">
            {{ $t('reset') }}
          </button>
          <button @click="submitData()"
            class="w-36 py-2 px-4 rounded-md text-white text-base bg-blue-600 cursor-pointer hover:bg-blue-800">
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
