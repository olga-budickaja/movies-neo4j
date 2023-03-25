<template>
  <div class="search">
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    <input
        placeholder="Search..."
        class="search__input"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class USearch extends Vue {

}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: var(--background-color1);
  border-radius: 20px;
  padding: 0 20px;
  &__input {
    border: none !important;
    height: 30px !important;
    width: 95%;
    background: var(--background-color1);
    &::placeholder {
      font-weight: 100;
      color: #767b88;
      font-style: italic;
    }
  }
}
</style>