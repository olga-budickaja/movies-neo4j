<template>
  <div class="login">
    <UIButton class="login__animate" :label="$t('right-menu.login')" color="blue" outlined="outlined" rounded="rounded"/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UIButton from "@/components/UI/UIButton.vue";

@Component({
  components: {UIButton}
})
export default class ULogin extends Vue {

}
</script>

<style scoped>
.login {
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