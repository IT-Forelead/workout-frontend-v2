<script setup>
import CustomerItem from '../components/Items/CustomersItem.vue'
import authHeader from '../mixins/auth-header'
import { computed, ref, reactive } from '@vue/reactivity'
import { useCustomerStore } from '../store/customer.store'
import { useModalStore } from '../store/modal.store'
import { onMounted } from 'vue'
import CustomerService from '../services/customer.service'
import { onClickOutside } from '@vueuse/core'
import { cleanObjectEmptyFields } from '../mixins/utils'
import AxiosService from "../services/axios.service.js";
import FunnelIcon from '../components/Icons/FunnelIcon.vue'

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
  customerFirstName: '',
  customerLastName: '',
  phone: '',
  gender: '',
  startDate: '',
  endDate: '',
})

const submitFilterData = () => {
  isLoading.value = true
  CustomerService.getCustomers(cleanObjectEmptyFields(filterData)).then((res) => {
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
              class="border border-gray-200 select-none text-gray-500 bg-gray-50 rounded-md w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <FunnelIcon class="w-5 h-5 text-gray-400" />
              <span>
                {{ $t('filter') }}
              </span>
            </div>
            <div v-if="useModalStore().isOpenFilterBy"
              class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
              <div>
                <label for="firstname">{{ $t('firstname') }}</label>
                <input v-model="filterData.customerFirstName"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="firstname"
                  :placeholder="$t('enterFirstname')" />
              </div>
              <div>
                <label for="lastname">{{ $t('lastname') }}</label>
                <input v-model="filterData.customerLastName"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="lastname"
                  :placeholder="$t('enterLastname')" />
              </div>
              <!-- <div>
                <label for="phone">{{ $t('phone') }}</label>
                <input v-model="filterData.phone"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="phone"
                  :placeholder="$t('enterFirstname')" />
              </div> -->
              <div>
                <label for="gender">{{ $t('gender') }}</label>
                <select id="gender" v-model="filterData.gender" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
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
                <svg class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
                <span>{{ $t('loading') }}</span>
              </div>
              <div v-else @click="submitFilterData()"
                class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
                <span>{{ $t('filter') }}</span>
              </div>
            </div>
          </div>
          <div class="bg-black text-white text-base rounded-md p-2 px-4 cursor-pointer hover:bg-black/75">
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
