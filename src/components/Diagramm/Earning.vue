<script setup>
defineProps({ item: Object })
</script>
<template>
    <div class="font-bold text-center">
        <h4>Earning per {{ item?.time }}</h4>
        <h3 class="text-xl mb-3">{{ item?.total }}</h3>
        <div class="h-3 rounded-full border">
            <span class="h-3 block rounded-full bg-black" :class="item?.width"></span>
        </div>
    </div>
</template>