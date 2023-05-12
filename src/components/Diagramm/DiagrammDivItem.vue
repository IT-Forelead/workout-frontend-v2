<script setup>
defineProps({
    height1: String,
    height2: String,
})

</script>
<template>
    <div class="flex items-end gap-x-3">
        <div class="w-10 rounded-t-lg bg-[#111827]" :class="height1"></div>
        <div class="w-10 rounded-t-lg bg-[#e9d965]" :class="height2"></div>
    </div>
</template>
