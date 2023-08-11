<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import xlsx from 'json-as-xlsx'
import moment from 'moment'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import XlsIcon from '../assets/icons/ExcelIcon.vue'
import FunnelIcon from '../assets/icons/FunnelIcon.vue'
import Spinners270RingIcon from '../assets/icons/Spinners270RingIcon.vue'
import SelectOptionProduct from '../components/Inputs/SelectOptionProduct.vue'
import SelectOptionProductHistoryType from '../components/Inputs/SelectOptionProductHistoryType.vue'
import ProductHistoryItem from '../components/Items/ProductHistoryItem.vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import ProductHistoryService from '../services/productHistory.service'
import { useDropdownStore } from '../store/dropdown.store'
import { useModalStore } from '../store/modal.store'
import { useProductHistoryStore } from '../store/productHistory.store'

const { t } = useI18n()
const isLoading = ref(false)

const selectedProduct = computed(() => {
  return useDropdownStore().selectProductOption
})

const selectedProductHistoryType = computed(() => {
  return useDropdownStore().selectProductHistoryTypeOption
})

// load product histories
const productHistories = computed(() => {
  return useProductHistoryStore().productHistories
})
const total = ref(1)
const target = ref('.product-histories-wrapper')
const distance = ref(0)

let page = 0
const loadProductHistories = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    ProductHistoryService.getProductHistories(
      cleanObjectEmptyFields({
        productId: selectedProduct.value?.id,
        productHistoryType: selectedProductHistoryType.value?.id,
        startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
        endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
        page: page,
        limit: 30,
      })
    ).then((result) => {
      total.value = result?.total
      useProductHistoryStore().setProductHistories(result?.data)
      $state.loaded()
    })
      .catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

onMounted(() => {
  useProductHistoryStore().clearStore()
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

const productTypeTranslate = (type) => {
  switch (type) {
    case 'chocolate_bar':
      return t('coffeeBar')
    case 'water':
      return t('water')
  }
}

const productHistoryTypeTranslate = (type) => {
  switch (type) {
    case 'bought':
      return t('bought')
    case 'sold':
      return t('sold')
  }
}

const submitFilterData = () => {
  isLoading.value = true
  ProductHistoryService.getProductHistories(
    cleanObjectEmptyFields({
      productId: selectedProduct.value?.id,
      productHistoryType: selectedProductHistoryType.value?.id,
      startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
      endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useProductHistoryStore().clearStore()
    useProductHistoryStore().setProductHistories(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

const getDataForExcel = (limit) => {
  isLoading.value = true
  ProductHistoryService.getProductHistories(
    cleanObjectEmptyFields({
      productId: selectedProduct.value?.id,
      productHistoryType: selectedProductHistoryType.value?.id,
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
        productName: record.product.name,
        productType: productTypeTranslate(record.product.productType),
        productCount: record.productHistory.count,
        type: productHistoryTypeTranslate(record.productHistory.productHistoryType),
        createdAt: moment(record.productHistory.createdAt).format('DD/MM/YYYY H:mm'),
      }))
    } else {
      excelContent = []
    }

    let settings = {
      fileName: `Mahsulotlar_tarixi_hisoboti_${moment().format('DD-MM-YYYY H:mm:ss')}`, // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. 
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    }

    let data = [
      {
        sheet: "Mahsulotlar tarixi hisoboti",
        columns: [
          { label: "№", value: "idx" },
          { label: "Mahsulot", value: 'productName' },
          { label: "Mahsulot turi", value: 'productType' },
          { label: "Mahsulot soni", value: 'productCount' },
          { label: "Amal turi", value: 'type' },
          { label: "Sanasi", value: 'createdAt' },
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
  <div class="px-4 py-2 min-h-screen dark:bg-gray-800">
    <div class="bg-white rounded p-5 dark:bg-gray-900">
      <div class="flex items-center justify-between mb-4">
        <p class="text-3xl font-bold dark:text-white">{{ $t('historyProducts') }}</p>
        <div class="flex items-center space-x-3">
          <div class="cursor-pointer" @click="downloadXlsReport()">
            <XlsIcon class="w-7 h-7 text-green-500 hover:text-green-600 dark:text-white" />
          </div>
          <div class="relative" ref="dropdown">
            <div @click="useModalStore().toggleFilterBy()"
              class="select-none bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              <FunnelIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
              <span>
                {{ $t('filter') }}
              </span>
            </div>
            <div v-if="useModalStore().isOpenFilterBy"
              class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3 dark:bg-gray-800 border dark:border-gray-600">
              <div>
                <label class="dark:text-white">{{ $t('product') }}</label>
                <SelectOptionProduct />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('productHistoryType') }}</label>
                <SelectOptionProductHistoryType />
              </div>
              <div>
                <label class="dark:text-white">{{ $t('createdAt') }}</label>
                <div class="flex items-center space-x-1">
                  <div class="relative">
                    <input v-model="filterData.startDate" type="date"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11 dark:bg-gray-900 dark:text-gray-300" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm dark:text-gray-300">{{ $t('from') }}</div>
                  </div>
                  <div class="relative">
                    <input v-model="filterData.endDate" type="date"
                      class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-14 dark:bg-gray-900 dark:text-gray-300" />
                    <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm dark:text-gray-300">{{ $t('to') }}</div>
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
                class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-600">
                <span>{{ $t('filter') }}</span>
              </div>
            </div>
          </div>
          <div @click="useModalStore().openAddProductHistoryModal"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75 dark:bg-blue-500 dark:hover:bg-blue-600">
            {{ $t('addProduct') }}
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden product-histories-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow dark:bg-gray-800">
            <tr class="text-gray-600 capitalize text-lg leading-normal dark:text-white">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('product') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('type') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('createdAt') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('number') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <ProductHistoryItem :productHistories="productHistories" :distance="distance" :target="target"
              @infinite="loadProductHistories" />
          </tbody>
        </table>
        <div v-if="productHistories?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
