<style lang="scss">
@import "@/scss/variables.scss";
.edit-event-page {
  .btn-green {
    @include button($btn-green);
  }

  .btn-red {
    @include button($btn-red);
  }

  .btn-yellow {
    @include button($btn-yellow, 200px);
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
  <div class="edit-event-page">
    <campaigner-navbar />
    <edit-twibbon
      v-bind:show="showModal"
      v-bind:twibbon="template_twibbon"
      @modalClosed="handleModalClosed"
      @twibbonUpdated="handleTwibbonUpdated"
    />
    <div class="container">
      <b-card
        title="Edit Event"
        sub-title="Please ensure your information is right and responsible. Let's Make awesome things!"
        class="mt-5"
      >
        <b-button class="btn-yellow mt-3 mb-3" @click="editTwibbon"
          >Edit Twibbon Template</b-button
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
            id="input-group-4"
            label="Event Date:"
            label-for="input-4"
          >
            <b-form-datepicker
              v-model="form.tanggal_event"
              locale="en"
            ></b-form-datepicker>
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
            id="input-group-2"
            label="Event Description:"
            label-for="input-2"
          >
            <b-form-textarea
              id="input-2"
              v-model="form.deskripsi_event"
              type="text"
              placeholder="Event Description"
            ></b-form-textarea>
          </b-form-group>

          <div v-bind:class="{ 'd-none': !isHideSpinner }">
            <b-button class="btn-green" type="submit" variant="primary"
              >Submit</b-button
            >
            <b-button
              type="button"
              @click="onCancel"
              variant="danger"
              class="ml-3 btn-red"
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
import campaignerNavbar from "../components/campaignerNavbar.vue"
import EditTwibbon from "../components/editTwibbon.vue"
export default {
  components: { campaignerNavbar, EditTwibbon },

  props: {
    baseUrl: String,
    url: {
      viewDetailEvent: String,
      updateEvent: String,
    },
  },
  data() {
    return {
      form: {
        nama_event: "",
        deskripsi_event: "",
        jumlah_anggota: null,
        tanggal_event: "",
      },
      template_twibbon: "",
      show: true,
      isHideSpinner: true,
      showModal: false,
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
    this.init()
  },
  methods: {
    init() {
      const config = {
        method: "get",
        url: `${this.baseUrl}${this.url.viewDetailEvent}${this.$route.params.id}`,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
      }
      axios(config)
        .then(({ data }) => {
          let row = data.data
          this.form.nama_event = row.nama_event
          this.form.deskripsi_event = row.deskripsi_event
          this.form.jumlah_anggota = row.jumlah_anggota
          this.form.tanggal_event = row.tanggal_event
          this.template_twibbon = row.template_twibbon
        })
        .catch((error) => {
          const message = error.response
            ? error.response.data.message
            : error.message
          this.messageHelpers.error(message)
          console.log(error.response)
        })
    },
    onSubmit(event) {
      this.isHideSpinner = false
      event.preventDefault()
      const config = {
        method: "patch",
        url: `${this.baseUrl}${this.url.updateEvent}${this.$route.params.id}`,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
        data: this.form,
      }
      axios(config)
        .then(() => {
          this.isHideSpinner = true
          this.messageHelpers.success("Success, event has been updated")
          return this.$router.push({ name: "dashboard-campaigner" })
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
    editTwibbon() {
      this.showModal = true
    },
    handleModalClosed() {
      this.showModal = false
    },
    handleTwibbonUpdated() {
      this.init()
    },
  },
}
</script>
<style></style>
