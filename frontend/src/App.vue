<style lang="scss">
@import "@/scss/variables.scss";

* {
  font-family: $primary-font;
  color: $black-font-color;
}
</style>

<template>
  <div id="app" class="container-fluid">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
}
</script>
