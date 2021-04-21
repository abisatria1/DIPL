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
          v-model="form.desc_event"
          type="text"
          placeholder="Deskripsi Event"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Deskripsi Event:"
        label-for="input-4"
      >
        <b-form-textarea
          id="input-4"
          v-model="form.jumlah_anggota"
          type="text"
          placeholder="Jumlah Anggota"
          required
        ></b-form-textarea>
      </b-form-group>


      <b-form-group
        id="input-group-2"
        label="Template Twibbon:"
        label-for="input-2"
      >
        <b-form-file
        v-model="form.template"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>


      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
            template:null,
            nama_event: '',
            desc_event:'',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>
<style>

</style>