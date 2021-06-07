<template>
  <div class="about">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{getInfo.name}}</h4></li>
      <li class="collection-item">{{getInfo.description}}</li>
      <li class="collection-item">{{getInfo.price}}$</li>
      <img src="https://via.placeholder.com/150" alt="photo">
    </ul>
    <router-link :to="'/'" >Назад</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LearnMore',
  computed: {
    ...mapGetters(['getInfo']),
  },
};
</script>
