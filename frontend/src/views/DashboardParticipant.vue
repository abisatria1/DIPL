<template>
  <div>
    <participant-navbar />
    <welcome-message nama="Kadek Abi Satria Adinatha Vidya Putra" />
    <search-event @eventChanged="handleEventChanged" />
    <list-event v-bind:listEvent="events" />
  </div>
</template>

<script>
import ListEvent from "../components/listEvent.vue"
import ParticipantNavbar from "../components/participantNavbar.vue"
import SearchEvent from "../components/searchEvent.vue"
import WelcomeMessage from "../components/welcomeMessage.vue"
export default {
  props: {
    baseUrl: String,
    url: {},
  },

  data() {
    return {
      events: [],
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

  methods: {
    handleEventChanged(events) {
      this.events = events
    },
  },

  components: {
    ParticipantNavbar,
    WelcomeMessage,
    SearchEvent,
    ListEvent,
  },
}
</script>
