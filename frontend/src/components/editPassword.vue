<style lang="scss" scoped>
@import "@/scss/variables.scss";

#passwordModal {
  .image-wrapper {
    width: 300px !important;
    height: 300px !important;
    margin: 0 auto;
    border: 1px solid rgba(211, 211, 211, 0.548);
    padding: 10px;
    box-shadow: 0 4px 5px 2px rgba(245, 230, 230, 0.349);
    border-radius: 8px;
  }
  .btn-red {
    @include button($btn-red, 200px);
  }
  .btn-green {
    @include button($btn-green, 200px);
  }

  .button-wrapper {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>

<template>
  <b-modal id="passwordModal" title="Edit Password" :hide-footer="true">
    <b-form @submit="submitChangePassword" class="form">
      <b-form-group label="Current Password">
        <b-form-input
          v-model="form.oldPassword"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="New Password">
        <b-form-input
          v-model="form.newPassword"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Retype new Password">
        <b-form-input
          v-model="form.rePassword"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <div class="button-wrapper" v-if="isHideSpinner">
        <b-button type="submit" variant="info" class="btn-green mr-4"
          >Update Password</b-button
        >
        <b-button variant="info" class="btn-red mr-4" @click="onCancel"
          >Cancel</b-button
        >
      </div>

      <div class="text-center" v-if="!isHideSpinner">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import axios from "axios"
import { API_URL } from "../helpers/listUrl"
export default {
  name: "edit-password",

  props: {
    show: Boolean,
  },

  watch: {
    show(newValue) {
      this.showModal = newValue

      if (this.showModal) {
        this.$bvModal.show("passwordModal")
      } else {
        this.$bvModal.hide("passwordModal")
        this.resetForm()
      }
    },
  },

  data() {
    return {
      showModal: this.$props.show,
      form: {
        oldPassword: "",
        newPassword: "",
        rePassword: "",
      },
      isHideSpinner: true,
    }
  },

  created() {
    console.log("mantap")
    this.$root.$on("bv::modal::hide", () => {
      this.showModal = false
      this.$emit("modalClosed")
    })
  },

  methods: {
    onCancel() {
      this.$bvModal.hide("passwordModal")
    },
    async submitChangePassword(event) {
      this.isHideSpinner = false
      event.preventDefault()

      if (this.form.newPassword !== this.form.rePassword) {
        this.isHideSpinner = true
        return this.messageHelpers.error(
          "Password didn't match with retype password"
        )
      }

      const data = {
        oldPassword: this.form.oldPassword,
        newPassword: this.form.newPassword,
      }

      const config = {
        method: "patch",
        url: API_URL.updatePassword,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
        data,
      }

      try {
        await axios(config)
        this.isHideSpinner = true
        this.messageHelpers.success("Password has been updated")
        this.$bvModal.hide("passwordModal")
        this.$emit("modalClosed")
      } catch (error) {
        this.isHideSpinner = true
        const message = error.response
          ? error.response.data.message
          : error.message
        this.messageHelpers.error(message)
        console.log(error.response)
      }
    },
    resetForm() {
      this.form.oldPassword = ""
      this.form.newPassword = ""
      this.form.rePassword = ""
    },
  },
}
</script>
