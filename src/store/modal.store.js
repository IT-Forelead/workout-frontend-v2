import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isAddUserModalOpen: false,
    isDeleteUserModalOpen: false,
    isAddCustomerModalOpen: false,
    isEditCustomerModalOpen: false,
    isDeleteCustomerModalOpen: false,
    isAddServiceModalOpen: false,
    isEditServiceModalOpen: false,
    isDeleteServiceModalOpen: false,
    isAddTrainerServiceModalOpen: false,
    isEditTrainerServiceModalOpen: false,
    isDeleteTrainerServiceModalOpen: false,
    isAddCustomerTariffModalOpen: false,
    isAddCustomerTrainerTariffModalOpen: false,
    isAddVisitModalOpen: false,
    isAddFakeVisitModalOpen: false,
    isAddQrCodeModalOpen: false,
    isAddPaymentModalOpen: false,
    isAddTariffWithPaymentModalOpen:false,
    isAddSoldProdoctModalOpen: false,
    isOpenFilterBy: false,
    isOpenNotification: false,
    isOpenProfileDropDown: false,
    isAddProductModalOpen: false
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
    openEditServiceModal() {
      this.isEditServiceModalOpen = true
    },
    closeEditServiceModal() {
      this.isEditServiceModalOpen = false
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
    openEditTrainerServiceModal() {
      this.isEditTrainerServiceModalOpen = true
    },
    closeEditTrainerServiceModal() {
      this.isEditTrainerServiceModalOpen = false
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
    openAddProductModal() {
    this.isAddProductModalOpen = true
    },
    closeAddProductModal() {
    this.isAddProductModalOpen = false
    },
    openAddFakeVisitModal() {
      this.isAddFakeVisitModalOpen = true
    },
    closeAddFakeVisitModal() {
      this.isAddFakeVisitModalOpen = false
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
    openAddTariffWithPaymentModal() {
      this.isAddTariffWithPaymentModalOpen = true
    },
    closeAddTariffWithPaymentModal() {
      this.isAddTariffWithPaymentModalOpen = false
    },
    openAddSoldProdoctModal() {
      this.isAddSoldProdoctModalOpen = true
    },
    closeAddSoldProdoctModal() {
      this.isAddSoldProdoctModalOpen = false
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
