<script setup>
import { ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDropdownStore } from '../../store/dropdown.store'
import { useTrainerServiceStore } from '../../store/trainerService.store'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'
import XIcon from '../../assets/icons/XIcon.vue'

const { t } = useI18n()

const selectedOption = computed(() => {
  return useDropdownStore().selectTrainerServiceOption
})

const dropdown = ref(null)

const trainerServices = computed(() => {
  return useTrainerServiceStore().trainerServicesByUserId
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectTrainerServiceOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closeTrainerServiceDropDown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectTrainerServiceOption(data)
  useDropdownStore().closeTrainerServiceDropDown()
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
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg p-2">
        {{ selectedOption?.name + ' - ' + durationDayTranslate(selectedOption?.durationDay) + ' (' + monthlyVisitTranslate(selectedOption?.monthlyVisit) + ')' }}
      </div>
      <div @click="useDropdownStore().openTrainerServiceDropDown()" v-else
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">
        {{ $t('select') }}
      </div>
      <ChevronRightIcon @click="useDropdownStore().openTrainerServiceDropDown()" v-if="!selectedOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="selectedOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <ul v-if="useDropdownStore().isOpenTrainerServiceDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 max-h-56 overflow-y-auto right-0 divide-y divide-gray-200">
        <li v-if="trainerServices.length == 0" class="w-full text-center text-red-500 p-2">
          {{ $t('empty') }}
        </li>
        <li v-else v-for="(service, idx) in trainerServices" :key="idx" @click="optionClicked(service)"
          class="hover:bg-gray-200 cursor-pointer p-2 ">
          {{ service?.name + ' - ' + durationDayTranslate(service?.durationDay) + ' (' + monthlyVisitTranslate(service?.monthlyVisit) + ')' }}
        </li>
      </ul>
    </label>
  </div>
</template>
