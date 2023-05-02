<script setup>
import { ref } from '@vue/reactivity'
import { computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDropdownStore } from '../../store/dropdown.store'
import { useI18n } from 'vue-i18n'
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue'
import XIcon from '../Icons/XIcon.vue'

const { t } = useI18n()

const selectedOption = computed(() => {
  return useDropdownStore().selectDurationDayOption
})
const dropdown = ref(null)

const list = [
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

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectDurationDayOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closeDurationDayDropDown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectDurationDayOption(data)
  useDropdownStore().closeDurationDayDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption"
        class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2"
        v-text="selectedOption?.name"></div>
      <div @click="useDropdownStore().openDurationDayDropDown()" v-else
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">{{ $t('select')
        }}</div>
      <ChevronRightIcon @click="useDropdownStore().openDurationDayDropDown()" v-if="!selectedOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="selectedOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <ul v-if="useDropdownStore().isOpenDurationDayDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 right-0 divide-y divide-gray-200">
        <li v-for="(status, idx) in list" :key="idx" @click="optionClicked(status)"
          class="hover:bg-gray-200 cursor-pointer p-2 ">
          {{ status?.name }}
        </li>
      </ul>
    </label>
  </div>
</template>
