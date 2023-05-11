<script setup>

import BellIcon from "../Icons/BellIcon.vue";

defineProps({
    title: String,
})

</script>
<template>
    <h4 class="flex items-center gap-x-2 font-bold text-lg"> {{ title }}
        <BellIcon class="text-gray-400" />
    </h4>
</template>
