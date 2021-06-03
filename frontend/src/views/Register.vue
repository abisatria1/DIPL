<style lang="scss">
@import "@/scss/variables.scss";

body {
  color: #14234b;
  margin-bottom: 200px;
}

h4 {
  font-size: 24px;
  font-weight: bold;
  padding: 20px 0;
  text-transform: uppercase;
}

.box {
  box-shadow: 52px 52px 74px 0px rgba(115, 131, 169, 0.08);
  border-radius: 4px;
  width: 60%;
  margin: auto;
  overflow: hidden;
  background-color: white;
}

.box-header {
  padding: 4px 0;
}

.form {
  padding: 0px 60px 24px 60px;
  font-size: 17px !important;
}

a.nav-link {
  font-size: 17px !important;
  color: $green-font-color;
}

b-form-group {
  margin: 0;
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
    margin: 20px 0 !important;
    font-size: 16px;
  }

  .form-group {
    margin: 14px 0;
  }

  input.form-control {
    width: 100%;
    padding: 30px 12px !important;
    margin: auto !important;
    color: $grey-font-color;
    box-shadow: 0 3px 5px 1px rgba(201, 201, 201, 0.295);
  }
}
</style>

<template>
  <div>
    <CustomNavbar />
    <div class="container">
      <div class="mt-4 box">
        <div class="box-header">
          <h4 class="text-center">Registration Form</h4>
        </div>
        <b-tabs content-class="mt-3" fill>
          <b-tab title="Participant" active>
            <b-form @submit="onSubmitParticipant" v-if="show" class="form">
              <b-form-group
                id="input-group-1"
                label="Email"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="formParticipant.user.email"
                  type="email"
                  placeholder="Email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Username"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="formParticipant.user.username"
                  type="text"
                  placeholder="Username"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Name" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="formParticipant.participant.nama_participant"
                  placeholder="Name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Password"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="formParticipant.user.password"
                  type="password"
                  required
                  placeholder="Password"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Confirm Password"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  v-model="formParticipant.user.rePassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button
                type="submit"
                variant="info"
                class="w-100"
                v-bind:class="{ 'd-none': !isHideSpinner }"
                >Register</b-button
              >
              <div
                class="text-center"
                v-bind:class="{ 'd-none': isHideSpinner }"
              >
                <b-spinner
                  type="grow"
                  variant="primary"
                  label="Loading..."
                ></b-spinner>
              </div>
            </b-form>
          </b-tab>

          <b-tab title="Campaigner">
            <b-form @submit="onSubmitCampaigner" v-if="show" class="form">
              <b-form-group
                id="input-group-1"
                label="Email"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="formCampaigner.user.email"
                  type="email"
                  placeholder="Email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Username"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="formCampaigner.user.username"
                  type="text"
                  placeholder="Username"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Organization Name"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="formCampaigner.campaigner.nama_campaigner"
                  placeholder="Organization Name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Phone Number:"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  v-model="formCampaigner.campaigner.notelp_campaigner"
                  placeholder="Enter Phone Number"
                  type="number"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Password:"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  v-model="formCampaigner.user.password"
                  type="password"
                  placeholder="Password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Confirm Password:"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  v-model="formCampaigner.user.rePassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                ></b-form-input>
              </b-form-group>

              <b-button
                type="submit"
                variant="info"
                v-bind:class="{ 'd-none': !isHideSpinner }"
                class="w-100"
                >Register</b-button
              >
              <div
                class="text-center"
                v-bind:class="{ 'd-none': isHideSpinner }"
              >
                <b-spinner
                  type="grow"
                  variant="info"
                  label="Loading..."
                ></b-spinner>
              </div>
            </b-form> </b-tab
        ></b-tabs>
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
      registerCampaigner: String,
      registerParticipant: String,
    },
  },

  data() {
    return {
      formParticipant: {
        user: {
          email: "",
          username: "",
          password: "",
          rePassword: "",
        },
        participant: {
          nama_participant: "",
        },
      },
      formCampaigner: {
        user: {
          email: "",
          username: "",
          password: "",
          rePassword: "",
        },
        campaigner: {
          nama_campaigner: "",
          notelp_campaigner: "",
        },
      },
      show: true,
      isHideSpinner: true,
    }
  },
  methods: {
    onSubmitParticipant(event) {
      this.isHideSpinner = false
      event.preventDefault()

      if (
        this.formParticipant.user.password !==
        this.formParticipant.user.rePassword
      ) {
        this.isHideSpinner = true
        return this.messageHelpers.error(
          "Password didn't match with confirm password"
        )
      }

      const data = {
        user: { ...this.formParticipant.user, rePassword: undefined },
        participant: this.formParticipant.participant,
      }

      const config = {
        method: "post",
        url: `${this.baseUrl}${this.url.registerParticipant}`,
        data,
      }

      axios(config)
        .then(() => {
          this.isHideSpinner = true
          this.messageHelpers.success("Registration Success")
          location.href = "/login"
        })
        .catch((error) => {
          this.isHideSpinner = true

          const message = error.response
            ? error.response.data.message
            : error.message
          this.messageHelpers.error(message)
          console.log(error.response)
        })
    },
    onSubmitCampaigner(event) {
      this.isHideSpinner = false
      event.preventDefault()

      if (
        this.formCampaigner.user.password !==
        this.formCampaigner.user.rePassword
      ) {
        this.isHideSpinner = true
        return this.messageHelpers.error(
          "Password didn't match with confirm password"
        )
      }

      const data = {
        user: { ...this.formCampaigner.user, rePassword: undefined },
        campaigner: this.formCampaigner.campaigner,
      }

      const config = {
        method: "post",
        url: `${this.baseUrl}${this.url.registerCampaigner}`,
        data,
      }

      axios(config)
        .then(() => {
          this.isHideSpinner = true
          this.messageHelpers.success("Registration Success")
          location.href = "/login"
        })
        .catch((error) => {
          this.isHideSpinner = true
          const message = error.response
            ? error.response.data.message
            : error.message
          this.messageHelpers.error(message)
          console.log(error.response)
        })
    },
  },
}
</script>
