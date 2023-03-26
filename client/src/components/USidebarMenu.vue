<template>
  <UIList type="column" :items="links" :sub-items="subLinks" />
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UIList from "@/components/UI/UIList.vue";

@Component({
  components: {UIList}
})
export default class USidebarMenu extends Vue {

  links = [
    {name: 'home', link: '/'},
    {name: 'categories', link: '/categories', sub: 'sub'},
  ];

  subLinks = [
    {name: 'discover', link: '/discover'},
    {name: 'animation', link: '/animation'},
    {name: 'ui', link: '/ui'},
  ];

}
</script>

<style scoped>

</style>