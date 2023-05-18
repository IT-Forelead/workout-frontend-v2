<script setup>
import { ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import ServicesService from '../../services/services.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useServiceStore } from '../../store/service.store'
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue'
import SearchIcon from '../Icons/SearchIcon.vue'
import XIcon from '../Icons/XIcon.vue'

const { t } = useI18n()

const isLoading = ref(false)
const search = ref('')

const selectedOption = computed(() => {
  return useDropdownStore().selectServiceOption
})
const dropdown = ref(null)

const services = computed(() => {
  return useServiceStore().services
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectServiceOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closeServiceDropDown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectServiceOption(data)
  useDropdownStore().closeServiceDropDown()
}

onMounted(() => {
  ServicesService.getServices({}).then((res) => {
    useServiceStore().clearStore()
    useServiceStore().setServices(res)
  })
})

const submitFilterData = () => {
  isLoading.value = true
  ServicesService.getServices(
    cleanObjectEmptyFields({
      name: search.value ? `%${search.value}%` : '',
    })
  ).then((res) => {
    useServiceStore().clearStore()
    useServiceStore().setServices(res)
    isLoading.value = false
  })
}

const whenPressEnter = (e) => {
  if (e.keyCode === 13) {
    submitFilterData()
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
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="useDropdownStore().selectServiceOption"
        class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize">
        {{ useDropdownStore().selectServiceOption?.name + ' ' +
          durationDayTranslate(useDropdownStore().selectServiceOption?.durationDay) + ' (' +
          monthlyVisitTranslate(useDropdownStore().selectServiceOption?.monthlyVisit) + ')' }}
      </div>
      <input type="text" v-model="search" v-on:keypress="whenPressEnter($event)"
        v-if="useDropdownStore().isOpenServiceDropDown"
        class="relative w-full foucus:ring-0 focus:outline-none border-none rounded-r-lg bg-gray-100 py-2"
        :placeholder="$t('enterCustomerName')" />
      <SearchIcon v-if="useDropdownStore().isOpenServiceDropDown" @click="submitFilterData()"
        class="w-5 h-5 absolute right-2 cursor-pointer hover:text-red-500" />
      <div @click="useDropdownStore().openServiceDropDown()"
        v-if="!useDropdownStore().isOpenServiceDropDown && !useDropdownStore().selectServiceOption"
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">
        {{ $t('select') }}
      </div>
      <ChevronRightIcon @click="useDropdownStore().openServiceDropDown()"
        v-if="!useDropdownStore().isOpenServiceDropDown && !useDropdownStore().selectServiceOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="useDropdownStore().selectServiceOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <ul v-if="useDropdownStore().isOpenServiceDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 max-h-56 overflow-y-auto right-0 divide-y divide-gray-200">
        <li v-for="(service, idx) in services" :key="idx" @click="optionClicked(service)"
          class="hover:bg-gray-200 cursor-pointer p-2 ">
          {{ service?.name + ' - ' + durationDayTranslate(service?.durationDay) + ' (' +
            monthlyVisitTranslate(service?.monthlyVisit) + ')' }}
        </li>
      </ul>
    </label>
  </div>
</template>
