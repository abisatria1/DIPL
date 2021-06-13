<style lang="scss" scoped>
@import "@/scss/variables.scss";

.view-all-twibbon {
  .header {
    background-color: $primary-color;
    padding: 15px !important;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  h1 {
    margin: 0 !important;
    padding: 4px 0 !important;
    font-size: 30px;
    font-weight: 700;
  }

  h4 {
    margin: 0 !important;
    padding: 0 !important;
    font-size: 17px;
    color: #707070;
    font-weight: normal;
    text-transform: none;
  }
}
</style>

<template>
  <div class="view-all-twibbon">
    <participant-navbar activeNavbar="twibbon" />
    <div class="container">
      <div class="header">
        <h1>Your Twibbon</h1>
        <h4>
          You can manage all the campaigns that you have participated in along
          with the results of the twibbon.
        </h4>
      </div>
    </div>
    <list-twibbon :listTwibbons="events" v-if="events && events.length" />
    <no-twibbon v-if="events.length == 0" />
  </div>
</template>

<script>
import axios from "axios"
import { API_URL } from "../helpers/listUrl"
import participantNavbar from "../components/participantNavbar.vue"
import ListTwibbon from "../components/listTwibbon.vue"
import NoTwibbon from "../components/noTwibbon.vue"
export default {
  name: "all-twibbon",

  data() {
    return {
      events: undefined,
      isHideSpinner: true,
    }
  },

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
      const events = await this.viewAllTwibbon()
      this.events = events
    } catch (error) {
      this.isHideSpinner = true

      const message = error.response
        ? error.response.data.message
        : error.message
      this.messageHelpers.error(message)
      console.log(error.response)
    }
  },

  methods: {
    async viewAllTwibbon() {
      const config = {
        method: "get",
        url: API_URL.viewAllTwibbon,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
      }

      const result = await axios(config)
      return result.data.data
    },
  },

  components: { participantNavbar, ListTwibbon, NoTwibbon },
}
</script>
