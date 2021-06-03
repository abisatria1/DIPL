<style lang="scss">
@import "@/scss/variables.scss";

.welcome-message {
  .body-message {
    background-color: $primary-color;
    padding: 15px !important;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 30px;
    font-weight: 700;
  }

  h5 {
    font-size: 17px;
    color: #707070;
    font-weight: normal;
  }
}
</style>

<template>
  <div class="welcome-message">
    <div class="container body-message">
      <h1>Hi, {{ nama }} !</h1>
      <h5>There's so many event for you today, let's go participate</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeMessage",
  props: {
    nama: String,
  },
}
</script>
