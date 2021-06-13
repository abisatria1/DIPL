<style lang="scss" scoped>
@import "@/scss/variables.scss";
.view-participant {
  .text-center {
    margin-top: 200px;
    span {
      height: 100px;
      width: 100px;
    }
  }

  .event-header {
    background-color: $primary-color;
    padding: 15px !important;
    margin-top: 20px;
    // margin-bottom: 20px;
    text-align: justify;
  }

  h1 {
    font-size: 30px;
    font-weight: 700;
    padding: 10px 0 !important;
    margin: 0 !important;
  }

  h4 {
    padding: 0 !important;
    margin: 0 !important;
    font-size: 17px;
    color: #707070;
    font-weight: normal;
    text-transform: none;
  }

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

  .btn-yellow {
    @include button($btn-yellow, 150px);
  }

  .btn-red {
    @include button($btn-red, 150px);
  }

  .btn-green {
    @include button($btn-green, 120px);
  }

  .actions {
    text-align: center;
    margin: 10px;
  }
}
</style>

<template>
  <div class="view-participant">
    <campaigner-navbar />
    <div class="content container" v-if="isHideSpinner && eventParticipants">
      <show-twibbon-modal
        v-if="showModal"
        :twibbon="modalImgUrl"
        :show="showModal"
        @showTwibbonModalClosed="handleViewTwibbonModalClosed"
      />
      <div class="event-header">
        <div class="image-wrapper">
          <img
            :src="BASE_URL + '/' + event.template_twibbon"
            :alt="event.nama_event"
            class="template-twibbon"
          />
        </div>
        <h1>{{ event.nama_event }}</h1>
        <h4>{{ event.deskripsi_event }}</h4>
      </div>

      <div class="actions">
        <b-button
          class="btn-yellow mr-3"
          @click="toEditEvent(event.id, $event.target)"
          >Edit Twibbon</b-button
        >
        <b-button class="btn-red" @click="onCancel">Back</b-button>
      </div>

      <event-participant-table
        :initialItems="eventParticipants"
        @showTwibbonModal="handleViewTwibbonModal"
      />
    </div>
    <div class="text-center" v-if="!isHideSpinner">
      <b-spinner variant="info" label="Loading..."></b-spinner>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import CampaignerNavbar from "../components/campaignerNavbar.vue"
import { API_URL, BASE_URL } from "../helpers/listUrl"
import EventParticipantTable from "../components/eventParticipantTable.vue"
import ShowTwibbonModal from "../components/showTwibbonModal.vue"
export default {
  name: "view-participant",

  data() {
    return {
      event: undefined,
      eventParticipants: undefined,
      isHideSpinner: true,
      showModal: false,
      modalImgUrl: "",
      BASE_URL,
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

  async created() {
    try {
      this.isHideSpinner = false
      const eventId = this.$route.params.eventId
      const event = await this.getEvent(eventId)
      const eventParticipants = await this.getEventParticipants(eventId)

      this.event = event
      this.eventParticipants = eventParticipants
      this.isHideSpinner = true
    } catch (error) {
      this.isHideSpinner = true

      const message = error.response
        ? error.response.data.message
        : error.message
      this.messageHelpers.error(message)
      console.log(error.response)
      this.$router.go(-1)
    }
  },

  methods: {
    async getEvent(eventId) {
      const config = {
        url: API_URL.viewDetailEventByCampaigner + eventId,
        method: "get",
        headers: {
          authorization: this.$session.get("jwtToken"),
        },
      }

      const result = await axios(config)
      return result.data.data
    },

    async getEventParticipants(eventId) {
      const config = {
        url: API_URL.viewEventParticipant + eventId,
        method: "get",
        headers: {
          authorization: this.$session.get("jwtToken"),
        },
      }

      const result = await axios(config)
      return result.data.data
    },

    handleViewTwibbonModal(url) {
      this.showModal = true
      this.modalImgUrl = BASE_URL + "/" + url
    },

    handleViewTwibbonModalClosed() {
      this.showModal = false
    },

    toEditEvent(eventId) {
      return this.$router.push({ name: "editEvent", params: { id: eventId } })
    },

    onCancel() {
      return this.$router.go(-1)
    },
  },

  components: {
    CampaignerNavbar,
    EventParticipantTable,
    ShowTwibbonModal,
  },
}
</script>
