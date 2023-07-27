<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import xlsx from 'json-as-xlsx'
import moment from 'moment'
import { onMounted } from 'vue'
import XlsIcon from '../assets/icons/ExcelIcon.vue'
import FunnelIcon from '../assets/icons/FunnelIcon.vue'
import Spinners270RingIcon from '../assets/icons/Spinners270RingIcon.vue'
import SelectOptionCustomer from '../components/Inputs/SelectOptionCustomer.vue'
import PaymentItem from '../components/Items/PaymentItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import PaymentService from '../services/payment.service'
import { useDropdownStore } from '../store/dropdown.store'
import { useModalStore } from '../store/modal.store'
import { usePaymentStore } from '../store/payment.store'

const isLoading = ref(false)

const selectedCustomer = computed(() => {
  return useDropdownStore().selectCustomerOption
})

// load payments
const payments = computed(() => {
  return usePaymentStore().payments
})
const total = ref(1)
const target = ref('.payments-wrapper')
const distance = ref(0)

let page = 0
const loadPayments = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    PaymentService.getPayments(
      cleanObjectEmptyFields({
        customerId: selectedCustomer.value?.id,
        startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
        endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
        page: page,
        limit: 30,
      })
    ).then((result) => {
      total.value = result?.total
      usePaymentStore().setPayments(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

onMounted(() => {
  usePaymentStore().clearStore()
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  startDate: '',
  endDate: '',
})

const submitFilterData = () => {
  isLoading.value = true
  PaymentService.getPayments(
    cleanObjectEmptyFields({
      customerId: selectedCustomer.value?.id,
      startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
      endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    usePaymentStore().clearStore()
    usePaymentStore().setPayments(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

const getDataForExcel = (limit) => {
  isLoading.value = true
  PaymentService.getPayments(
    cleanObjectEmptyFields({
      customerId: selectedCustomer.value?.id,
      startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
      endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
      page: 1,
      limit,
    })
  ).then((res) => {
    convertedData(res?.data)
    isLoading.value = false
  })
}

let excelContent = []

const convertedData = (res) => {
  try {
    if (res) {
      excelContent = res.map((record, index) => ({
        idx: index + 1,
        customerFullName: `${record.customer.firstname} ${record.customer.lastname}`,
        phone: record.customer.phone,
        service: record.service.name,
        payedAt: moment(record.payment.createdAt).format('DD/MM/YYYY H:mm'),
        cash: record.payment.price
      }))
    } else {
      excelContent = []
    }

    let settings = {
      fileName: `To'lovlar_hisoboti_${moment().format('DD-MM-YYYY H:mm:ss')}`, // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. 
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    }

    let data = [
      {
        sheet: "To'lovlar hisoboti",
        columns: [
          { label: "№", value: "idx" },
          { label: "Mijoz", value: 'customerFullName' },
          { label: "Telefon raqami", value: 'phone' },
          { label: "Xizmat", value: 'service' },
          { label: "To'lov qilingan sana", value: 'payedAt' },
          { label: "Summa (UZS)", value: 'cash' },
        ],
        content: excelContent,
      }
    ]

    xlsx(data, settings)
  } catch (e) {
    console.log(e);
  }
}

/* Download Excel Report */
const downloadXlsReport = () => {
  getDataForExcel(10000)
}
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">{{ $t('paymentsReport') }}</p>
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center space-x-3">
            <div class="cursor-pointer" @click="downloadXlsReport()">
              <XlsIcon class="w-7 h-7 text-green-500 hover:text-green-600" />
            </div>
            <!-- <div class="cursor-pointer">
              <PdfIcon class="w-7 h-7 text-red-500 hover:text-red-600" />
            </div>
            <div class="cursor-pointer">
              <CsvIcon class="w-7 h-7 text-indigo-500 hover:text-indigo-600" />
            </div> -->
          </div>
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
                <label>{{ $t('customer') }}</label>
                <SelectOptionCustomer />
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
          <div @click="useModalStore().openAddPaymentModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75">
            {{ $t('addPayment') }}
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden payments-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('customer') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('createdAt') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('price') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <PaymentItem :payments="payments" :distance="distance" :target="target" @infinite="loadPayments" />
          </tbody>
        </table>
        <div v-if="payments?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
