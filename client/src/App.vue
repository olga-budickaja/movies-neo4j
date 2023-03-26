<template>
  <div id="app">
    <div class="container">
      <UHeader @open="toggleMenu"/>
      <USidebar :open-sidebar="isOpenMenu" />
      <div :class="['content', {content_full: !isOpenMenu}]">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UHeader from '@/components/layout/UHeader.vue';
import USidebar from "@/components/layout/USidebar.vue";

@Component({
  components: {USidebar, UHeader}
})
export default class App extends Vue {
  isOpenMenu = false;

  toggleMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

}
</script>

<style lang="scss" scoped>
.content {
  margin-left: 250px !important;
  padding: 67px 37px 40px;
  transition: 0.5s;
  &_full {
    margin-left: 0 !important;
  }
}
</style>

