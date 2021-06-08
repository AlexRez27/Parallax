/* eslint-disable no-plusplus */
import Vue from 'vue';
import Vuex from 'vuex';
import openModal from './openModal';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    marks: [],
    info: {},
  },
  mutations: {
    fromLocalStorageToState(state) { // Достаю данные из локального хранилища
      const mark = document.querySelectorAll('.mark');
      for (let i = 0; i < mark.length; i++) {
        mark[i].remove();
      }
      const l = localStorage;
      for (let i = 0; i < l.length; i++) {
        if (Number(l.key(i))) {
          const obj = JSON.parse(localStorage.getItem(l.key(i)));
          const item = {
            id: +l.key(i),
            pageX: obj.pageX,
            pageY: obj.pageY,
            name: obj.name,
            description: obj.description,
            price: obj.price,
          };
          state.marks.push(item);
        }
      }
    },
    createMark(state, { event, props }) { // Ф-я создания точки
      const parentEl = document.querySelector('.home');
      const size = {
        width: event.pageX / (parentEl.offsetWidth / 100),
        height: event.pageY / (parentEl.offsetHeight / 100),
      };
      const id = `${event.pageX}${event.pageY}`;
      const markItem = {
        pageX: size.width,
        pageY: size.height,
        name: props.name,
        description: props.description,
        price: props.price,
        id: +id,
      };
      state.marks.push(markItem);
      localStorage.setItem(+markItem.id, JSON.stringify(markItem));
    },
    markInfo(state, id) { // Ф-я чтоб высветить инофрмацию про точку
      const obj = state.marks.find((item) => item.id === id);
      state.info = {
        id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        open: true,
      };
    },
    deleteMark(state, id) { // Ф-я удаления точки
      state.info.open = false;
      document.getElementById(id).remove();
      delete localStorage[id];
    },
    closeInfo(state) { // Закрыть модальное окно с информацией
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
