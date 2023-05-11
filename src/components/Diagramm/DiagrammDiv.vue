<script setup>
import DiagrammDivItem from './DiagrammDivItem.vue';
</script>
<template>
    <div class="flex justify-between mt-auto px-5">
        <DiagrammDivItem :height1="'h-28'" :height2="'h-44'" />
        <DiagrammDivItem :height1="'h-14'" :height2="'h-28'" />
        <DiagrammDivItem :height1="'h-56'" :height2="'h-44'" />
        <DiagrammDivItem :height1="'h-52'" :height2="'h-28'" />
    </div>
</template>
