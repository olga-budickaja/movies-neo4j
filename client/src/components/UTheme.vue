<template>
  <UIButton v-if="!change" icon="sun" @click="handleToggle"/>
  <UIButton v-else icon="moon" @click="handleToggle"/>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UIButton from "@/components/UI/UIButton.vue";

@Component({
  components: {UIButton}
})
export default class UTheme extends Vue {

  change = false;

  handleToggle() {
    this.change = !this.change
    this.$emit('toggle')
  }

}
</script>

<style scoped>

</style>