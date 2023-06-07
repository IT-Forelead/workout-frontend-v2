import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpenSidebar: true,
    isOpenSubMenuForTariffs: false,
    isOpenSubMenuForServices: false,
    isOpenSubMenuForSales: false
  }),
  actions: {
    toggleSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar
      localStorage.setItem('so', this.isOpenSidebar)
    },
    toggleSubMenuForTariffs() {
      this.isOpenSubMenuForTariffs = !this.isOpenSubMenuForTariffs
    },
    toggleSubMenuForSales(){
      this.isOpenSubMenuForSales = !this.isOpenSubMenuForSales
    },
    toggleSubMenuForServices() {
      this.isOpenSubMenuForServices = !this.isOpenSubMenuForServices
    },
    clearStore() {
      this.isOpenSidebar = true
      this.isOpenSubMenuForTariffs = false
      this.isOpenSubMenuForServices = false
      this.isOpenSubMenuForSales = false
    }
  },
})
