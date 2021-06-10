<template>
  <div>
    <b-card title="Event">
      <b-button href="#" variant="primary" @click="createEvent" class="mb-3"
        >Add Event</b-button
      >
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(template_twibbon)="dataEvent">
          <img
            :src="baseUrl + '/' + dataEvent.item.template_twibbon"
            alt="template_twibbon"
            width="100"
            height="100"
          />
        </template>
        <template #cell(id_event)="dataEvent">
          <b-button
            @click="editEvent(dataEvent.item.id_event, $event.target)"
            variant="warning"
            >Edit Event</b-button
          >
          <b-button
            @click="deleteEvent(dataEvent.item.id_event, $event.target)"
            class="ml-3"
            variant="danger"
            >Delete Event</b-button
          >
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import axios from "axios"

export default {
  props: {
    baseUrl: String,
    url: {
      viewAllEvent: String,
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

  mounted() {
    const config = {
      method: "get",
      url: `${this.baseUrl}${this.url.viewAllEvent}`,
      headers: {
        Authorization: this.$session.get("jwtToken"),
      },
    }
    axios(config)
      .then(({ data }) => {
        let rows = data.data
        rows = rows.map((item) => {
          const tanggal = new Date(item.tanggal_event).toLocaleDateString(
            "fr-CA"
          )
          return {
            id_event: item.id,
            nama_event: item.nama_event,
            date_event: tanggal,
            jumlah_participant: item.jumlah_anggota,
            deskripsi_event: item.deskripsi_event,
            template_twibbon: item.template_twibbon,
          }
        })
        this.items = rows
      })
      .catch((error) => {
        const message = error.response
          ? error.response.data.message
          : error.message
        this.messageHelpers.error(message)
        console.log(error.response)
      })
  },
  data() {
    return {
      fields: [
        "nama_event",
        "date_event",
        "jumlah_participant",
        "deskripsi_event",
        "template_twibbon",
        { key: "id_event", label: "Actions" },
      ],
      items: [],
    }
  },
  methods: {
    editEvent(id_event) {
      this.$router.push({ name: "EventEdit", params: { id: id_event } })
    },
    deleteEvent(id_event) {
      alert(id_event)
    },
    createEvent() {
      this.$router.push({ name: "EventAdd" })
    },
  },
}
</script>
