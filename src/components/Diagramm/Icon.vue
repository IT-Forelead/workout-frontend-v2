<script setup>
import BellIcon from "../Icons/BellIcon.vue";
defineProps({ val: String })
</script>
<template>
    <div class="bg-black flex items-center justify-center rounded-full w-14 h-14">
        <BellIcon class="w-8 h-8" :class="[val ? 'text-black' : 'text-yellow-200 ']" />
    </div>
</template>
