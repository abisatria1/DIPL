<style lang="scss">
@import "@/scss/variables.scss";

body {
  background-color: $primary-color;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 91vh;

  h4 {
    font-size: 40px;
    font-weight: $bold-font-weight;
    font-family: $primary-font;
  }

  .login-box {
    padding: 30px 0;
    box-shadow: 52px 52px 74px 0px rgba(115, 131, 169, 0.08);
    border-radius: 10px;
    width: 540px;
    height: 500px;
    margin: auto !important;
    overflow: hidden;
    background-color: white;
  }
  .login-box-header {
    padding: 4px 0;
  }
  .form {
    padding: 0 30px !important;
    label {
      font-weight: $bold-font-weight !important;
      color: $grey-font-color;
    }

    button {
      background-color: $secondary-color;
      padding: 12px !important;
      margin: auto !important;
      border-radius: 10px;
      font-weight: $medium-font-weight;
      margin-top: 20px !important;
      font-size: 16px;
    }

    .form-group {
      margin: 14px 0;
    }

    input.form-control {
      width: 480px;
      padding: 30px 12px !important;
      margin: auto !important;
      color: $grey-font-color;
      box-shadow: 0 3px 5px 1px rgba(201, 201, 201, 0.295);
    }

    .register-here {
      margin-top: 10px !important;
      margin-bottom: 400px !important;
      text-align: center;

      span {
        color: $grey-font-color !important;
        font-weight: $medium-font-weight;
      }

      a {
        color: $green-font-color;
      }
    }
  }
}
</style>

<template>
  <div>
    <CustomNavbar />
    <div class="container">
      <div class="wrapper">
        <div class="mt-4 login-box">
          <div class="login-box-header">
            <h4 class="text-center">Login</h4>
          </div>
          <b-form @submit="onSubmit" class="form">
            <b-form-group id="input-group-1" label="Email" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Password"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.password"
                type="password"
                placeholder="Password"
                required
              ></b-form-input>
            </b-form-group>

            <b-button
              type="submit"
              variant="primary"
              class="w-100"
              v-bind:class="{ 'd-none': !isHideSpinner }"
              >Login</b-button
            >

            <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
              <b-spinner
                type="grow"
                variant="info"
                label="Loading..."
              ></b-spinner>
            </div>
            <div class="register-here">
              <span
                >Dont Have Account ? <a href="/register">Register Here</a></span
              >
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import CustomNavbar from "../components/navbarComponent.vue"
export default {
  components: {
    CustomNavbar,
  },
  props: {
    baseUrl: String,
    url: {
      login: String,
    },
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isHideSpinner: true,
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      this.isHideSpinner = false

      const config = {
        method: "post",
        url: `${this.baseUrl}${this.url.login}`,
        data: this.form,
      }

      try {
        const { data } = await axios(config)
        const token = data.data.jwtToken

        const profile = await this.getProfile(token)
        this.$session.start()
        this.$session.set("jwtToken", token)
        this.$session.set("profile", profile)
        this.isHideSpinner = true
        this.messageHelpers.success("Login Success")
        axios.defaults.headers.common["Authorization"] = token

        if (profile.nama_campaigner) {
          return this.$router.push({ name: "dashboard-campaigner" })
        } else {
          return this.$router.push({ name: "dashboard-participant" })
        }
      } catch (error) {
        this.isHideSpinner = true

        const message = error.response
          ? error.response.data.message
          : error.message
        this.messageHelpers.error(message)
        console.log(error.response)
      }
    },
    async getProfile(jwtToken = "") {
      const config = {
        method: "post",
        url: `${this.baseUrl}${this.url.my}`,
        headers: {
          Authorization: jwtToken,
        },
      }

      const { data } = await axios(config)
      return data.data
    },
  },
}
</script>
