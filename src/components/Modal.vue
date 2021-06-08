<template>
  <transition class="modal" name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
        <form class="modal__body">
          <div class="row">
            <div class="input-field">
              <input v-model.trim="name" id="name" type="text" class="validate"
              :class="{invalid: $v.name.$dirty && !$v.name.required}">
              <label for="name">Название </label>
              <small class="invalid--helper"
                    :class="{active: $v.name.$dirty && !$v.name.required}"
                > Введите название
              </small>
            </div>
            <div class="input-field">
              <input v-model.trim="description" id="description" type="text" class="validate">
              <label for="description">Описание</label>
            </div>
            <div class="input-field">
              <input v-model.trim="price" value="0.00" id="price" type="number" class="validate"
                    :class="{invalid: $v.price.$dirty && !$v.price.required}">
              <label class="active" for="price">Цена($)</label>
              <small class="invalid--helper"
                    :class="{active: $v.price.$dirty && (!$v.price.required || !$v.price.minValue)}"
                > Введите цену
              </small>
            </div>
          </div>
          <button type="submit" class="waves-effect waves-light btn" @click.prevent="close">
            Создать
          </button>
          <i @click="closeModal" class="close fas fa-times"></i>
        </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  props: {
    e: {
      type: MouseEvent,
      required: false,
    },
  },
  name: 'Modal',
  data() {
    return {
      name: '',
      description: '',
      price: 0.00,
    };
  },
  validations: {
    name: { required },
    price: { required, minValue: minValue(0.01) },
  },
  methods: {
    ...mapMutations(['closeModal', 'createMark']),
    close() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const props = {
          name: this.name,
          description: this.description,
          price: this.price,
        };
        this.createMark({ event: this.e, props });
        this.closeModal();
      }
    },
  },
};
</script>

<style lang="scss">
.modal {
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    max-width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  &__body {
    margin: 20px 0;
    position: relative;
  }

  &-enter {
    opacity: 0;
  }

  &-leave-active {
    opacity: 0;
  }

  &-enter &__container,
  &-leave-active &__container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
.invalid{
  border-bottom:1px solid red;
  &--helper{
    color: red;
    visibility: hidden;
    display: block;
    text-align: left;
  }
}
.active{
  visibility: visible;
}
.close{
  position: absolute;
  font-size: 42px;
  cursor: pointer;
  top: -30px;
  right: -15px;
  &:hover{
      transition: all .2s ease-out;
      transform: rotate(90deg);
    }
}

</style>
