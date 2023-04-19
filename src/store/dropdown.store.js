import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('drop', {
  state: () => ({
    isOpenSelectLanguage: false,
  }),
  actions: {
    openSelectLanguage() {
      this.isOpenSelectLanguage = true
    },
    closeSelectLanguage() {
      this.isOpenSelectLanguage = false
    },
    clearStore() {
      this.isOpenSelectLanguage = false
    },
  },
})
