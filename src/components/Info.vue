<template>
  <transition class="modal" name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__body info">
            <ul class="collection info__list">
              <li class="collection-item info__item"><b>Название: </b>{{getInfo.name}} </li>
              <li class="collection-item info__item"><b>Описание: </b>{{getInfo.description}}</li>
              <li class="collection-item info__item"><b>Цена: </b>{{getInfo.price}}$</li>
              <li class="collection-item link">
                <router-link
                :to="{ name: 'LearnMore', params: {name: getInfo.name} }"
                > Learn more... </router-link>
              </li>
            </ul>
            <button @click="deleteMark(getInfo.id)"
                    class="waves-effect waves-light btn info__btn">Удалить</button>
            <i @click="closeInfo" class="close close--info fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Info',
  computed: {
    ...mapGetters(['getInfo']),
  },
  methods: {
    ...mapMutations(['deleteMark', 'closeInfo', ' fromLocalStorageToState']),
  },
};
</script>

<style lang="scss">
.info{
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  &__list{
    border: 1px solid #cecece;
  }
  & &__item{
    border-bottom: 1px solid #cecece;
  }
  &__btn{
    background-color: red;
    &:hover{
      background-color: darken(red, 20%);
    }
  }
}
.close--info{
  top: -35px;
  right: -21px;
}
.link{
  text-align: center;
}
</style>
