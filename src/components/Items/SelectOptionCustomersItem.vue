<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { ref, toRefs } from 'vue'
import { useDropdownStore } from '../../store/dropdown.store'
import UserIcon from '../Icons/UserIcon.vue'

const props = defineProps({
  customers: { type: Array, required: true },
})

const { customers } = toRefs(props)

const optionClicked = (data) => {
  useDropdownStore().setSelectCustomerOption(data)
  useDropdownStore().closeCustomerDropDown()
}
</script>
<template>
  <li v-for="(customer, idx) in customers" :key="idx" @click="optionClicked(customer)"
    class="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer p-2 ">
    <UserIcon class="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 p-1" />
    <div class="capitalize">
      {{ customer?.firstname + ' ' + customer?.lastname }}
    </div>
  </li>
  <li class="flex items-center justify-center w-full p-2">
    <InfiniteLoading v-bind="$attrs" />
  </li>
</template>
