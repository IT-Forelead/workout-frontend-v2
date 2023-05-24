<script setup>
import { onMounted } from 'vue'
import authHeader from '../mixins/auth-header'
import AxiosService from '../services/axios.service'
import { cleanObjectEmptyFields } from '../mixins/utils'
import { computed, reactive, ref } from '@vue/reactivity'
import { useDropdownStore } from '../store/dropdown.store'
import { useCustomerTariffStore } from '../store/customerTariff.store'
import SelectedUserItem from '../components/Items/SelectedCustomertem.vue'

const props = defineProps({ id: String })

const total = ref(1)
const customerTariffs = computed(() => {
    return useCustomerTariffStore().customerTariffs
})
const target = ref('.customer-tariffs-wrapper')
const distance = ref(0)

const selectPaymentStatus = computed(() => {
    return useDropdownStore().selectPaymentStatusOption
})

let page = 0
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

</script>

<template>
    <div class="px-4 py-2">
        <div class="bg-white rounded p-5">
            <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden customer-tariffs-wrapper">
                <table class="min-w-max w-full table-auto">
                    <thead class="sticky z-10 top-0 bg-white shadow">
                        <tr class="text-gray-600 capitalize text-lg leading-normal">
                            <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
                            <th class="py-2 px-4 text-left">{{ $t('duration') }}</th>
                            <th class="py-2 px-4 text-center">{{ $t('status') }}</th>
                            <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm font-light">
                        <SelectedUserItem :id="id" :customerTariffs="customerTariffs" :distance="distance" :target="target"
                            @infinite="loadCustomerTariffs" />
                    </tbody>
                </table>
                <div v-if="customerTariffs?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
            </div>
        </div>
    </div>
</template>
