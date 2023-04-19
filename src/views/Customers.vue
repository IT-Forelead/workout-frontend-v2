<script setup>
import CustomerItem from '../components/Items/CustomersItem.vue'
import authHeader from '../mixins/auth-header'
import { computed, ref, reactive } from '@vue/reactivity'
import { useCustomerStore } from '../store/customer.store'
import { useModalStore } from '../store/modal.store'
import { onMounted } from 'vue'
import CustomerService from '../services/customer.service'
import AxiosService from "../services/axios.service.js";
import { onClickOutside } from '@vueuse/core'
import { cleanObjectEmptyFields } from '../mixins/utils'
import FunnelIcon from '../components/Icons/FunnelIcon.vue'
import Spinners270RingIcon from '../components/Icons/Spinners270RingIcon.vue'

const isLoading = ref(false)

const total = ref(1)
const customers = computed(() => {
  return useCustomerStore().customers
})
const target = ref('.customers-wrapper')
const distance = ref(0)

let page = 0
const loadCustomers = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    AxiosService.post("/customer/report", { page: page, limit: 30 }, { headers: authHeader() })
      .then((result) => {
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
      gender: filterData.gender,
      phone: filterData.phone.replace(/([() -])/g, ''),
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
    <div class="bg-white rounded capitalize h-[40vh] p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">Customer report</p>
        <div class="flex items-center space-x-3">
          <div class="relative" ref="dropdown">
            <div @click="useModalStore().toggleFilterBy()"
              class="border border-gray-200 select-none text-gray-500 bg-gray-50 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <FunnelIcon class="w-5 h-5 text-gray-400" />
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
              <!-- <div>
                          <label for="phone">{{ $t('phone') }}</label>
                          <input v-model="filterData.phone"
                            class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="phone"
                            :placeholder="$t('enterFirstname')" />
                        </div> -->
              <div>
                <label for="gender">{{ $t('gender') }}</label>
                <select id="gender" v-model="filterData.gender"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
                  <option value="" selected>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div class="flex items-center space-x-1">
                <label for="">
                  {{ $t('from') }}
                  <input v-model="filterData.startDate" type="datetime-local"
                    class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
                </label>
                <!-- <ArrowDownIcon class="-rotate-90 text-gray-600 mt-6" /> -->
                <label for="">
                  {{ $t('to') }}
                  <input v-model="filterData.endDate" type="datetime-local"
                    class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
                </label>
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
            add customer
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden customers-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('user') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('gender') }}</th>
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