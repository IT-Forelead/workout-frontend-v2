<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import moment from 'moment'
import { onMounted } from 'vue'
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import Spinners270RingIcon from '../../assets/icons/Spinners270RingIcon.vue'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import SoldProductService from '../../services/soldProduct.service'
import { useDropdownStore } from '../../store/dropdown.store'
import { useModalStore } from '../../store/modal.store'
import { useSoldProductStore } from '../../store/soldProduct.store'
import SelectOptionCustomer from '../Inputs/SelectOptionCustomer.vue'
import SaleItem from '../Items/SaleItem.vue'

const isLoading = ref(false)

const selectedCustomer = computed(() => {
    return useDropdownStore().selectCustomerOption
})

const filterData = reactive({
    customerId: '',
    startDate: '',
    endDate: '',
})

// load sold product
const total = ref(1)
const soldProducts = computed(() => {
    return useSoldProductStore().soldProducts
})
const target = ref('.sales-wrapper')
const distance = ref(0)

let page = 0
const loadSales = async ($state) => {
    page++
    let additional = total.value % 30 === 0 ? 0 : 1
    if (total.value !== 0 && total.value / 30 + additional >= page) {
        SoldProductService.getSales(
            cleanObjectEmptyFields({
                customerId: selectedCustomer.value?.id,
                startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
                endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
                page: page,
                limit: 30,
            })
        ).then((result) => {
            total.value = result?.total
            useSoldProductStore().setSoldProducts(result?.data)
            $state.loaded()
        }).catch(() => {
            $state.error()
        })
    } else $state.loaded()
}

const dropdown = ref(null)

onClickOutside(dropdown, () => {
    if (useModalStore().isOpenFilterBy) {
        useModalStore().toggleFilterBy()
    }
})

const submitFilterData = () => {
    isLoading.value = true
    SoldProductService.getSales(
        cleanObjectEmptyFields({
            customerId: selectedCustomer.value?.id,
            startDate: filterData.startDate ? moment(filterData.startDate).startOf('day').format().slice(0, 16) : '',
            endDate: filterData.endDate ? moment(filterData.endDate).endOf('day').format().slice(0, 16) : '',
            page: 1,
            limit: 30,
        })
    ).then((res) => {
        useSoldProductStore().clearStore()
        useSoldProductStore().setSoldProducts(res?.data)
        isLoading.value = false
        if (useModalStore().isOpenFilterBy) {
            useModalStore().toggleFilterBy()
        }
    })
}

onMounted(() => {
    useSoldProductStore().clearStore()
})
</script>
<template>
    <div class="px-4 py-2 min-h-screen dark:bg-gray-800">
        <div class="bg-white rounded p-5 dark:bg-gray-900">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <router-link to="/sales"
                        class="bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 dark:bg-gray-800 dark:text-gray-300">
                        {{ $t('dailySales') }}
                    </router-link>
                    <div>|</div>
                    <div class="bg-yellow-300 rounded-lg p-1.5 px-3">
                        {{ $t('salesReport') }}
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="relative" ref="dropdown">
                        <div @click="useModalStore().toggleFilterBy()"
                            class="select-none bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700">
                            <FunnelIcon class="w-5 h-5 text-gray-500 dark:text-gray-300" />
                            <span class="dark:text-gray-300">
                                {{ $t('filter') }}
                            </span>
                        </div>
                        <div v-if="useModalStore().isOpenFilterBy"
                            class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3 dark:bg-gray-800 border dark:border-gray-600">
                            <div>
                                <label class="dark:text-white">{{ $t('customer') }}</label>
                                <SelectOptionCustomer />
                            </div>
                            <div>
                                <label class="dark:text-white">{{ $t('createdAt') }}</label>
                                <div class="flex items-center space-x-1">
                                    <div class="relative">
                                        <input type="date" v-model="filterData.startDate"
                                            class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11 dark:bg-gray-900 dark:text-gray-300" />
                                        <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm dark:text-gray-300">{{
                                            $t('from') }}</div>
                                    </div>
                                    <div class="relative">
                                        <input type="date" v-model="filterData.endDate"
                                            class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-14 dark:bg-gray-900 dark:text-gray-300" />
                                        <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm dark:text-gray-300">{{
                                            $t('to') }}</div>
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
                    <div @click="useModalStore().openAddSoldProdoctModal()"
                        class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75 dark:bg-blue-500 dark:hover:bg-blue-600">
                        {{ $t('addSales') }}
                    </div>
                </div>
            </div>
            <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden sales-wrapper">
                <table class="min-w-max w-full table-auto">
                    <thead class="sticky z-10 top-0 bg-white shadow dark:bg-gray-900 dark:shadow-gray-600">
                        <tr class="text-gray-600 capitalize text-lg leading-normal dark:text-white">
                            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                            <th class="py-2 px-4 text-left">{{ $t('customer') }}</th>
                            <th class="py-2 px-4 text-left">{{ $t('product') }}</th>
                            <th class="py-2 px-4 text-left">{{ $t('createdAt') }}</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-sm font-light">
                        <SaleItem :soldProducts="soldProducts" :distance="distance" :target="target"
                            @infinite="loadSales" />
                    </tbody>
                </table>
                <div v-if="soldProducts?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
