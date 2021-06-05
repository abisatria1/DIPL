<style lang="scss">
@import "@/scss/variables.scss";

.list-event {
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

    .card-item {
      width: 285px;
      padding: 20px 15px;
      text-align: justify;
      overflow: hidden;

      img {
        height: 255px;
        width: 255px;
        border-radius: 16px;
      }

      h5 {
        margin: 8px 0;
        white-space: nowrap;
      }

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .text-center {
      span {
        height: 100px;
        width: 100px;
      }
    }
  }
}
</style>

<template>
  <div class="list-event container">
    <br />
    <hr />
    <div class="wrapper" id="wrapper">
      <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "ListEvent",
  props: {
    listEvent: Array,
    url: {
      baseUrl: {
        type: String,
        default: "http://localhost:3000",
      },
      viewAllEvent: {
        type: String,
        default: "/api/event",
      },
    },
  },
  data() {
    return {
      isHideSpinner: true,
    }
  },
  async created() {
    this.isHideSpinner = false
    try {
      let events = []
      if (!events.length) {
        events = await this.getAllEvent()
      }

      this.appendAllEvents(events)
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

  methods: {
    async getAllEvent() {
      const config = {
        method: "get",
        url: `http://localhost:3000/api/event`,
      }
      const { data } = await axios(config)
      const events = data.data
      return events
    },

    async appendAllEvents(events) {
      const wrapper = document.getElementById("wrapper")
      console.log({ wrapper })
      events.forEach((event) => {
        const cardItem = document.createElement("div")
        cardItem.className = "card-item"

        const templateTwibbon = document.createElement("img")
        templateTwibbon.src = `http://localhost:3000/${event.template_twibbon}`
        templateTwibbon.alt = event.nama_event

        const judul = document.createElement("div")
        judul.className = "judul"

        const judulText = document.createElement("h5")
        judulText.textContent = event.nama_event
        judul.appendChild(judulText)

        const deskripsi = document.createElement("div")
        deskripsi.className = "deskripsi"

        const deskripsiText = document.createElement("p")
        deskripsiText.textContent = event.deskripsi_event
        deskripsi.appendChild(deskripsiText)

        cardItem.appendChild(templateTwibbon)
        cardItem.appendChild(judul)
        cardItem.appendChild(deskripsi)

        wrapper.appendChild(cardItem)
      })
    },
  },
}
</script>
