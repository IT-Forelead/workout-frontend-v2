import { defineStore } from 'pinia'

export const useTrainerServiceStore = defineStore('trainerService', {
  state: () => ({
    trainerServices: [],
    trainerServicesByUserId: [],
    selectedTrainerService: {},
  }),
  actions: {
    setTrainerServices(data) {
      this.trainerServices.push(...data)
    },
    setTrainerServicesByUserId(data) {
      this.trainerServicesByUserId.push(...data)
    },
    setSelectedTrainerService(data) {
      this.selectedTrainerService = data
    },
    clearStore() {
      this.trainerServices = []
      this.trainerServicesByUserId = []
    },
  },
})
