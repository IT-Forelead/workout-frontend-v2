<script setup>
import { onMounted } from 'vue'
import authHeader from '../../mixins/auth-header'
import AxiosService from '../../services/axios.service'
import { computed, reactive, ref } from '@vue/reactivity'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import { useDropdownStore } from '../../store/dropdown.store'
import SelectedCustomerInfo from './SelectedCustomerInfo.vue'
import { useCustomerTariffStore } from '../../store/customerTariff.store'
import CustomerTariffService from '../../services/customerTariff.service'

let page = 0
const total = ref(1)
const distance = ref(0)
const target = ref('.customer-tariffs-wrapper')

const props = defineProps({ id: String })

const customerTariffs = computed(() => {
  return useCustomerTariffStore().customerTariffs
})

const selectPaymentStatus = computed(() => {
  return useDropdownStore().selectPaymentStatusOption
})

const loadCustomerTariffs = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    AxiosService.post(
      '/tariff/report',
      cleanObjectEmptyFields({
        paymentStatus: selectPaymentStatus.value?.id,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        expireAtFrom: filterData.expireAtFrom,
        expireAtTo: filterData.expireAtTo,
        page: page,
        limit: 30,
      }),
      { headers: authHeader() }
    )
      .then((result) => {
        total.value = result?.total
        useCustomerTariffStore().setCustomerTariffs(result?.data)
        $state.loaded()
      }).catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

onMounted(() => {
  useCustomerTariffStore().clearStore()
})


const filterData = reactive({
  customerId: '',
  serviceId: '',
  paymentStatus: '',
  startDate: '',
  endDate: '',
  expireAtFrom: '',
  expireAtTo: '',
})



const submitFilterData = () => {
  isLoading.value = true
  CustomerTariffService.getCustomerTariffs(
    cleanObjectEmptyFields({
      paymentStatus: selectPaymentStatus.value?.id,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      expireAtFrom: filterData.expireAtFrom,
      expireAtTo: filterData.expireAtTo,
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useCustomerTariffStore().clearStore()
    useCustomerTariffStore().setCustomerTariffs(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}
</script>

<template>
  <div class="px-4 py-2">

    {{ id }}
    <div class="bg-white rounded p-5">
      <div class="overflow-auto customer-tariffs-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead>
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('status') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <SelectedCustomerInfo :customerTariffs="customerTariffs" :distance="distance" :target="target" :id="id"
              @infinite="loadCustomerTariffs" />
          </tbody>
        </table>
        <div v-if="customerTariffs?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
