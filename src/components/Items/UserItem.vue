<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import { parseJwt } from '../../mixins/utils.js'
import { useRouter } from 'vue-router'
import UserIcon from '../Icons/UserIcon.vue'
import TrashIcon from '../Icons/TrashIcon.vue'
import EditIcon from '../Icons/EditIcon.vue'

const router = useRouter()
const payload = ref({})

const props = defineProps({
  users: { type: Array, required: true },
})

const { users } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(user, idx) in users"
    :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center space-x-2">
        <UserIcon class="w-9 h-9 rounded-full border p-1.5" />
        <span class="text-lg font-medium capitalize">
          {{ user?.firstname + ' ' + user?.lastname }}
        </span>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ user?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">{{ user?.role }}</td>
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
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
