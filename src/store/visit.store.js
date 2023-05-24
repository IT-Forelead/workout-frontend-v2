import { defineStore } from 'pinia'

export const useVisitStore = defineStore('visit', {
  state: () => ({
    visits: [],
    dailyVisits: [],
    selectedVisit: {},
  }),
  actions: {
    setVisits(data) {
      this.visits.push(...data)
    },
    setDailyVisits(data) {
      this.dailyVisits.push(...data)
    },
    setSelectedVisit(data) {
      this.selectedVisit = data
    },
    setAutoRefreshVisits(data) {
      if (data) {
        data.map((visit) => {
          if (!this.visits.map(v => v?.createdAt).includes(visit?.createdAt)) {
            this.visits.push(visit)
          }
        })
      }
    },
    clearStore() {
      this.visits = []
      this.dailyVisits = []
    },
  },
})
