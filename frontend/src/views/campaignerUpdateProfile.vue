<style lang="scss" scoped>
@import "@/scss/variables";

.campaigner-update-profile {
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
}
</style>

<template>
  <div class="campaigner-update-profile">
    <campaigner-navbar />
    <div class="container">
      <b-card title="Edit Profile" class="mt-5">
        <b-form @submit="onSubmit" class="form">
          <b-form-group label="Username">
            <b-form-input
              v-model="form.username"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Campaigner Name">
            <b-form-input
              v-model="form.nama_campaigner"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Campaigner Phone Number">
            <b-form-input
              v-model="form.notelp_campaigner"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <div class="button-wrapper" v-if="isHideSpinner">
            <b-button type="submit" variant="info" class="btn-green mr-4"
              >Update</b-button
            >
            <b-button variant="info" class="btn-red" @click="onCancel"
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
import campaignerNavbar from "../components/campaignerNavbar.vue"
import { API_URL } from "../helpers/listUrl"

export default {
  name: "campaigner-update-profile",

  data() {
    return {
      form: {
        nama_campaigner: "",
        notelp_campaigner: "",
        username: "",
      },
      isHideSpinner: true,
    }
  },

  beforeCreate() {
    if (!this.$session.exists()) {
      return this.$router.push("/login")
    }

    const user = this.$session.get("profile")
    if (!user.nama_campaigner) {
      return this.$router.go(-1)
    }
  },

  created() {
    this.setUser()
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.isHideSpinner = false
      const jwtToken = this.$session.get("jwtToken")
      const config = {
        method: "patch",
        url: API_URL.campaignerUpdateProfile,
        data: this.form,
        headers: {
          Authorization: jwtToken,
        },
      }

      try {
        await axios(config)
        const profile = await this.getProfile(jwtToken)
        this.$session.set("profile", profile)
        this.messageHelpers.success("Data has been updated")
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
      return this.$router.push({ name: "dashboard-campaigner" })
    },

    setUser() {
      const user = this.$session.get("profile")
      this.form.nama_campaigner = user.nama_campaigner
      this.form.notelp_campaigner = user.notelp_campaigner
      this.form.username = user.user.username
    },
  },

  components: { campaignerNavbar },
}
</script>
