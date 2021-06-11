<style lang="scss" scoped>
@import "@/scss/variables.scss";

#edit-twibbon {
  .image-wrapper {
    width: 300px !important;
    height: 300px !important;
    margin: 0 auto;
    border: 1px solid rgba(211, 211, 211, 0.548);
    padding: 10px;
    box-shadow: 0 4px 5px 2px rgba(245, 230, 230, 0.349);
    border-radius: 8px;
  }
  img {
    width: 100%;
    height: 100%;
  }

  .red-btn {
    @include button($btn-red);
  }
  .green-btn {
    @include button($btn-green);
  }

  .button-wrapper {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>

<template>
  <b-modal id="edit-twibbon" title="Edit Twibbon" :hide-footer="true">
    <div class="image-wrapper">
      <img v-bind:src="imgUrl" alt="twibbon-template" />
    </div>

    <b-form-group class="mt-4" id="template-twibbon">
      <b-form-file
        v-model="form.template_twibbon"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="onFileChange"
      ></b-form-file>
    </b-form-group>

    <div class="button-wrapper" v-bind:class="{ 'd-none': !isHideSpinner }">
      <b-button
        type="submit"
        v-if="showUpdateButton"
        class="green-btn"
        variant="primary"
        @click="onSubmit"
        >Update</b-button
      >
      <b-button type="button" @click="onCancel" class="ml-3 red-btn"
        >Cancel</b-button
      >
    </div>

    <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
      <b-spinner type="grow" variant="info" label="Loading..."></b-spinner>
    </div>
  </b-modal>
</template>

<script>
import axios from "axios"
import { BASE_URL, API_URL } from "../helpers/listUrl"
export default {
  name: "edit-twibbon",

  props: {
    show: Boolean,
    twibbon: String,
  },

  data() {
    return {
      showModal: this.$props.show,
      imgUrl: this.$props.twibbon,
      form: {
        template_twibbon: [],
      },
      BASE_URL,
      showUpdateButton: false,
      isHideSpinner: true,
    }
  },

  watch: {
    show(newValue) {
      this.showModal = newValue
      if (this.showModal) {
        this.$bvModal.show("edit-twibbon")
      } else {
        this.$bvModal.hide("edit-twibbon")
      }
    },
    twibbon(newValue) {
      this.imgUrl = this.BASE_URL + "/" + newValue
    },
  },

  created() {
    this.$root.$on("bv::modal::hide", () => {
      this.showModal = false
      this.$emit("modalClosed")
    })
    this.imgUrl = this.BASE_URL + "/" + this.$props.twibbon
  },

  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.showUpdateButton = true
    },
    onCancel() {
      this.$bvModal.hide("edit-twibbon")
      this.imgUrl = this.BASE_URL + "/" + this.$props.twibbon
      this.showUpdateButton = false
    },
    async onSubmit(event) {
      this.isHideSpinner = false
      event.preventDefault()

      const data = new FormData()
      for (const property in this.form) {
        data.append(`${property}`, this.form[property])
      }

      const config = {
        method: "patch",
        url: API_URL.updateTemplateTwibbon + this.$route.params.id,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
        data,
      }

      try {
        await axios(config)
        this.isHideSpinner = true
        this.showUpdateButton = false
        this.messageHelpers.success("Template twibbon has been updated")
        this.$bvModal.hide("edit-twibbon")
        this.$emit("twibbonUpdated")
      } catch (error) {
        this.isHideSpinner = true
        const message = error.response
          ? error.response.data.message
          : error.message
        this.messageHelpers.error(message)
        console.log(error.response)
      }
    },
  },
}
</script>
