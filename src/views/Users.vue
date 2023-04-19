<script setup>
import UserItem from '../components/Items/UserItem.vue'
import authHeader from '../mixins/auth-header'
import { computed, ref, reactive } from '@vue/reactivity'
import { useUserStore } from '../store/user.store'
import { useModalStore } from '../store/modal.store'
import { onMounted } from 'vue'
import UserService from '../services/user.service'
import AxiosService from "../services/axios.service.js";
import { onClickOutside } from '@vueuse/core'
import { cleanObjectEmptyFields } from '../mixins/utils'
import FunnelIcon from '../components/Icons/FunnelIcon.vue'
import Spinners270RingIcon from '../components/Icons/Spinners270RingIcon.vue'

const isLoading = ref(false)

const total = ref(1)
const users = computed(() => {
  return useUserStore().users
})
const target = ref('.users-wrapper')
const distance = ref(0)

let page = 0
const loadUsers = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    AxiosService.post("/user/report", { page: page, limit: 30 }, { headers: authHeader() })
      .then((result) => {
        total.value = result?.total
        useUserStore().setUsers(result?.data)
        $state.loaded()
      }).catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

onMounted(() => {
  useUserStore().clearStore()
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  role: '',
  startDate: '',
  endDate: '',
})

const submitFilterData = () => {
  isLoading.value = true
  UserService.getUsers(
    cleanObjectEmptyFields({
      firstName: filterData.firstName ? `%${filterData.firstName}%` : '',
      lastName: filterData.lastName ? `%${filterData.lastName}%` : '',
      role: filterData.role,
      phone: filterData.phone.replace(/([() -])/g, ''),
    })
  ).then((res) => {
    useUserStore().clearStore()
    useUserStore().setUsers(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}
</script>

<template>
  <div class="px-4 py-2">
    <div class="bg-white rounded capitalize h-[40vh] p-5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-3xl font-bold">User report</p>
        <div class="flex items-center space-x-3">
          <div class="relative" ref="dropdown">
            <div @click="useModalStore().toggleFilterBy()"
              class="border border-gray-200 select-none text-gray-500 bg-gray-50 rounded-lg w-full p-2 px-5 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <FunnelIcon class="w-5 h-5 text-gray-400" />
              <span>
                {{ $t('filter') }}
              </span>
            </div>
            <div v-if="useModalStore().isOpenFilterBy"
              class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
              <div>
                <label for="firstname">{{ $t('firstname') }}</label>
                <input v-model="filterData.firstName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full"
                  type="text" id="firstname" :placeholder="$t('enterFirstname')" />
              </div>
              <div>
                <label for="lastname">{{ $t('lastname') }}</label>
                <input v-model="filterData.lastName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full"
                  type="text" id="lastname" :placeholder="$t('enterLastname')" />
              </div>
              <!-- <div>
                        <label for="phone">{{ $t('phone') }}</label>
                        <input v-model="filterData.phone"
                          class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="phone"
                          :placeholder="$t('enterFirstname')" />
                      </div> -->
              <div>
                <label for="role">{{ $t('role') }}</label>
                <select id="role" v-model="filterData.role"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
                  <option value="" selected>Select role</option>
                  <option value="super_manager">Super manager</option>
                  <option value="admin">Admin</option>
                  <option value="tech_admin">Tech admin</option>
                  <option value="trainer">Trainer</option>
                </select>
              </div>
              <div class="flex items-center space-x-1">
                <label for="">
                  {{ $t('from') }}
                  <input v-model="filterData.startDate" type="datetime-local"
                    class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
                </label>
                <!-- <ArrowDownIcon class="-rotate-90 text-gray-600 mt-6" /> -->
                <label for="">
                  {{ $t('to') }}
                  <input v-model="filterData.endDate" type="datetime-local"
                    class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
                </label>
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
          <div @click="useModalStore().openAddUserModal()"
            class="bg-black text-white text-base rounded-lg p-2 px-4 cursor-pointer hover:bg-black/75">
            add User
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden users-wrapper">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('user') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('role') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <UserItem :users="users" :distance="distance" :target="target" @infinite="loadUsers" />
          </tbody>
        </table>
        <div v-if="users?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
