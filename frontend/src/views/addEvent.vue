<style lang="scss">
@import "@/scss/variables.scss";

.create-event-page {
  .green-btn {
    @include button($btn-green);
  }

  .red-btn {
    @include button($btn-red);
  }

  .card {
    .card-title {
      padding: 10px 0 !important;
    }

    .card-subtitle {
      color: $grey-font-color !important;
      padding-bottom: 20px;
      margin-bottom: 10px !important;
      border-bottom: 1px solid rgba(199, 199, 199, 0.644);
    }

    label:not(.text-muted, .custom-file-label) {
      color: $grey-font-color;
      font-weight: bold;
    }

    .form-control:not(textarea):not(div) {
      width: 100%;
      padding: 30px 12px;
      color: $grey-font-color;
      box-shadow: 0 3px 5px 1px rgba(201, 201, 201, 0.295);
    }

    textarea {
      color: $grey-font-color;
      box-shadow: 0 3px 5px 1px rgba(201, 201, 201, 0.295);
    }

    label.form-control {
      padding: 19px 12px !important;
      margin: 0 !important;
    }

    div.custom-file.b-form-file {
      height: 62px;
      box-shadow: 0 3px 5px 1px rgba(201, 201, 201, 0.295);
      label {
        font-size: 1rem;
        height: 62px;
        display: flex;
        align-items: center;

        &:after {
          height: 62px;
          display: flex;
          align-items: center;
        }
        span {
          color: $grey-font-color !important;
        }
      }
    }
  }
}
</style>

<template>
  <div class="create-event-page">
    <campaigner-navbar activeNavbar="createEvent" />
    <div class="container">
      <b-card
        title="Add Campaign"
        sub-title="Please ensure your information is right and responsible. Let's Make awesome things!"
        class="mt-5"
      >
        <b-form @submit="onSubmit" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Event Name:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.nama_event"
              type="text"
              placeholder="Event Name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Event Description:"
            label-for="input-2"
          >
            <b-form-textarea
              id="input-2"
              v-model="form.deskripsi_event"
              type="text"
              placeholder="Event Description"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Twibbon Template:"
            label-for="input-3"
          >
            <b-form-file
              v-model="form.template_twibbon"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              size="lg"
            ></b-form-file>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Total Participant:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.jumlah_anggota"
              type="number"
              placeholder="Total Participant"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Campaign will be held on:"
            label-for="input-4"
          >
            <b-form-datepicker
              v-model="form.tanggal_event"
              locale="en"
            ></b-form-datepicker>
          </b-form-group>

          <div v-bind:class="{ 'd-none': !isHideSpinner }">
            <b-button type="submit" class="green-btn" variant="primary"
              >Submit</b-button
            >
            <b-button type="button" @click="onCancel" class="ml-3 red-btn"
              >Cancel</b-button
            >
          </div>
          <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
            <b-spinner
              type="grow"
              variant="primary"
              label="Loading..."
            ></b-spinner>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import CampaignerNavbar from "../components/campaignerNavbar.vue"
export default {
  props: {
    baseUrl: String,
    url: {
      createEvent: String,
    },
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
          Authorization: this.$session.get("jwtToken"),
        },
        data,
      }
      axios(config)
        .then(() => {
          this.isHideSpinner = true
          this.messageHelpers.success("Success, event created")
          this.$router.push({ name: "dashboard-campaigner" })
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
    onCancel() {
      return this.$router.push({ name: "dashboard-campaigner" })
    },
  },

  components: {
    CampaignerNavbar,
  },
}
</script>
