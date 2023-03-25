<template>
  <div class="lang">
    <font-awesome-icon icon="fa-solid fa-globe" />
    <span>En</span>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class ULang extends Vue {

}
</script>

<style scoped>
.lang {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  gap: 5px;
  cursor: pointer;
  max-width: 50px;
  &__item {
    font-weight: 200;
  }
}
</style>