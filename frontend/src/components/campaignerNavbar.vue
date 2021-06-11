<style lang="scss">
@import "@/scss/variables.scss";
.container-fluid {
  margin: 0;
  padding: 0;
}
#campaigner-navbar {
  background-color: white !important;
  font-weight: 400;
  font-size: 16px;
  padding: 12px !important;

  .navbar-nav {
    // border: 1px solid black;
    li {
      // border: 1px solid black;
      padding: 12px !important;
      line-height: 0 !important;
      margin: 12px !important;
    }
  }

  .custom-btn {
    background-color: $secondary-color;
    color: white;
    width: 100px !important;
  }

  .custom-btn:hover {
    background-color: transparent;
    color: $secondary-color;
    border: 1px solid $secondary-color;
  }
  .custom-btn1 {
    background-color: transparent;
    color: $secondary-color;
    width: 100% !important;
    border: 1px solid $secondary-color;
  }

  .custom-btn1:hover {
    background-color: $secondary-color;
    color: white;
  }
  .navbar-brand {
    font-size: 25px;
    font-weight: bold;
  }
  .pe-custom {
    padding: 0 32px !important;
  }

  #dropdown-1 {
    button.dropdown-toggle {
      background-color: $secondary-color;
      color: white;
      width: 100px;
      border: none;
    }

    li a:active {
      background-color: transparent;
      color: inherit;
    }
  }
}
</style>

<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="campaigner-navbar">
    <div class="container">
      <a class="navbar-brand" href="/">Tweebz</a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav m-auto mt-2 mt-lg-0">
          <li class="nav-item active pe-custom">
            <a class="nav-link" href="/campaigner"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item pe-custom">
            <a class="nav-link" href="/event/add">Create Campaign</a>
          </li>
        </ul>

        <div class="right">
          <b-dropdown id="dropdown-1" text="Settings" class="m-md-2">
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>Account</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              ><button type="button" class="btn custom-btn1" @click="logOut()">
                Logout
              </button></b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "campaigner-navbar",
  methods: {
    logOut() {
      this.$session.destroy()
      this.$router.push("/login")
    },
  },
}
</script>
