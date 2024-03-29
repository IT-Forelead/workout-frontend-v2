<script setup>
import moment from 'moment'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseJwt } from '../../mixins/utils.js'
import { useModalStore } from '../../store/modal.store'
import { useUserStore } from '../../store/user.store'
import UserIcon from '../../assets/icons/UserIcon.vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'

const { t } = useI18n()

const router = useRouter()
const payload = ref({})

const props = defineProps({
  users: { type: Array, required: true },
})

const { users } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

const roleTranslate = (role) => {
  switch (role) {
    case 'super_manager':
      return t('superManager')
    case 'tech_admin':
      return t('techAdmin')
    case 'admin':
      return t('admin')
    case 'trainer':
      return t('trainer')
  }
}

const openDeleteModal = (user) => {
  useUserStore().setSelectedUser(user)
  useModalStore().openDeleteUserModal()
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-lg font-medium dark:border-gray-600" v-for="(user, idx) in users" :key="idx">
    <td v-motion-pop class="text-center dark:text-gray-300">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      <div class="flex items-center space-x-2 dark:text-gray-300">
        <UserIcon class="w-9 h-9 rounded-full border dark:border-gray-600 p-1.5 dark:text-gray-300" />
        <span class="text-lg font-medium capitalize">
          {{ user?.firstname + ' ' + user?.lastname }}
        </span>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">{{ user?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase dark:text-gray-300">{{ roleTranslate(user?.role) }}</td>
    <td v-motion-pop class="py-2 px-4 text-left dark:text-gray-300">
      {{ moment(user?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <!-- <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div> -->
        <div v-if="!user?.role?.includes('super_manager')" @click="openDeleteModal(user)"
          class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
