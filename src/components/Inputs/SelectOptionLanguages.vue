<script setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '../../i18n.js'
import { useDropdownStore } from '../../store/dropdown.store'
import CaretDownIcon from '../../assets/icons/CaretDownIcon.vue'
import GlobeIcon from '../../assets/icons/GlobeIcon.vue'

const { t } = useI18n()
const currentLang = ref('')

const dropdown = ref(null)

const list = [
  {
    id: 'en',
    name: 'English'
  },
  {
    id: 'ru',
    name: 'Русский'
  },
  {
    id: 'uz',
    name: "O'zbekcha"
  },
  {
    id: 'kr',
    name: "Ўзбекча"
  },
]

onClickOutside(dropdown, () => {
  useDropdownStore().closeSelectLanguage()
})

const langTranslate = (lang) => {
  if (lang === 'en') return 'English'
  else if (lang === 'ru') return 'Русский'
  else if (lang === 'uz') return "O'zbekcha"
  else if (lang === 'kr') return "Ўзбекча"
  else return "O'zbekcha"
}

const changeLang = (lang) => {
  currentLang.value = lang.name
  localStorage.setItem('lang', lang.id)
  i18n.global.locale.value = lang.id
  document.getElementsByTagName('title')[0].innerHTML = t('title')
  useDropdownStore().closeSelectLanguage()
}

onMounted(() => {
  currentLang.value = langTranslate(localStorage.getItem('lang'))
  document.getElementsByTagName('title')[0].innerHTML = t('title')
})
</script>
<template>
  <div class="relative w-36" ref="dropdown">
    <div @click="useDropdownStore().openSelectLanguage()"
      class="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800 p-2 cursor-pointer hover:bg-gray-200">
      <GlobeIcon class="w-6 h-6 text-gray-500 dark:text-gray-300" />
      <span class="dark:text-gray-300">{{ currentLang }}</span>
      <CaretDownIcon class="w-4 h-4 dark:text-gray-300" />
    </div>
    <ul v-if="useDropdownStore().isOpenSelectLanguage"
      class="absolute dark:bg-gray-800 w-full bg-white shadow rounded-b-md z-20 top-14 right-0 divide-y divide-gray-200">
      <li v-for="(lang, idx) in list" :key="idx" @click="changeLang(lang)" class="hover:bg-gray-200 dark:hover:bg-gray-900 dark:text-gray-300 cursor-pointer p-2 ">
        {{ lang?.name }}
      </li>
    </ul>
  </div>
</template>
