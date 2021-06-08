<template>
  <div class="mark" :style="position" :id="coords.id">
  </div>
</template>

<script>
import vars from '../assets/scss/var.scss';

export default {
  props: {
    coords: {
      type: Object,
      required: true,
    },
  },
  name: 'Mark',
  data() {
    return {
      position: {
        top: `calc(${this.coords.pageY}% - ${vars.radius})`,
        left: `calc(${this.coords.pageX}% - ${vars.radius})`,
      },
    };
  },
};
</script>

<style lang="scss">
@import  '../assets/scss/var.scss';
  .mark {
    width: $markSize;
    height: $markSize;
    border-radius: 50%;
    background-color: #CFE2F3;
    border: 2px solid #767C83;
    cursor: pointer;
    position: absolute;
    z-index: 999;
  }
</style>
