export default ({
  state: {
    modal: false,
  },
  mutations: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
  },
  getters: {
    getModal(state) {
      return state.modal;
    },
  },
});
