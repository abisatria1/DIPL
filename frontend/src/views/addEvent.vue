<template>
  <div>
    <b-card title="Event">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Nama Event:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.nama_event"
            type="text"
            placeholder="Nama Event"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Deskripsi Event:"
          label-for="input-2"
        >
          <b-form-textarea
            id="input-2"
            v-model="form.deskripsi_event"
            type="text"
            placeholder="Deskripsi Event"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Template Twibbon:"
          label-for="input-3"
        >
          <b-form-file
            v-model="form.template_twibbon"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Jumlah Anggota:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.jumlah_anggota"
            type="text"
            placeholder="Jumlah Anggota"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Tanggal Event:"
          label-for="input-4"
        >
          <b-form-datepicker
            v-model="form.tanggal_event"
            locale="en"
          ></b-form-datepicker>
        </b-form-group>

        <div v-bind:class = "{ 'd-none' : !isHideSpinner}">
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="button" @click="onCancel" variant="danger" class="ml-3">Cancel</b-button>
        </div>
        <div class="text-center" v-bind:class = "{ 'd-none' : isHideSpinner}" >
          <b-spinner type="grow" variant="primary" label="Loading..."></b-spinner>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios"
export default {
  props : {
    baseUrl : String,
    url : {
      createEvent : String
    }
  }, 
  data() {
    return {
      form: {
        nama_event: "",
        deskripsi_event: "",
        jumlah_anggota: null,
        tanggal_event: "",
        template_twibbon: null,
      },
      show: true,
      isHideSpinner : true
    }
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      return this.$router.push('/login')
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.form.template_twibbon = file
    },
    onSubmit(event) {
      this.isHideSpinner = false
      event.preventDefault()

      const data = new FormData()
      for (const property in this.form) {
        data.append(`${property}`, this.form[property])
      }

      const config = {
        method: "post",
        url: `${this.baseUrl}${this.url.createEvent}`,
        headers: {
          "Authorization" : this.$session.get("jwtToken")
        },
        data,
      }
      axios(config)
        .then(() => {
          this.isHideSpinner = true
          this.messageHelpers.success("Success, event created")
          this.$router.push("/event")
        })
        .catch((error) => {
          this.isHideSpinner = true
          const message = error.response ? error.response.data.message : error.message
          this.messageHelpers.error(message)
          console.log(error.response)
        })
    },
    onCancel() {
      return this.$router.push("/event")
    }
  },
}
</script>
<style></style>
