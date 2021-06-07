/* eslint-disable no-plusplus */
import Vue from 'vue';
import Vuex from 'vuex';
import openModal from './openModal';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    marks: [],
    info: {},
    id: 0,
  },
  mutations: {
    fromLocalStorageToState(state) {
      const l = localStorage;
      for (let i = 0; i < l.length; i++) {
        if (Number(l.key(i))) {
          const obj = JSON.parse(localStorage.getItem(l.key(i)));
          const item = {
            id: +l.key(i),
            clientX: obj.clientX,
            clientY: obj.clientY,
            name: obj.name,
            description: obj.description,
            price: obj.price,
          };
          state.marks.push(item);
        }
      }
    },
    createMark(state, { event, props }) {
      const parentEl = document.querySelector('.home');
      const size = {
        width: event.clientX / (parentEl.offsetWidth / 100),
        height: event.clientY / (parentEl.offsetHeight / 100),
      };
      const markItem = {
        clientX: size.width,
        clientY: size.height,
        name: props.name,
        description: props.description,
        price: props.price,
        id: `${event.clientX}${event.clientY}`,
      };
      state.marks.push(markItem);
      localStorage.setItem(markItem.id, JSON.stringify(markItem));
      console.log(props);
      // localStorage.push(markItem);
    },
    markInfo(state, id) {
      const obj = state.marks.find((item) => item.id === id);
      state.info = {
        id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        open: true,
      };
    },
    deleteMark(state, id) {
      state.info.open = false;
      state.marks = state.marks.filter((mark) => mark.id !== id);
      delete localStorage[id];
    },
    closeInfo(state) {
      state.info.open = false;
    },
  },
  getters: {
    getMarks(state) {
      return state.marks;
    },
    getInfo(state) {
      return state.info;
    },
  },
  modules: {
    openModal,
  },
});
