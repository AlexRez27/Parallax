<template>
  <div class="home">
    <img @click="newMark($event)" class="home__img" src="../assets/room.jpg" alt="room">
    <Mark v-for="(mark,i) in getMarks"
         :key="i"
         :coords="mark"
         @click.native="markInfo(mark.id)"
      />
    <Modal  :e="e" v-if="getModal" />
    <Info v-if="getInfo.open" />
  </div>
</template>

<script>
import Mark from '@/components/Mark.vue';
import Modal from '@/components/Modal.vue';
import Info from '@/components/Info.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      e: {},
    };
  },
  computed: {
    ...mapGetters(['getMarks', 'getModal', 'getInfo']),
  },
  components: {
    Mark,
    Modal,
    Info,
  },
  methods: {
    ...mapMutations(['createMark', 'openModal', 'fromLocalStorageToState', 'markInfo']),
    newMark(event) {
      // event.stopPropagation();
      if (!this.getModal) {
        this.openModal();
      }
      this.e = event;
    },
  },
  mounted() {
    this.fromLocalStorageToState();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  .home{
    position: relative;
    &__img{
      width: 100%;
      height: auto;
      cursor: pointer;
    }
  }
</style>
