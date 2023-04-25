<script setup>
import { ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import customerTariffService from '../../services/customerTariff.service'
import { useCustomerTariffStore } from '../../store/customerTariff.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { useUserStore } from '../../store/user.store'
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue'
import UserIcon from '../Icons/UserIcon.vue'
import XIcon from '../Icons/XIcon.vue'

const { t } = useI18n()

const selectedOption = computed(() => {
  return useDropdownStore().selectCustomerTariffOption
})
const dropdown = ref(null)

const customerTariffs = computed(() => {
  return useCustomerTariffStore().customerTariffs
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectCustomerTariffOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closeCustomerTariffDropDown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectCustomerTariffOption(data)
  useDropdownStore().closeCustomerTariffDropDown()
}

onMounted(() => {
  customerTariffService.getCustomerTariffs({}).then((res) => {
    useUserStore().clearStore()
    useCustomerTariffStore().setCustomerTariffs(res.data)
  }).catch(() => {
    console.log("Error while getting customer tariffs");
  })
})
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption"
        class="flex items-center space-x-2 border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2">
        <UserIcon class="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 p-1" />
        <div class="capitalize">
          {{ selectedOption?.customer?.firstname + " " + selectedOption?.customer?.lastname + " - " + selectedOption?.service?.name }}
        </div>
      </div>
      <div @click="useDropdownStore().openCustomerTariffDropDown()" v-else
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">
        {{ $t('select') }}
      </div>
      <ChevronRightIcon @click="useDropdownStore().openCustomerTariffDropDown()" v-if="!selectedOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="selectedOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <ul v-if="useDropdownStore().isOpenCustomerTariffDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 right-0 divide-y divide-gray-200">
        <li v-for="(customerTariff, idx) in customerTariffs" :key="idx" @click="optionClicked(customerTariff)"
          class="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer p-2 ">
          <UserIcon class="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 p-1" />
          <div class="capitalize">
            {{ customerTariff?.customer?.firstname + " " + customerTariff?.customer?.lastname + " - " + customerTariff?.service?.name }}
          </div>
        </li>
      </ul>
    </label>
  </div>
</template>
