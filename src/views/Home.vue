<script setup>
import { ref } from 'vue';
import Card from "../components/Diagramm/Card.vue";
import Earning from "../components/Diagramm/Earning.vue";
import DiagrammDiv from "../components/Diagramm/DiagrammDiv.vue";
import Title from "../components/Diagramm/Title.vue";
import Select from "../components/Diagramm/Select.vue";
import Icon from "../components/Diagramm/Icon.vue";
import DailyExpense from "../components/Diagramm/DailyExpense.vue";

const data = ref([
  { title: "Title Sales", total: "73,965", percentage: "23%", percentageColor: "text-red-500" },
  { title: "Title Leads", total: "63,044", percentage: "44%", percentageColor: "text-green-500" },
  { title: "Title Profit", total: "$406.27", percentage: "15%", percentageColor: "text-red-500" },
  { title: "Title Cost", total: "$490.51", percentage: "31%", percentageColor: "text-green-500" }
])
const earningData = ref([
  { time: "Week", total: "$490.51", width: "w-1/2" },
  { time: "Month", total: "$490.51", width: "w-3/5" },
  { time: "Year", total: "$490.51", width: "w-1/5" }
])
const dailyData = ref([
  { title: "Grocery bills", total: 17 },
  { title: "Banking", total: 12 },
  { title: "Insurance", total: 26 }
])

</script>

<template>
  <div class="px-10 py-3">
    <div class="grid grid-cols-2 gap-5">
      <div class="bg-white rounded-xl p-5 flex flex-col h-[40vh]">
        <div class="flex justify-between font-bold text-lg">
          <h4>Spending Stats</h4>
          <div class="flex item-center gap-x-10">
            <div class="flex items-center"><span class="rounded-full bg-[#111827] mr-1 h-3 w-3 inline-block"></span>Personal
            </div>
            <div class="flex items-center"><span
                class="rounded-full bg-yellow-200 mr-1 h-3 w-3 inline-block"></span>Business</div>
          </div>
        </div>
        <DiagrammDiv />
      </div>
      <div class="grid grid-cols-2 gap-5">
        <Card v-for="(item, idx) in data" :key="idx" :item="item" />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-5 mt-5">
      <div class="bg-white rounded-xl h-[53vh] p-5 col-span-3">
        <div class="flex justify-between">
          <Title :title="'Earning Growth'" />
          <div>
            <Select class="mr-5" />
            <Select />
          </div>
        </div>
        <div class="border rounded mt-5">
          <div class="flex justify-between items-center py-3 px-10 border-b">
            <Icon />
            <div>
              <h4 class="font-bold">Income top Total last Week</h4>
              <h3 class="font-bold text-3xl mt-3">$396.84 <span class="text-gray-400 text-sm">Total</span></h3>
            </div>
            <Earning v-for="(element, idx) in earningData" :item="element" :key="idx" />
          </div>
          <div class="p-3 bg-[url('/images/diagramm2.jpg')] h-[31vh] bg-cover bg-center bg-no-repeat"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-5">
        <div class="bg-white rounded-xl p-5 h-full row-span-3 space-y-4">
          <Title :title="'Daily Expense'" />
          <DailyExpense v-for="item in dailyData" :key="item" :item="item" />
        </div>
        <div class="bg-[#111827] rounded-xl p-5 right-10 bottom-1 text-white">
          <h3 class="text-2xl font-bold">Become a Pro</h3>
          <div class="flex mt-10">
            <div>
              <span><b class="mr-3">$</b></span><span class="font-bold text-2xl">6.85</span><span
                class="text-gray-500">/month</span>
            </div>
            <button
              class="ml-auto bg-[#e9d965] text-black py-3 px-5 font-bold text-lg cursor-pointer duration-300 hover:bg-white hover:text-yellow-500 rounded-full">Try
              Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
