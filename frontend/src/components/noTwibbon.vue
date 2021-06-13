<style lang="scss" scoped>
@import "@/scss/variables.scss";
.container.no-twibbon {
  .no-twibbon-wrapper {
    padding-top: 100px;
    text-align: center;
  }
  img {
    width: 400px;
    height: 300px;
  }
  h1 {
    font-size: 28px;
  }

  .custom-btn {
    @include button($btn-green, 200px); // background-color: $secondary-color;
    padding: 12px !important;
    margin: auto !important;
  }
}
</style>

<template>
  <div class="container no-twibbon">
    <div class="no-twibbon-wrapper">
      <img src="../assets/no-twibbon.svg" alt="no twibbon found" />
      <h1 class="mt-2">You haven't participated in any events</h1>
      <button class="custom-btn" @click="goToHome">
        Explore now
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "no-twibbon",

  methods: {
    goToHome() {
      return this.$router.push({ name: "dashboard-participant" })
    },
  },
}
</script>
