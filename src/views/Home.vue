<template>
  <div class="main p-7">
    <wallet-table />
  </div>
</template>

<script setup lang="ts">
import { WalletTable } from '../components/index.js';
</script>

<style scoped lang="scss">
.main {
  background: #ffffff;
  border-radius: 5px;
}
</style>
