<script setup>
import Icon from './Icon.vue';
import Title from './Title.vue'

defineProps({ item: Object })
</script>
<template>
    <div class="bg-white rounded-xl relative h-full p-5 flex flex-col">
        <Title :title="item?.title" />
        <div class="mt-auto">
            <h3 class="text-3xl font-bold">{{ item?.total }}</h3>
            <div class="flex mt-2">
                <div class="flex items-center gap-x-2" :class="item?.percentageColor">
                    <BellIcon /> {{ item?.percentage }}
                </div>
                <span class="text-gray-400 ml-2">in this year</span>
            </div>
        </div>
        <Icon class="absolute top-5 right-5" />
    </div>
</template>
