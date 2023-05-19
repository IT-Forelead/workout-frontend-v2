<script setup>
import { toRefs } from 'vue'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { useI18n } from 'vue-i18n'
import TrashIcon from '../Icons/TrashIcon.vue'
import EditIcon from '../Icons/EditIcon.vue'
import { useServiceStore } from '../../store/service.store'
import { useModalStore } from '../../store/modal.store'

const { t } = useI18n()

const props = defineProps({
  services: { type: Array, required: true },
})

const { services } = toRefs(props)

const serviceTypeTranslate = (type) => {
  switch (type) {
    case 'usual':
      return t('usual')
    case 'for_students':
      return t('forStudents')
    case 'for_kids':
      return t('forKids')
  }
}

const durationDayTranslate = (n) => {
  switch (n) {
    case 1:
      return t('oneDay')
    case 30:
      return t('oneMonth')
    case 90:
      return t('threeMonths')
    case 180:
      return t('sixMonths')
    case 365:
      return t('oneYear')
  }
}

const monthlyVisitTranslate = (n) => {
  switch (n) {
    case 30:
      return t('everyDay')
    case 15:
      return t('fifteenDays')
  }
}

const openEditModal = (service) => {
  useServiceStore().setSelectedService(service)
  useModalStore().openEditServiceModal()
}

const openDeleteModal = (service) => {
  useServiceStore().setSelectedService(service)
  useModalStore().openDeleteServiceModal()
}
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
      <div class="flex item-center justify-center">
        <div @click="openEditModal(service)" class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div @click="openDeleteModal(service)"
          class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
