<script setup>
import { computed, ref } from '@vue/reactivity'
import { useDropdownStore } from '../../store/dropdown.store';
import { onMounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import XIcon from '../Icons/XIcon.vue'
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue'
import customerService from '../../services/customer.service'
import { useCustomerStore } from '../../store/customer.store'

const selectedOption = ref('')
const dropdown = ref(null)

onMounted(() => {
  clearSelectedOptionData()
})

watch(useDropdownStore(), () => {
  selectedOption.value = useDropdownStore().selectCustomerOption
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectCustomerOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closeCustomerDropDown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectCustomerOption(data)
  useDropdownStore().closeCustomerDropDown()
}

const searchCustomer = ref('')
const searchResults = ref([])

const getSearchResult = (options) => {
  if (searchCustomer.value) {
    searchResults.value = options.filter(customer => customer?.firstname.toLowerCase().includes(searchCustomer?.value.toLowerCase()))
  } else {
    searchResults.value = []
  }
}

const customers = computed(() => {
  return useCustomerStore().customers
})

onMounted(() => {
  customerService.getCustomers({}).then((res) => {
    useCustomerStore().clearStore()
    useCustomerStore().setCustomers(res.data)
  })
})

</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption && !useDropdownStore().isOpenCustomerDropDown"
        class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2">
        {{ selectedOption?.firstname + " " + selectedOption?.lastname }}
      </div>
      <input type="text" v-model="searchCustomer" v-if="useDropdownStore().isOpenCustomerDropDown"
        v-on:keyup="getSearchResult(customers)"
        class="relative w-full foucus:ring-0 focus:outline-none border-none text-lg rounded-lg bg-gray-100 py-2"
        :placeholder="$t('enterCustomerName')" />
      <div @click="useDropdownStore().openCustomerDropDown()"
        v-if="!useDropdownStore().isOpenCustomerDropDown && !selectedOption"
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">{{ $t('select')
        }}</div>
      <ChevronRightIcon @click="useDropdownStore().openCustomerDropDown()" v-if="!selectedOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="selectedOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="!searchCustomer && useDropdownStore().isOpenCustomerDropDown"
        class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" v-for="(customer, idx) in customers" :key="idx"
          @click="optionClicked(customer)">
          {{ customer?.firstname + " " + customer?.lastname }}
        </div>
        <div v-if="customers?.length === 0" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          <p class="text-red-500">{{ $t('serviceError') }}</p>
        </div>
      </div>
      <div v-if="searchCustomer && useDropdownStore().isOpenCustomerDropDown"
      class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
      <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" v-for="(customer, idx) in searchResults" :key="idx"
        @click="optionClicked(option)">
        {{ customer?.firstname + " " + customer?.lastname }}
      </div>
      <div v-if="searchResults?.length === 0" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
        <p class="text-red-500">{{ $t('serviceNotFound') }}</p>
      </div>
    </div>
  </label>
</div></template>