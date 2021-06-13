<template>
  <div>
    <campaigner-navbar activeNavbar="home" />
    <welcome-message
      v-bind:nama="user.nama_campaigner"
      message="Hello, Let's create amazing work today!"
    />
    <div v-if="events.length === 0">
      <no-event />
    </div>
    <div v-else>
      <list-event-table
        v-bind:initialItems="events"
        @eventDeleted="handleDeleteEvent"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import CampaignerNavbar from "../components/campaignerNavbar.vue"
import NoEvent from "../components/noEvent.vue"
import WelcomeMessage from "../components/welcomeMessage.vue"
import ListEventTable from "../components/listEventTable.vue"
export default {
  props: {
    baseUrl: String,
    url: {
      viewAllEventByCampaigner: String,
    },
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
    this.user = this.setUserWelcomeName()
    this.events = await this.setCampaignerEvent()
  },

  data() {
    return {
      user: "",
      events: [],
    }
  },

  methods: {
    setUserWelcomeName() {
      const user = this.$session.get("profile")
      return user
    },
    async setCampaignerEvent() {
      const config = {
        method: "get",
        url: this.$props.baseUrl + this.$props.url.viewAllEventByCampaigner,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
      }
      try {
        const { data } = await axios(config)
        return data.data
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : error.message
        console.log(message)
        console.log(error.response)
      }
    },
    handleDeleteEvent(id_event) {
      const events = this.events.filter((event) => event.id != id_event)
      this.events = events
    },
  },

  components: {
    CampaignerNavbar,
    WelcomeMessage,
    NoEvent,
    ListEventTable,
  },
}
</script>
