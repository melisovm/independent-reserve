<template>
  <div class="app-sidebar">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.app-sidebar {
  padding: 32px;
  background: #ffffff;
  border-radius: 5px;
  margin: 0 40px 0 0;
  max-width: 25%;
  min-width: 25%;
}
</style>
