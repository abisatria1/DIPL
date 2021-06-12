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
      cursor: pointer;
      transition: 0.2s;
      margin-bottom: 20px;

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

    .card-item:hover {
      background-color: rgba(0, 0, 0, 0.226);
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
import { API_URL } from "../helpers/listUrl"
export default {
  name: "ListEvent",
  props: {
    listEvent: Array,
  },
  data() {
    return {
      isHideSpinner: true,
      events: this.$props.listEvent || [],
    }
  },

  watch: {
    async listEvent(newValue) {
      console.log({ events: this.events })
      this.events = newValue
      await this.init()
    },
  },

  async mounted() {
    await this.init()
  },

  methods: {
    async init() {
      this.isHideSpinner = false
      try {
        let events = this.events
        if (!events.length) {
          events = await this.getAllEvent()
        }

        const wrapper = document.getElementById("wrapper")
        wrapper.innerHTML = ""
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
    async getAllEvent() {
      const config = {
        method: "get",
        url: API_URL.viewAllEvent,
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
        cardItem.addEventListener("click", () => {
          this.handleItemClick(event.id)
        })

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

    handleItemClick(eventId) {
      this.$router.push({ name: "detail-event", params: { eventId } })
    },
  },
}
</script>
