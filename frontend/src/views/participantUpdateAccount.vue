<style lang="scss" scoped>
@import "@/scss/variables";

.participant-update-account {
  .form {
    padding: 0 !important;
  }

  .btn-green {
    @include button($btn-green, 200px);
    margin-right: 10px !important;
  }

  .btn-red {
    @include button($btn-red, 200px);
  }

  .btn-yellow {
    margin-right: 10px !important;
    @include button($btn-yellow, 200px);
  }
}
</style>

<template>
  <div class="participant-update-account">
    <participant-navbar />
    <edit-password :show="showModal" @modalClosed="handleModalClosed" />
    <div class="container">
      <b-card title="Edit Account" class="mt-5">
        <b-form @submit="submitChangeEmail" class="form">
          <b-form-group label="Email">
            <b-form-input
              v-model="form.email"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <div class="button-wrapper" v-if="isHideSpinner">
            <b-button type="submit" variant="info" class="btn-green mr-4"
              >Update Email</b-button
            >
            <b-button variant="info" class="btn-yellow" @click="changePassword"
              >Change Password</b-button
            >
            <b-button variant="info" class="btn-red mr-4" @click="onCancel"
              >Cancel</b-button
            >
          </div>

          <div class="text-center" v-if="!isHideSpinner">
            <b-spinner variant="info" label="Loading..."></b-spinner>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { API_URL } from "../helpers/listUrl"
import EditPassword from "../components/editPassword.vue"
import ParticipantNavbar from "../components/participantNavbar.vue"

export default {
  name: "participant-update-profile",

  data() {
    return {
      form: {
        email: "",
      },
      isHideSpinner: true,
      showModal: false,
    }
  },

  beforeCreate() {
    if (!this.$session.exists()) {
      return this.$router.push("/login")
    }

    const user = this.$session.get("profile")
    if (!user.nama_participant) {
      return this.$router.go(-1)
    }
  },

  created() {
    this.setUser()
  },

  methods: {
    async submitChangeEmail(e) {
      e.preventDefault()
      this.isHideSpinner = false
      const jwtToken = this.$session.get("jwtToken")
      const config = {
        method: "patch",
        url: API_URL.updateEmail,
        data: this.form,
        headers: {
          Authorization: jwtToken,
        },
      }

      try {
        await axios(config)
        const profile = await this.getProfile(jwtToken)
        this.$session.set("profile", profile)
        this.messageHelpers.success("Email has been updated")
        this.isHideSpinner = true
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
        method: "GET",
        url: API_URL.my,
        headers: {
          Authorization: jwtToken,
        },
      }

      const { data } = await axios(config)
      return data.data
    },

    onCancel() {
      return this.$router.push({ name: "dashboard-participant" })
    },

    setUser() {
      const user = this.$session.get("profile")
      this.form.email = user.user.email
    },

    changePassword() {
      this.showModal = true
    },

    handleModalClosed() {
      this.showModal = false
    },
  },

  components: { EditPassword, ParticipantNavbar },
}
</script>
