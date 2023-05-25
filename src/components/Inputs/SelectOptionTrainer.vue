<script setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDropdownStore } from '../../store/dropdown.store'
import { useI18n } from 'vue-i18n'
import ChevronRightIcon from '../Icons/ChevronRightIcon.vue'
import XIcon from '../Icons/XIcon.vue'
import { useUserStore } from '../../store/user.store'
import userService from '../../services/user.service'
import UserIcon from '../Icons/UserIcon.vue'

const { t } = useI18n()

const props = defineProps({
  userId: null,
})

const selectedOption = computed(() => {
  return useDropdownStore().selectTrainerOption
})
const dropdown = ref(null)

const trainers = computed(() => {
  return useUserStore().users
})

const clearSelectedOptionData = () => {
  useDropdownStore().setSelectTrainerOption('')
}

onClickOutside(dropdown, () => {
  useDropdownStore().closeTrainerDropdown()
})

const optionClicked = (data) => {
  useDropdownStore().setSelectTrainerOption(data)
  useDropdownStore().closeTrainerDropdown()
}

onMounted(() => {
  userService.getUsers({ role: "trainer", page: 1, limit: 1000 }).then((res) => {
    useUserStore().clearStore()
    useUserStore().setUsers(res.data)
    useDropdownStore().setSelectTrainerOption(
      res?.data.filter(u => u?.id === props.userId)[0]
    )
  }).catch(() => {
    console.log("Error while getting trainers");
  })
})
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption"
        class="flex items-center space-x-2 border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2">
        <UserIcon class="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 p-1" />
        <div class="capitalize">
          {{ selectedOption?.firstname + " " + selectedOption?.lastname }}
        </div>
      </div>
      <div @click="useDropdownStore().openTrainerDropdown()" v-else
        class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">
        {{ $t('select') }}
      </div>
      <ChevronRightIcon @click="useDropdownStore().openTrainerDropdown()" v-if="!selectedOption"
        class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <XIcon @click="clearSelectedOptionData()" v-if="selectedOption"
        class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <ul v-if="useDropdownStore().isOpenTrainerDropDown"
        class="absolute w-full bg-white shadow rounded-b-md z-20 top-12 right-0 divide-y divide-gray-200">
        <li v-for="(trainer, idx) in trainers" :key="idx" @click="optionClicked(trainer)"
          class="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer p-2 ">
          <UserIcon class="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 p-1" />
          <div class="capitalize">
            {{ trainer?.firstname + " " + trainer?.lastname }}
          </div>
        </li>
      </ul>
    </label>
  </div>
</template>
