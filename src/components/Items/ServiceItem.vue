<script setup>
import { toRefs } from 'vue'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { serviceTypeTranslate, durationDayTranslate, monthlyVisitTranslate } from '../../mixins/serviceUtils.js'
import TrashIcon from '../Icons/TrashIcon.vue'
import EditIcon from '../Icons/EditIcon.vue'

const props = defineProps({
  services: { type: Array, required: true },
})

const { services } = toRefs(props)
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(service, idx) in services"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ service?.name }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ serviceTypeTranslate(service?.serviceType) }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ durationDayTranslate(service?.durationDay) + ' (' + monthlyVisitTranslate(service?.monthlyVisit) + ')' }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ useMoneyFormatter(service?.priceForMale) }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ useMoneyFormatter(service?.priceForFemale) }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <!-- <div class="flex item-center justify-center">
        <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div> -->
    </td>
  </tr>
</template>
