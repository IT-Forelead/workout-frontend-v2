<script setup>
import { computed, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { onMounted } from 'vue'
import SelectOptionCustomerItem from '../../components/Items/SelectOptionCustomerItem.vue'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import CustomerService from '../../services/customer.service'
import { useCustomerStore } from '../../store/customer.store'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'
import SearchIcon from '../../assets/icons/SearchIcon.vue'
import UserIcon from '../../assets/icons/UserIcon.vue'
import XIcon from '../../assets/icons/XIcon.vue'

const isLoading = ref(false)
const dropdown = ref(null)

const total = ref(1)
const customers = computed(() => {
  return useCustomerStore().customers
})
const target = ref('.customers-wrapper')
const distance = ref(20)

let page = 0
const loadCustomers = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    CustomerService.getCustomers(
      cleanObjectEmptyFields({
        firstName: searchCustomer.value ? `%${searchCustomer.value}%` : '',
        page: page,
        limit: 8,
      })
    ).then((result) => {
      total.value = result?.total
      useCustomerStore().setCustomers(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

onMounted(() => {
  useCustomerStore().clearStore()
})

onClickOutside(dropdown, () => {
  useDropdownStore().closeCustomerDropDown()
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectCustomerOption('')
}

const searchCustomer = ref('')

const submitFilterData = () => {
  isLoading.value = true
  CustomerService.getCustomers(
    cleanObjectEmptyFields({
      firstName: searchCustomer.value ? `%${searchCustomer.value}%` : '',
      page: 1,
      limit: 8,
    })
  ).then((res) => {
    useCustomerStore().clearStore()
    useCustomerStore().setCustomers(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

const whenPressEnter = (e) => {
  if (e.keyCode === 13) {
    submitFilterData()
  }
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div @click="useDropdownStore().openCustomerDropDown()"
        class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer dark:bg-gray-900 dark:text-gray-300">
        <UserIcon class="w-10 h-10 border-r dark:border-none rounded-lg p-2" />
      </div>
      <div v-if="useDropdownStore().selectCustomerOption"
        class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize dark:bg-gray-900 dark:text-gray-300">
        {{ useDropdownStore().selectCustomerOption?.firstname + ' ' + useDropdownStore().selectCustomerOption?.lastname }}
      </div>
      <input type="text" v-model="searchCustomer" v-on:keypress="whenPressEnter($event)"
        v-if="useDropdownStore().isOpenCustomerDropDown"
        class="relative w-full focus:ring-0 focus:outline-none border-none rounded-r-lg bg-gray-100 py-2 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-400"
        :placeholder="$t('enterCustomerName')" />
      <SearchIcon v-if="useDropdownStore().isOpenCustomerDropDown" @click="submitFilterData()"
        class="w-5 h-5 absolute right-2 cursor-pointer hover:text-red-500 dark:text-gray-300" />
      <div @click="useDropdownStore().openCustomerDropDown()"
        v-if="!useDropdownStore().isOpenCustomerDropDown && !useDropdownStore().selectCustomerOption"
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2 dark:bg-gray-900 dark:text-gray-300">
        {{ $t('select') }}
      </div>
      <ChevronRightIcon @click="useDropdownStore().openCustomerDropDown()"
        v-if="!useDropdownStore().isOpenCustomerDropDown && !useDropdownStore().selectCustomerOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600 dark:text-gray-300" />
      <XIcon @click="clearSelectedOptionData()" v-if="useDropdownStore().selectCustomerOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1 dark:bg-gray-700 dark:hover:bg-gray-600" />
      <ul v-if="useDropdownStore().isOpenCustomerDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 right-0 max-h-56 overflow-auto divide-y divide-gray-200 dark:divide-gray-600 customers-wrapper">
        <SelectOptionCustomerItem :customers="customers" :distance="distance" :target="target"
          @infinite="loadCustomers" />
        <li v-if="customers?.length === 0" class="w-full text-center text-red-500 p-2">
          {{ $t('empty') }}
        </li>
      </ul>
    </label>
  </div>
</template>
<style scoped></style>
