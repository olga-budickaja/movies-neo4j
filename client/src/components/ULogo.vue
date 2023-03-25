<template>
  <div class="logo">
    <div class="logo__img-container">
      <img src="../assets/logo.png" alt="logo" class="logo__img">
    </div>
    <router-link to="/">
      <div class="logo__title title title_fz18">
        Wow<span class="logo__accent logo__animate title title_fz18">Movies</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class extends Vue {

}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 40px;
  gap: 10px;
  &__title {
    font-weight: 800;
    color: var(--color-grey);
    * {
      font-weight: 800;
    }
  }
  &__img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    object-fit: cover;
  }
  &__desc {
    position: absolute;
    top: 0;
    right: 0;
  }
  &__link {
    display: block;
    height: fit-content;
  }
  &__accent {
    color: var(--color-purple)
  }
  &__animate {
    animation: rotateHue 10s alternate infinite;
  }
}
@keyframes rotateHue {
  to {
    filter: hue-rotate(1turn);
  }
}
</style>