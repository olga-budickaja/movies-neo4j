<template>
  <div id="app">
    <UHeader/>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-left: 250px;
  padding: 67px 37px 40px;
  transition: 0.5s;
  &_full {
    margin-left: 0;
  }
}
</style>
<script setup lang="ts">

import UHeader from "@/components/layout/UHeader.vue";
</script>