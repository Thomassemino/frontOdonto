class ModalStore {
    constructor() {
      this.state = {
        modals: new Map()
      };
    }
  
    registerModal(id, options = {}) {
      this.state.modals.set(id, {
        isOpen: false,
        data: null,
        ...options
      });
    }
  
    openModal(id, data = null) {
      const modal = this.state.modals.get(id);
      if (modal) {
        modal.isOpen = true;
        modal.data = data;
        document.getElementById(id)?.classList.remove('hidden');
      }
    }
  
    closeModal(id) {
      const modal = this.state.modals.get(id);
      if (modal) {
        modal.isOpen = false;
        modal.data = null;
        document.getElementById(id)?.classList.add('hidden');
      }
    }
  }
  
  export const modalStore = new ModalStore();