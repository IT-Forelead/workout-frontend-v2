import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [],
    selectedService: {},
  }),
  actions: {
    setServices(data) {
      this.services.push(...data)
    },
    setSelectedService(data) {
      this.selectedService = data
    },
    clearStore() {
      this.services = []
    },
  },
})
