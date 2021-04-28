<template>
  <div>
    <b-card title="Edit Event">
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
        id="input-group-4"
        label="Tanggal Event:"
        label-for="input-4"
      >
        <b-form-datepicker v-model="form.tanggal_event" locale="en"></b-form-datepicker>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Jumlah Anggota:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="form.jumlah_anggota"
          type="number"
          placeholder="Jumlah Anggota"
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
        ></b-form-textarea>
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
import axios from 'axios';
  export default {
    props : {
      baseUrl : String,
      url : {
        viewDetailEvent : String,
        updateEvent : String
      }
    },
    data() {
      return {
        form: {
          nama_event: "",
          deskripsi_event: "",
          jumlah_anggota: null,
          tanggal_event: "",
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
    mounted(){
      this.init()
    },
    methods: {
      init(){
        const config = {
          method: "get",
          url: `${this.baseUrl}${this.url.viewDetailEvent}${this.$route.params.id}`,
          headers : {
            "Authorization" : this.$session.get("jwtToken")
          }
        }
        axios(config)
          .then(({data}) => {
            let row = data.data
            this.form.nama_event = row.nama_event
            this.form.deskripsi_event = row.deskripsi_event
            this.form.jumlah_anggota = row.jumlah_anggota
            this.form.tanggal_event = row.tanggal_event
          })
          .catch((error) => {
            const message = error.response ? error.response.data.message : error.message
            this.messageHelpers.error(message)
            console.log(error.response)
          })
      },
      onSubmit(event) {
        this.isHideSpinner = false
        event.preventDefault()
        const config = {
            method: 'patch',
            url: `${this.baseUrl}${this.url.updateEvent}${this.$route.params.id}`,
            headers: { 
              'Authorization': this.$session.get("jwtToken"), 
            },
            data : this.form
        };
        axios(config)
        .then(() => {
          this.isHideSpinner = true
          this.messageHelpers.success("Success, event has been updated")
          return this.$router.push("/event")
        })
        .catch((error) => {
          this.isHideSpinner = true
          const message = error.response ? error.response.data.message : error.message
          this.messageHelpers.error(message)
          console.log(error.response)
        });
      },
      onCancel() {
        return this.$router.push("/event")
      }
    }
  }
</script>
<style>

</style>