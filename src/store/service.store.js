import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [],
    allServices: [],
    selectedService: {},
  }),
  actions: {
    setServices(data) {
      this.services.push(...data)
    },
    setAllServices(data) {
      this.allServices.push(...data)
    },
    setSelectedService(data) {
      this.selectedService = data
    },
    clearStore() {
      this.services = []
    },
  },
})
