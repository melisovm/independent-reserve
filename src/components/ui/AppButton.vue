<template>
  <button v-bind="$attrs" type="button" class="py-5 px-14 border border-primary text-center font-medium rounded-button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.rounded-button {
  border-radius: 78px;
}
</style>
