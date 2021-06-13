<style lang="scss" scoped>
@import "@/scss/variables.scss";

.detailEvent {
  .card {
    padding: 0 0 40px 0;
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: normal;
  }
  h1,
  h2 {
    color: $black-font-color;
    padding: 0;
    line-height: 1.5rem;
  }
  p {
    padding-top: 1rem;
    color: $grey-font-color;
  }

  .image-wrapper {
    width: 500px !important;
    height: 500px !important;
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
    @include button($btn-red, 200px);
  }
  .green-btn {
    @include button($btn-green, 200px);
  }
  .yellow-btn {
    @include button($btn-yellow, 200px);
  }

  .button-wrapper {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .text-center {
    span {
      height: 200px;
      width: 200px;
    }
  }
}
</style>

<template>
  <div class="detailEvent" id="detailEvent">
    <participant-navbar />
    <div class="container w-50 text-center mt-5">
      <div class="header">
        <h2 class="nama-campaigner">
          {{ this.campaigner.nama_campaigner }}
        </h2>
        <h1 class="nama-event">{{ this.event.nama_event }}</h1>
        <p class="deskripsi-event">{{ this.event.deskripsi_event }}</p>
      </div>

      <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>

      <b-card
        title="Generate Your Twibbon"
        v-if="!alreadyGenerate && isHideSpinner"
      >
        <div class="image-wrapper">
          <img :src="imgUrl" alt="twibbon-template" />
        </div>

        <b-form-group class="mt-4" id="foto-participant">
          <b-form-file
            v-model="foto_participant"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </b-form-group>

        <div class="button-wrapper">
          <b-button
            type="submit"
            class="green-btn"
            variant="primary"
            @click="onSubmit"
            >Generate Twibbon</b-button
          >
          <b-button type="button" @click="onCancel" class="ml-3 red-btn"
            >Cancel</b-button
          >
        </div>

        <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
          <b-spinner type="grow" variant="info" label="Loading..."></b-spinner>
        </div>
      </b-card>

      <b-card title="View Your Twibbon" v-if="alreadyGenerate && isHideSpinner">
        <div class="image-wrapper">
          <img :src="this.twibbon.hasil_foto" alt="hasil-foto" />
        </div>

        <div class="button-wrapper mt-3">
          <b-button
            type="submit"
            class="green-btn"
            variant="primary"
            @click="onDownload"
            >Download</b-button
          >

          <a
            :href="this.twibbon.hasil_foto"
            class="d-none"
            id="download-link"
            :download="this.event.nama_event + 'twibbon'"
            target="_blank"
          ></a>

          <b-button type="button" @click="onReset" class="ml-3 yellow-btn"
            >Reset</b-button
          >

          <b-button type="button" @click="onCancel" class="ml-3 red-btn"
            >Back</b-button
          >
        </div>

        <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
          <b-spinner type="grow" variant="info" label="Loading..."></b-spinner>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { API_URL, BASE_URL } from "../helpers/listUrl"
import participantNavbar from "../components/participantNavbar.vue"
export default {
  name: "detail-event",
  components: { participantNavbar },

  beforeCreate() {
    if (!this.$session.exists()) {
      return this.$router.push("/login")
    }

    const user = this.$session.get("profile")
    if (!user.nama_participant) {
      return this.$router.go(-1)
    }
  },

  async created() {
    try {
      this.isHideSpinner = false
      await this.setEvent()
      await this.setTwibbon()
      if (this.twibbon != null) this.alreadyGenerate = true
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

  data() {
    return {
      event: {},
      twibbon: {},
      campaigner: {},
      foto_participant: [],
      imgUrl: "",
      isHideSpinner: true,
      alreadyGenerate: false,
    }
  },

  methods: {
    async onSubmit(e) {
      this.isHideSpinner = false
      e.preventDefault()
      const data = new FormData()
      data.append("foto_participant", this.foto_participant)

      const config = {
        method: "POST",
        url: API_URL.createTwibbon + this.$route.params.eventId,
        headers: {
          authorization: this.$session.get("jwtToken"),
        },
        data,
      }

      try {
        const result = await axios(config)
        this.twibbon = result.data.data
        this.twibbon.hasil_foto = this.generateImgSrc(
          this.twibbon.hasil_foto_buffer
        )
        this.alreadyGenerate = true

        this.isHideSpinner = true
        this.messageHelpers.success("Success generate twibbon, enjoy!")
      } catch (error) {
        this.isHideSpinner = true

        const message = error.response
          ? error.response.data.message
          : error.message
        this.messageHelpers.error(message)
        console.log(error.response)
      }
    },

    onCancel() {
      this.$router.go(-1)
    },

    onDownload() {
      document.getElementById("download-link").click()
    },

    generateImgSrc(buffer) {
      const b64 = new Buffer(buffer).toString("base64")
      const mimeType = "image/png"
      return `data:${mimeType};base64,${b64}`
    },

    async setTwibbon() {
      const config = {
        method: "GET",
        url: API_URL.viewTwibbon + this.$route.params.eventId,
        headers: {
          authorization: this.$session.get("jwtToken"),
        },
      }

      const { data } = await axios(config)
      if (data.data) {
        data.data.hasil_foto = BASE_URL + "/" + data.data.hasil_foto
      }
      this.twibbon = data.data == null || data.data == {} ? null : data.data
    },

    async setEvent() {
      const config = {
        method: "GET",
        url: API_URL.viewDetailEvent + this.$route.params.eventId,
        headers: {
          authorization: this.$session.get("jwtToken"),
        },
      }

      const result = await axios(config)
      const event = result.data.data
      this.event = event
      this.campaigner = event.campaigner
      this.imgUrl = BASE_URL + "/" + event.template_twibbon
    },

    async onReset() {
      try {
        this.isHideSpinner = false
        const twibbon = this.twibbon.dataValues
          ? this.twibbon.dataValues
          : this.twibbon
        const config = {
          method: "DELETE",
          url:
            API_URL.deleteTwibbon +
            `${this.$route.params.eventId}/${twibbon.twibbonId}`,
          headers: {
            authorization: this.$session.get("jwtToken"),
          },
        }
        await axios(config)
        this.twibbon = null
        this.alreadyGenerate = false
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
  },
}
</script>
