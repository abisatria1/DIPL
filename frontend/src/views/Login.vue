<template>
<div class="wrapper">
  <div class="mt-4 login-box">
    <div class="login-box-header">
      <h4 class="text-center">Login Form</h4>
    </div>
    <b-form @submit="onSubmit" class="form">
      <b-form-group
        id="input-group-1"
        label="Email"
        label-for="input-1"
      >
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

      <b-button type="submit" variant="primary" class="w-100" v-bind:class = "{ 'd-none' : !isHideSpinner}">Login</b-button>
      <div class="text-center" v-bind:class = "{ 'd-none' : isHideSpinner}">
        <b-spinner type="grow" variant="primary" label="Loading..."></b-spinner>
      </div>
    </b-form>
  </div>
</div>
  
</template>

<script>
import axios from "axios"

export default {
  props : {
    baseUrl : String,
    url : {
      login : String
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      isHideSpinner: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      
      const config = {
        method: "post",
        url: `${this.baseUrl}${this.url.login}`,
        data : this.form,
      }

      axios(config)
        .then(({data}) => {
          const token = data.data.jwtToken
          this.$session.start()
          this.$session.set("jwtToken", token)
          this.isHideSpinner = true
          this.messageHelpers.success("Login Success")
          axios.defaults.headers.common['Authorization'] = token
          this.$router.push("/event")
        })
        .catch((error) => {
          this.isHideSpinner = true
          
          const message = error.response ? error.response.data.message : error.message
          this.messageHelpers.error(message)
          console.log(error.response)
        })
    }
  }
}
</script>
<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 91vh;
  }
  .login-box {
    box-shadow: 0px 0px 2px 1px rgba(58, 58, 58, 0.199);
    border-radius: 4px;
    width: 40%;
    margin: auto !important;
    overflow: hidden;
    background-color: #F2F3F7;
  }
  .login-box-header {
    padding: 4px 0;
  }
  .form{
    padding: 0px 60px 24px 60px;
  }
</style>