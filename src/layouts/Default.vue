<template>
  <div class="layout --default">
    <app-header />

    <main class="content mt-12 mx-24">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { AppHeader } from "../components/ui";
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
}
</style>
