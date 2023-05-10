<script setup>
import BellIcon from "../components/Icons/BellIcon.vue";
</script>

<template>
  <div class="px-10 py-3">
    <div class="grid grid-cols-2 gap-5">
      <div class="bg-white rounded-xl h-[40vh] p-5 flex flex-col">
        <div class="flex justify-between font-bold text-lg">
          <h4>Spending Stats</h4>
          <div class="flex item-center gap-x-10">
            <div class="flex items-center"><span class="rounded-full bg-black mr-1 h-3 w-3 inline-block"></span>Personal
            </div>
            <div class="flex items-center"><span
                class="rounded-full bg-yellow-200 mr-1 h-3 w-3 inline-block"></span>Business</div>
          </div>
        </div>
        <div class="mt-auto">
          <div class="flex justify-between px-10">
            <div class="flex items-end gap-x-2">
              <div class="bg-black h-28 w-10 rounded-t-lg"></div>
              <div class="bg-yellow-200 h-44 w-10 rounded-t-lg"></div>
            </div>
            <div class="flex items-end gap-x-2">
              <div class="bg-black h-14 w-10 rounded-t-lg"></div>
              <div class="bg-yellow-200 h-28 w-10 rounded-t-lg"></div>
            </div>
            <div class="flex items-end gap-x-2">
              <div class="bg-black h-56 w-10 rounded-t-lg"></div>
              <div class="bg-yellow-200 h-44 w-10 rounded-t-lg"></div>
            </div>
            <div class="flex items-end gap-x-2">
              <div class="bg-black h-52 w-10 rounded-t-lg"></div>
              <div class="bg-yellow-200 h-28 w-10 rounded-t-lg"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="bg-white rounded-xl relative h-full p-5 flex flex-col">
          <h4 class="flex items-center gap-x-2 font-bold text-lg">Total Sales
            <BellIcon />
          </h4>
          <div class="mt-auto">
            <h3 class="text-2xl font-bold">73,965</h3>
            <div class="flex mt-2">
              <div class="text-red-500 flex items-center gap-x-2">
                <BellIcon /> 23%
              </div>
              <span class="text-gray-200 ml-2">in this year</span>
            </div>
          </div>
          <div class="absolute bg-black flex items-center justify-center rounded-full w-16 h-16 top-5 right-5">
            <BellIcon class="text-yellow-200 w-10 h-10" />
          </div>
        </div>
        <div class="bg-white rounded-xl relative h-full p-5 flex flex-col">
          <h4 class="flex items-center gap-x-2 font-bold text-lg">Total Sales
            <BellIcon />
          </h4>
          <div class="mt-auto">
            <h3 class="text-2xl font-bold">63,044</h3>
            <div class="flex mt-2">
              <div class="text-green-500 flex items-center gap-x-2">
                <BellIcon /> 23%
              </div>
              <span class="text-gray-200 ml-2">in this year</span>
            </div>
          </div>
          <div class="absolute bg-black flex items-center justify-center rounded-full w-16 h-16 top-5 right-5">
            <BellIcon class="text-yellow-200 w-10 h-10" />
          </div>
        </div>
        <div class="bg-white rounded-xl relative h-full p-5 flex flex-col">
          <h4 class="flex items-center gap-x-2 font-bold text-lg">Total Sales
            <BellIcon />
          </h4>
          <div class="mt-auto">
            <h3 class="text-2xl font-bold">$406.27</h3>
            <div class="flex mt-2">
              <div class="text-green-500 flex items-center gap-x-2">
                <BellIcon /> 23%
              </div>
              <span class="text-gray-200 ml-2">in this year</span>
            </div>
          </div>
          <div class="absolute bg-black flex items-center justify-center rounded-full w-16 h-16 top-5 right-5">
            <BellIcon class="text-yellow-200 w-10 h-10" />
          </div>
        </div>
        <div class="bg-white rounded-xl relative h-full p-5 flex flex-col">
          <h4 class="flex items-center gap-x-2 font-bold text-lg">Total Cost
            <BellIcon />
          </h4>
          <div class="mt-auto">
            <h3 class="text-2xl font-bold">$490.51</h3>
            <div class="flex mt-2">
              <div class="text-red-500 flex items-center gap-x-2">
                <BellIcon /> 31%
              </div>
              <span class="text-gray-200 ml-2">in this year</span>
            </div>
          </div>
          <div class="absolute bg-black flex items-center justify-center rounded-full w-16 h-16 top-5 right-5">
            <BellIcon class="text-yellow-200 w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-5 mt-5">
      <div class="bg-white rounded-xl h-[43vh] p-5 col-span-3">
        <div class="flex justify-between">
          <h4 class="flex items-center gap-x-2 font-bold text-lg">Earning growth
            <BellIcon />
          </h4>
          <div>
            <select class="mr-5">
              <option value="">2022</option>
            </select>
            <select>
              <option value="">Q1</option>
            </select>
          </div>
        </div>
        <div class="border rounded mt-5">
          <div class="flex items-center p-3 border-b">
            <div class="bg-black flex items-center justify-center rounded-full w-16 h-16 top-5 left-5">
              <BellIcon class="text-yellow-200 w-10 h-10" />
            </div>
          </div>
          <div class="p-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid ipsa optio in placeat consequatur blanditiis
            minus, rem est cum? Doloremque minus nam ut excepturi ullam architecto explicabo temporibus eveniet a.
          </div>
        </div>
      </div>


      <div class="grid grid-cols-1 gap-5 grid-rows-4">
        <div class="bg-white rounded-xl capitalize h-full p-5 row-span-3"></div>
        <div class="bg-white rounded-xl capitalize h-full p-5"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
