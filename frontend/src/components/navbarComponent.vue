<style lang="scss">
.container-fluid {
  margin: 0;
  padding: 0;
}
.navbar {
  background-color: white !important;
  font-weight: 400;
  font-size: 16px;
  padding: 20px !important;
}
.custom-btn {
  background-color: #1baaa0;
  color: white;
  border-radius: 7px;
  width: 100px;
}

.custom-btn:hover {
  background-color: transparent;
  color: #1baaa0;
  border: 1px solid #1baaa0;
}
.custom-btn1 {
  background-color: transparent;
  color: #1baaa0;
  border-radius: 7px;
  width: 100px;
  border: 1px solid #1baaa0;
}

.custom-btn1:hover {
  background-color: #1baaa0;
  color: white;
}
.navbar-brand {
  font-size: 25px;
  font-weight: bold;
}
.pe-custom {
  padding: 0 32px !important;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">Tweebz</a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav m-auto mt-2 mt-lg-0">
          <li class="nav-item active pe-custom">
            <a class="nav-link" href="/"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item pe-custom">
            <a class="nav-link" href="#">Feature</a>
          </li>
          <li class="nav-item pe-custom">
            <a class="nav-link" href="#">About Us</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button type="button" class="btn custom-btn mr-1" @click="toLogin()">
            Login
          </button>
          <button type="button" class="btn custom-btn1" @click="toRegister()">
            Register
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "custom-navbar",
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
