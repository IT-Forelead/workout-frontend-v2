<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import moment from 'moment'
import { onMounted } from 'vue'
import FunnelIcon from '../components/Icons/FunnelIcon.vue'
import Spinners270RingIcon from '../components/Icons/Spinners270RingIcon.vue'
import SelectOptionGender from '../components/Inputs/SelectOptionGender.vue'
import CustomerItem from '../components/Items/CustomerItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import CustomerService from '../services/customer.service'
import { useCustomerStore } from '../store/customer.store'
import { useDropdownStore } from '../store/dropdown.store'
import { useModalStore } from '../store/modal.store'

const isLoading = ref(false)

const total = ref(1)
const customers = computed(() => {
  return useCustomerStore().customers
})
const target = ref('.customers-wrapper')
const distance = ref(0)

const selectGender = computed(() => {
  return useDropdownStore().selectGenderOption
})

let page = 0
const loadCustomers = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    CustomerService.getCustomers(
      cleanObjectEmptyFields({
        firstName: filterData.firstName ? `%${filterData.firstName}%` : '',
        lastName: filterData.lastName ? `%${filterData.lastName}%` : '',
        gender: selectGender.value?.id,
        phone: filterData.phone.replace(/([() -])/g, ''),
        startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
        endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
        page: page,
        limit: 30,
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

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  gender: '',
  startDate: '',
  endDate: '',
})

const submitFilterData = () => {
  isLoading.value = true
  CustomerService.getCustomers(
    cleanObjectEmptyFields({
      firstName: filterData.firstName ? `%${filterData.firstName}%` : '',
      lastName: filterData.lastName ? `%${filterData.lastName}%` : '',
      gender: selectGender.value?.id,
      phone: filterData.phone.replace(/([() -])/g, ''),
      startDate: moment(filterData.startDate).startOf('day').format().slice(0, 16),
      endDate: moment(filterData.endDate).endOf('day').format().slice(0, 16),
      page: 1,
      limit: 30,
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
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">{{ $t('customersReport') }}</p>
        <div class="flex items-center space-x-3">
          <div class="relative" ref="dropdown">
            <div @click="useModalStore().toggleFilterBy()"
              class="select-none bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-200 cursor-pointer">
              <FunnelIcon class="w-5 h-5 text-gray-500" />
              <span>
                {{ $t('filter') }}
              </span>
            </div>
            <div v-if="useModalStore().isOpenFilterBy"
              class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
              <div>
                <label for="firstname">{{ $t('firstname') }}</label>
                <input v-model="filterData.firstName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full"
                  type="text" id="firstname" :placeholder="$t('enterFirstname')" />
              </div>
              <div>
                <label for="lastname">{{ $t('lastname') }}</label>
                <input v-model="filterData.lastName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full"
                  type="text" id="lastname" :placeholder="$t('enterLastname')" />
              </div>
              <div>
                <label for="gender">{{ $t('gender') }}</label>
                <SelectOptionGender />
              </div>
              <div>
                <label>{{ $t('createdAt') }}</label>
                <div class="flex items-center space-x-1">
                  <div class="relative">
                    <input v-model="filterData.startDate" type="date"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">{{ $t('from') }}</div>
                  </div>
                  <div class="relative">
                    <input v-model="filterData.endDate" type="date"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-14" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">{{ $t('to') }}</div>
                  </div>
                </div>
              </div>
              <div v-if="isLoading"
                class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
                <Spinners270RingIcon
                  class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
                <span>{{ $t('loading') }}</span>
              </div>
              <div v-else @click="submitFilterData()"
                class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
                <span>{{ $t('filter') }}</span>
              </div>
            </div>
          </div>
          <div @click="useModalStore().openAddCustomerModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75">
            {{ $t('addCustomer') }}
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden customers-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('customer') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('gender') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('createdAt') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <CustomerItem :customers="customers" :distance="distance" :target="target" @infinite="loadCustomers" />
          </tbody>
        </table>
        <div v-if="customers?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
