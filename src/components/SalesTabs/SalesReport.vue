<script setup>
import { ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import FunnelIcon from '../../components/Icons/FunnelIcon.vue'
import Spinners270RingIcon from '../../components/Icons/Spinners270RingIcon.vue'
import { useModalStore } from '../../store/modal.store'
import SelectOptionCustomer from '../Inputs/SelectOptionCustomer.vue'

const isLoading = ref(false)
const dropdown = ref(null)

onClickOutside(dropdown, () => {
    if (useModalStore().isOpenFilterBy) {
        useModalStore().toggleFilterBy()
    }
})

</script>

<template>
    <div class="px-4 py-2">
        <div class="bg-white rounded p-5">
            <div class="flex items-center justify-between mb-1">
                <div class="flex items-center space-x-3">
                    <router-link to="/sales"
                        class="bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3">
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
                                        <input type="date"
                                            class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-11" />
                                        <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">{{
                                            $t('from') }}</div>
                                    </div>
                                    <div class="relative">
                                        <input type="date"
                                            class="w-60 rounded-lg border-none bg-gray-100 text-gray-500 pr-14" />
                                        <div class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-2 text-sm">{{
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
                                class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
                                <span>{{ $t('filter') }}</span>
                            </div>
                        </div>
                    </div>
                    <div @click="useModalStore().openAddSoldProdoctModal()"
                        class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75">
                        {{ $t('addSales') }}
                    </div>
                </div>
            </div>
            <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden users-wrapper">
                <table class="min-w-max w-full table-auto">
                    <thead class="sticky z-10 top-0 bg-white shadow">
                        <tr class="text-gray-600 capitalize text-lg leading-normal">
                            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                            <th class="py-2 px-4 text-left">{{ $t('customer') }}</th>
                            <th class="py-2 px-4 text-left">{{ $t('product') }}</th>
                            <th class="py-2 px-4 text-left">{{ $t('createdAt') }}</th>
                            <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
                        </tr>
                    </thead>
                    <!-- <tbody class="text-gray-600 text-sm font-light">
                        <UserItem :users="users" :distance="distance" :target="target" @infinite="loadUsers" />
                    </tbody> -->
                </table>
                <!-- <div v-if="users?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div> -->
            </div>
        </div>
    </div>
</template>
<style scoped></style>
