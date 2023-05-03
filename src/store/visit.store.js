import { defineStore } from 'pinia'

export const useVisitStore = defineStore('visit', {
  state: () => ({
    visits: [],
    selectedVisit: {},
  }),
  actions: {
    setVisits(data) {
      this.visits.push(...data)
    },
    setSelectedVisit(data) {
      this.selectedVisit = data
    },
    clearStore() {
      this.visits = []
    },
  },
})
