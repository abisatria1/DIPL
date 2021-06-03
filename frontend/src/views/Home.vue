<style lang="scss">
@import "@/scss/variables.scss";
.jumbotron {
  background-color: $primary-color;
  font-weight: 300;
  height: 92vh;

  h1 {
    font-weight: $medium-font-weight;
  }

  button {
    background-color: $secondary-color;
    color: white;
  }
}
</style>

<template>
  <div>
    <CustomNavbar />
    <div class="jumbotron d-flex align-items-center justify-content-center">
      <div class="div">
        <h1 class="display-1 text-center">Tweebz</h1>
        <p class="lead text-center font-weight-bold">
          Your Personal Friend in Doing Campaign
        </p>
        <div class="div text-center mt-2">
          <button type="button" class="btn" @click="toLogin()">
            Start Campaign !
          </button>
        </div>
        <p class="text-center mt-2">
          Want to Create new Campaign ? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CustomNavbar from "../components/navbarComponent.vue"
export default {
  name: "Home",
  components: {
    CustomNavbar,
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "Login" })
    },
    toRegister() {
      this.$router.push({ name: "Register" })
    },
  },
}
</script>
