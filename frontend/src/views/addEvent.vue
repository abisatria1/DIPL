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

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios"
export default {
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
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.form.template_twibbon = file
    },
    onSubmit(event) {
      event.preventDefault()
      const baseUrl = "http://localhost:3000"
      const data = new FormData()
      for (const property in this.form) {
        data.append(`${property}`, this.form[property])
      }

      const config = {
        method: "post",
        url: `${baseUrl}/api/campaigner/event/`,
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUd2VlYnoiLCJzdWIiOnsiY2FtcGFpZ25lcklkIjoyfSwiaWF0IjoxNjE4OTEwNDUzMjM0LCJleHAiOjE2MTg5MTA1Mzk2MzR9.x1oT3lPC_FeupPVb444INFpde0WxDTAp0kA_wM5dak0",
        },
        data,
      }
      axios(config)
        .then(function(response) {
          console.log(response)
          alert("success")
          location.reload()
        })
        .catch(function(error) {
          alert("Gagal!")
          console.log(error)
        })
    },
  },
}
</script>
<style></style>
