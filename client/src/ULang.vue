<template>
  <div class="lang" @click="changeLanguage">
    <font-awesome-icon icon="fa-solid fa-globe" />
    <span>{{ $i18n.locale }}</span>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component
export default class ULang extends Vue {
  private language: string = 'en';
  private messages: Record<string, any> = {};

  created() {
    this.loadMessages();
  }

  private loadMessages(): void {
    // load messages based on selected language
    if (this.language === 'en') {
      this.messages = require('@/i18n/en.json');
    } else if (this.language === 'uk') {
      this.messages = require('@/i18n/uk.json');
    }
  }

  private changeLanguage(): void {
    // toggle language between en and uk
    this.language = this.language === 'en' ? 'uk' : 'en';
    this.$i18n.locale = this.language;
    this.loadMessages();
  }

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