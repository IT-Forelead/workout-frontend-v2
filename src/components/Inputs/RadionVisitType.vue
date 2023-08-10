<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDropdownStore } from '../../store/dropdown.store'
import CheckIcon from '../../assets/icons/CheckIcon.vue'

const { t } = useI18n()

const list = [
  {
    id: 'come_in',
    name: t('comeIn')
  },
  {
    id: 'go_out',
    name: t('goOut')
  },
]

const optionClicked = (data) => {
  useDropdownStore().setSelectVisitTypeOption(data)
}

onMounted(() => {
  useDropdownStore().setSelectVisitTypeOption(list[0])
})
</script>
<template>
  <div class="select-none">
    <div
      class="flex items-center justify-around border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg dark:bg-gray-900 dark:text-gray-300">
      <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked />
      <label for="toggle-on" @click="optionClicked(list[0])"
        class="relative flex items-center justify-center space-x-3 py-2">
        <span class="hidden">
          <CheckIcon class="w-6 h-6 text-green-500" />
        </span>
        <span>{{ $t('comeIn') }}</span>
      </label>
      <input id="toggle-off" @click="optionClicked(list[1])" class="toggle toggle-right" name="toggle" value="true"
        type="radio" />
      <label for="toggle-off" class="relative flex items-center justify-center space-x-3 py-2">
        <span class="hidden">
          <CheckIcon class="w-6 h-6 text-green-500" />
        </span>
        <span>{{ $t('goOut') }}</span>
      </label>
    </div>
  </div>
</template>
<style scoped>
input[type='radio'].toggle {
  @apply hidden;
}

input[type='radio'].toggle+label {
  @apply cursor-pointer;
  @apply w-1/2;
}

input[type='radio'].toggle.toggle-left+label {
  @apply border-r-0;
}

input[type='radio'].toggle.toggle-left+label:after {
  @apply left-full;
}

input[type='radio'].toggle.toggle-right+label {
  @apply -ml-1;
}

input[type='radio'].toggle.toggle-right+label:after {
  @apply -left-full;
}

input[type='radio'].toggle:checked+label {
  @apply cursor-default;
  @apply text-blue-500;
  @apply bg-white;
  @apply border-4;
  @apply border-gray-100;
  @apply rounded-lg;
  @apply dark:bg-gray-800;
  @apply dark:text-gray-300;
  @apply dark:border-gray-600;
}

input[type='radio'].toggle:checked+label>span {
  @apply inline-block;
}

input[type='radio'].toggle:checked+label:after {
  @apply left-0;
}
</style>
