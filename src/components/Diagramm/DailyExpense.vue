<script setup>
import Icon from './Icon.vue';
import CaretDownIcon from '../Icons/CaretDownIcon.vue';

defineProps({ item: Object })

</script>
<template>
    <div class="flex items-center gap-x-5">
        <Icon class="bg-yellow-200" :val="'text-black'" />
        <div>
            <h4 class="font-bold mb-3">{{ item?.title }}</h4>
            <p class="text-gray-400">{{ item?.total }} Transactions</p>
        </div>
        <CaretDownIcon class="ml-auto cursor-pointer -rotate-90 text-black h-6 w-6" />
    </div>
</template>