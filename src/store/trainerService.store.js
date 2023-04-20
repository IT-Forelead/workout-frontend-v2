import { defineStore } from 'pinia'

export const useTrainerServiceStore = defineStore('trainerService', {
  state: () => ({
    trainerServices: [],
    selectedTrainerService: {},
  }),
  actions: {
    setTrainerServices(data) {
      this.trainerServices.push(...data)
    },
    setSelectedTrainerService(data) {
      this.selectedTrainerService = data
    },
    clearStore() {
      this.trainerServices = []
    },
  },
})
