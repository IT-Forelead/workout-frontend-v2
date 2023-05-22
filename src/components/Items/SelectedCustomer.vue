<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { parseJwt } from '../../mixins/utils.js'
import CalendarCheckIcon from '../Icons/CalendarCheckIcon.vue'
import CalendarXIcon from '../Icons/CalendarXIcon.vue'
import UserIcon from '../Icons/UserIcon.vue'

const { t } = useI18n()

const URL = import.meta.env.VITE_CUSTOMER_IMAGE_URL;

const payload = ref({})

const props = defineProps({
    selectedCustomer: { type: Object, required: true },
})

const { selectedCustomer } = toRefs(props)

const navigationGuard = (access) => {
    return access.includes(payload.value?.role)
}

onMounted(() => {
    payload.value = parseJwt()
})

const checkStatus = (endDate) => moment().isBefore(endDate) ? t('active') : t('notActive')

const monthlyVisitTranslate = (n) => {
    switch (n) {
        case 30:
            return t('everyDay')
        case 15:
            return t('fifteenDays')
    }
}
</script>
<template>
    <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium">
        <td v-motion-pop class="py-2 px-4 text-left">
            <div class="flex items-center space-x-2">
                <div v-if="selectedCustomer?.image">
                    <img :src="URL + selectedCustomer.customer?.image" alt="#"
                        class="object-cover w-9 h-9 rounded-full border" />
                </div>
                <div v-else>
                    <UserIcon class="w-9 h-9 rounded-full border p-1.5" />
                </div>
                <div>{{ tariff?.customer?.phone }}</div>
            </div>
        </td>
        <td v-motion-pop class="py-2 px-4 text-left">
            <div class="">
                {{ selectedCustomer?.service?.name }}
            </div>
            <div class="text-sm">
                {{ durationDayTranslate(selectedCustomer?.service?.durationDay) + ' (' +
                    monthlyVisitTranslate(selectedCustomer?.service?.monthlyVisit) + ')' }}
            </div>
        </td>
        <td v-motion-pop class="py-2 px-4 text-left">
            <div class="flex items-center space-x-1">
                <CalendarCheckIcon class="w-5 h-5 text-gray-500" />
                <div>
                    {{ moment(selectedCustomer?.customerTariff?.createdAt).format('DD/MM/YYYY H:mm') }}
                </div>
            </div>
            <div class="flex items-center space-x-1">
                <CalendarXIcon class="w-5 h-5 text-gray-500" />
                <div>
                    {{ moment(selectedCustomer?.customerTariff?.expireAt).format('DD/MM/YYYY H:mm') }}
                </div>
            </div>
        </td>
        <td v-motion-pop class="py-2 px-4 text-left">
            <div class="flex items-center space-x-1">
                <div class="text-sm text-gray-500">
                    {{ $t('total') }}:
                </div>
                <div>
                    {{ useMoneyFormatter(selectedCustomer?.customerTariff?.totalPrice) }}
                </div>
            </div>
            <div class="flex items-center space-x-1">
                <div class="text-sm text-gray-500">
                    {{ $t('paid') }}:
                </div>
                <div>
                    {{ useMoneyFormatter(selectedCustomer?.customerTariff?.pricePaid) }}
                </div>
            </div>
        </td>
        <td v-motion-pop class="py-2 px-4 text-center">
            <span class="p-1.5 px-3 inline-block w-28 text-sm rounded-full"
                :class="statusColor((selectedCustomer?.customerTariff?.expireAt))">{{
                    checkStatus(selectedCustomer?.customerTariff?.expireAt) }}</span>
        </td>
        <td v-motion-pop class="py-2 px-4 text-center">
            <span class="p-1.5 inline-block w-28 px-3 text-sm rounded-full"
                :class="paymentStatusColor(selectedCustomer?.customerTariff?.paymentStatus)">
                {{ paymentStatusTranslate(selectedCustomer?.customerTariff?.paymentStatus) }}
            </span>
        </td>
    </tr>
    <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
        <td v-motion-pop colspan="10">
            <div class="flex items-center justify-center w-full p-2">
                <InfiniteLoading v-bind="$attrs" />
            </div>
        </td>
    </tr>
</template>
