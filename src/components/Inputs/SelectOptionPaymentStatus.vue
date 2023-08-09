<script setup>
import { ref } from '@vue/reactivity'
import { computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDropdownStore } from '../../store/dropdown.store'
import { useI18n } from 'vue-i18n'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'
import XIcon from '../../assets/icons/XIcon.vue'

const { t } = useI18n()

const selectedOption = computed(() => {
  return useDropdownStore().selectPaymentStatusOption
})
const dropdown = ref(null)

const list = [
  {
    id: 'not_paid',
    name: t('notPaid')
  },
  {
    id: 'fully_paid',
    name: t('fullyPaid')
  },
  {
    id: 'partially_paid',
    name: t('partiallyPaid')
  },
  {
    id: 'canceled',
    name: t('canceled')
  },
]

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectPaymentStatusOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closePaymentStatusDropDown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectPaymentStatusOption(data)
  useDropdownStore().closePaymentStatusDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption"
        class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2 dark:text-gray-300 dark:bg-gray-900"
        v-text="selectedOption?.name"></div>
      <div @click="useDropdownStore().openPaymentStatusDropDown()" v-else
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2 dark:bg-gray-900 dark:text-gray-300">{{ $t('select')
        }}</div>
      <ChevronRightIcon @click="useDropdownStore().openPaymentStatusDropDown()" v-if="!selectedOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600 dark:text-gray-300" />
      <XIcon @click="clearSelectedOptionData()" v-if="selectedOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1 dark:bg-gray-700 dark:hover:bg-gray-600" />
      <ul v-if="useDropdownStore().isOpenPaymentStatusDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 right-0 divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-900">
        <li v-for="(status, idx) in list" :key="idx" @click="optionClicked(status)"
          class="hover:bg-gray-200 cursor-pointer p-2 dark:text-gray-300 dark:hover:bg-gray-700">
          {{ status?.name }}
      </li>
    </ul>
  </label>
</div></template>
