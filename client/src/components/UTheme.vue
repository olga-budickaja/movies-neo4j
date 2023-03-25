<template>
  <UIButton icon="moon"/>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UIButton from "@/components/UI/UIButton.vue";

@Component({
  components: {UIButton}
})
export default class extends Vue {

}
</script>

<style scoped>

</style>