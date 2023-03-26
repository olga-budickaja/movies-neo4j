<template>
  <header class="header">
    <div class="header__container">
      <ULogo />
      <div class="header__desktop">
        <div class="center">
          <UMenu />
        </div>
        <div class="header__right">
          <USearch />
          <ULang />
          <ULogin />
          <UTheme @toggle="toggleTheme" />
        </div>
      </div>
      <button class="header__mobile">
        <button class="header__mobile" @click="handleOpen">
          <font-awesome-icon icon="fa-solid fa-bars" class="header__icon" />
        </button>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ULogo from "@/components/ULogo.vue";
import UMenu from "@/components/UMenu.vue";
import USearch from "@/components/USearch.vue";
import ULang from "@/ULang.vue";
import ULogin from "@/components/ULogin.vue";
import UTheme from "@/components/UTheme.vue";
import {toggleTheme} from "@/utils/change-theme";

@Component({
  methods: {toggleTheme},
  components: {UTheme, ULogin, ULang, USearch, UMenu, ULogo}
})
export default class UHeader extends Vue {
  handleOpen() {
    this.$emit('open')
  }

}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  z-index: 1;
  &__container {
    display: flex;
    gap: 20px;
    padding: 0 20px;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.07);
    justify-content: space-between;
    align-items: center;
  }
  &__desktop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  &__mobile {
    border: none;
    background: transparent;
    cursor: pointer;
    display: none;
  }
  &__icon {
    width: 22px;
    height: 22px;
  }
  &__right {
    display: flex;
    gap: 20px;
  }
}

@media only screen and (max-width: 1024px) {
  .header {
    padding: 0 20px;
    &__desktop {
      display: none;
    }
    &__mobile {
      display: block;
    }
  }
}
</style>