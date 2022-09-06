<template>
  <div class="h-full w-full --default">
    <app-header />

    <main class="h-full">
      <router-view class="mt-12 mx-24" :key="$route.path" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { AppHeader } from "../components/ui";
</script>

