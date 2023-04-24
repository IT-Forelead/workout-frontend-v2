<script setup>
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import { toRefs } from 'vue';

const optionClicked = (data) => {
  useDropdownStore().setSelectCustomerOption(data)
  useDropdownStore().closeCustomerDropDown()
}

const props = defineProps({
  customers: { type: Array, required: true },
})

const { customers } = toRefs(props)
</script>
<template>
  <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" v-for="(customer, idx) in customers" :key="idx"
    @click="optionClicked(customer)">
    {{ customer?.firstname + " " + customer?.lastname }}
  </div>
  <div class="flex items-center justify-center w-full p-2">
    <InfiniteLoading v-bind="$attrs" />
  </div>
</template>
