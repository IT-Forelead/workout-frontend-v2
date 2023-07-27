<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
</script>
<template>
    <section class="flex flex-col justify-center space-y-10">
        <div class="flex justify-center">
            <div class="py-8 rounded-lg w-3/6 space-y-4">
                <div class="text-3xl text-center font-bold text-gray-900">{{ $t('workoutPlatform') }}</div>
                <div class="text-lg text-center text-gray-800">{{ $t('platformDescription') }}</div>
            </div>
        </div>
        <div class="space-y-2">
            <Vue3Marquee :pauseOnHover="true" :duration="200" :gradient="false" :direction="'normal'" class="overflow-hidden">
                <div class="flex ml-2 space-x-2">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-1.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-2.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-3.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-4.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-5.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-6.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-7.webp" alt="#">
                </div>
            </Vue3Marquee>
            <Vue3Marquee :pauseOnHover="true" :duration="250" :gradient="false" :direction="'reverse'" class="overflow-hidden">
                <div class="flex ml-2 space-x-2">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-8.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-9.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-10.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-11.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-12.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-13.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-14.webp" alt="#">
                </div>
            </Vue3Marquee>
            <Vue3Marquee :pauseOnHover="true" :duration="225" :gradient="false" :direction="'normal'" class="overflow-hidden">
                <div class="flex ml-2 space-x-2">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-15.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-16.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-17.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-18.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-19.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-20.webp" alt="#">
                    <img class="rounded-xl h-44 w-auto" src="/images/workout/image-21.webp" alt="#">
                </div>
            </Vue3Marquee>
        </div>
    </section>
</template>
<style scoped></style>