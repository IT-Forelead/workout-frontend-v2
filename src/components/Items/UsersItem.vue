<script setup>
import 'v3-infinite-loading/lib/style.css'
import { toRefs } from 'vue'
import { useModalStore } from '../../store/modal.store'
import { useUserStore } from '../../store/user.store'
import { useI18n } from 'vue-i18n'
import TrashIcon from '../Icons/TrashIcon.vue'
import EditIcon from '../Icons/EditIcon.vue'

const { t } = useI18n()

const props = defineProps({
  users: { type: Array, required: true },
})

const { users } = toRefs(props)

const deleteUser = (selectedUser) => {
  useModalStore().openDeleteAlertModal()
  useUserStore().setSelectedUser(selectedUser)
}
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium py-1" v-for="(user, idx) in users" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left capitalize">
      {{ user?.firstname + ' ' + user?.lastname }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ user?.phone }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">
      {{ user?.role }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
        <div class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
