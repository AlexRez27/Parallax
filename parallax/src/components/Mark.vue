<template>
  <div class="mark" :style="{ 'top': coords.clientY + '%', 'left': coords.clientX + '%' }" >
  </div>
</template>

<script>

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
      x: this.coords.clientX,
      y: this.coords.clientY,
    };
  },
};
</script>

<style lang="scss">
@import '../assets/scss/var.scss';
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
