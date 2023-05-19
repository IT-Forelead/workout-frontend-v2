import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isAddUserModalOpen: false,
    isDeleteUserModalOpen: false,
    isAddCustomerModalOpen: false,
    isEditCustomerModalOpen: false,
    isDeleteCustomerModalOpen: false,
    isAddServiceModalOpen: false,
    isDeleteServiceModalOpen: false,
    isAddTrainerServiceModalOpen: false,
    isDeleteTrainerServiceModalOpen: false,
    isAddCustomerTariffModalOpen: false,
    isAddCustomerTrainerTariffModalOpen: false,
    isAddVisitModalOpen: false,
    isAddQrCodeModalOpen: false,
    isAddPaymentModalOpen: false,
    isOpenFilterBy: false,
    isOpenNotification: false,
    isOpenProfileDropDown: false,
  }),
  actions: {
    openAddUserModal() {
      this.isAddUserModalOpen = true
    },
    closeAddUserModal() {
      this.isAddUserModalOpen = false
    },
    openDeleteUserModal() {
      this.isDeleteUserModalOpen = true
    },
    closeDeleteUserModal() {
      this.isDeleteUserModalOpen = false
    },
    openAddCustomerModal() {
      this.isAddCustomerModalOpen = true
    },
    closeAddCustomerModal() {
      this.isAddCustomerModalOpen = false
    },
    openEditCustomerModal() {
      this.isEditCustomerModalOpen = true
    },
    closeEditCustomerModal() {
      this.isEditCustomerModalOpen = false
    },
    openDeleteCustomerModal() {
      this.isDeleteCustomerModalOpen = true
    },
    closeDeleteCustomerModal() {
      this.isDeleteCustomerModalOpen = false
    },
    openAddServiceModal() {
      this.isAddServiceModalOpen = true
    },
    closeAddServiceModal() {
      this.isAddServiceModalOpen = false
    },
    openDeleteServiceModal() {
      this.isDeleteServiceModalOpen = true
    },
    closeDeleteServiceModal() {
      this.isDeleteServiceModalOpen = false
    },
    openAddTrainerServiceModal() {
      this.isAddTrainerServiceModalOpen = true
    },
    closeAddTrainerServiceModal() {
      this.isAddTrainerServiceModalOpen = false
    },
    openDeleteTrainerServiceModal() {
      this.isDeleteTrainerServiceModalOpen = true
    },
    closeDeleteTrainerServiceModal() {
      this.isDeleteTrainerServiceModalOpen = false
    },
    openAddCustomerTariffModal() {
      this.isAddCustomerTariffModalOpen = true
    },
    closeAddCustomerTariffModal() {
      this.isAddCustomerTariffModalOpen = false
    },
    openAddCustomerTrainerTariffModal() {
      this.isAddCustomerTrainerTariffModalOpen = true
    },
    closeAddCustomerTrainerTariffModal() {
      this.isAddCustomerTrainerTariffModalOpen = false
    },
    openAddVisitModal() {
      this.isAddVisitModalOpen = true
    },
    closeAddVisitModal() {
      this.isAddVisitModalOpen = false
    },
    openAddQrCodeModal() {
      this.isAddQrCodeModalOpen = true
    },
    closeAddQrCodeModal() {
      this.isAddQrCodeModalOpen = false
    },
    openAddPaymentModal() {
      this.isAddPaymentModalOpen = true
    },
    closeAddPaymentModal() {
      this.isAddPaymentModalOpen = false
    },
    toggleFilterBy() {
      this.isOpenFilterBy = !this.isOpenFilterBy
    },
    toggleNotification() {
      this.isOpenNotification = !this.isOpenNotification
    },
    toggleProfile() {
      this.isOpenProfileDropDown = !this.isOpenProfileDropDown
    },
  },
})
