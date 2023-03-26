<template>
  <UIList :items="links" :drop-items="linksDrop" />
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UIList from "@/components/UI/UIList.vue";
@Component({
  components: {UIList}
})
export default class UMenu extends Vue {
  links = [
    {name: 'home', link: '/'},
    {name: 'categories', link: '/categories', drop: true},
  ]
  linksDrop = [
      {name: 'discover', link: '/discover'},
      {name: 'animation', link: '/animation'},
      {name: 'ui', link: '/ui'},
  ]
}
</script>

<style scoped>

</style>

