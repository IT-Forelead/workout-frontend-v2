<script setup>
import { ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import customerTrainerTariffService from '../../services/customerTrainerTariff.service'
import { useCustomerTrainerTariffStore } from '../../store/customerTrainerTariff.store'
import { useDropdownStore } from '../../store/dropdown.store'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'
import UserIcon from '../../assets/icons/UserIcon.vue'
import XIcon from '../../assets/icons/XIcon.vue'

const { t } = useI18n()

const selectedOption = computed(() => {
  return useDropdownStore().selectCustomerTrainerTariffOption
})
const dropdown = ref(null)

const customerTrainerTariffs = computed(() => {
  return useCustomerTrainerTariffStore().customerTrainerTariffs
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectCustomerTrainerTariffOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closeCustomerTrainerTariffDropDown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectCustomerTrainerTariffOption(data)
  useDropdownStore().closeCustomerTrainerTariffDropDown()
}

onMounted(() => {
  customerTrainerTariffService.getCustomerTrainerTariffs({}).then((res) => {
    useCustomerTrainerTariffStore().clearStore()
    useCustomerTrainerTariffStore().setCustomerTrainerTariffs(res.data)
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
          {{ selectedOption?.customer?.firstname + " " + selectedOption?.customer?.lastname + " - " + selectedOption?.trainerService?.trainerFirstName + " " + selectedOption?.trainerService?.trainerLastName + ' - ' + selectedOption?.trainerService?.name }}
        </div>
      </div>
      <div @click="useDropdownStore().openCustomerTrainerTariffDropDown()" v-else
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">
        {{ $t('select') }}
      </div>
      <ChevronRightIcon @click="useDropdownStore().openCustomerTrainerTariffDropDown()" v-if="!selectedOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="selectedOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <ul v-if="useDropdownStore().isOpenCustomerTrainerTariffDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 right-0 divide-y divide-gray-200">
        <li v-for="(customerTrainerTariff, idx) in customerTrainerTariffs" :key="idx" @click="optionClicked(customerTrainerTariff)"
          class="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer p-2 ">
          <UserIcon class="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 p-1" />
          <div class="capitalize">
            {{ customerTrainerTariff?.customer?.firstname + " " + customerTrainerTariff?.customer?.lastname + " - " + customerTrainerTariff?.trainerService?.trainerFirstName + " " + customerTrainerTariff?.trainerService?.trainerLastName + ' - ' + customerTrainerTariff?.trainerService?.name }}
          </div>
        </li>
      </ul>
    </label>
  </div>
</template>
