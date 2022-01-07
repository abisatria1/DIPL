<style lang="scss" scoped>
@import "@/scss/variables.scss";

.card {
  .btn-yellow {
    @include button($btn-yellow, 120px);
  }

  .btn-red {
    @include button($btn-red, 120px);
  }

  .green-btn {
    @include button($btn-green, 150px);
  }

  .green-120-btn {
    @include button($btn-green, 120px);
  }

  .card-title {
    padding: 0 !important;
    margin: 0 !important;
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: left;
    p {
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  .custom-btn {
    background-color: white;
    padding: 8px !important;
    font-weight: $medium-font-weight;
    font-size: 16px;
    width: 120px;
    color: $secondary-color;
    border: 1px solid $secondary-color;
    border-radius: 10px;
    transition: 0.2s;
  }

  .custom-btn:hover {
    background-color: $secondary-color;
    color: white !important;
    .icon-1 {
      fill: white;
    }
  }

  .icon-1 {
    width: 25px;
    height: 25px;
    font-weight: bold;
    fill: $secondary-color;
  }

  .table {
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
  }

  .table .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    button {
      margin: 2px 0 !important;
    }
  }
}
</style>

<template>
  <div class="container">
    <b-card title="Campaign List">
      <b-card-text class="d-flex align-items-center justify-content-between">
        <div class="left">
          <p>
            Manage your awesome campaign here. There are many settings you can
            play with
          </p>
        </div>
        <div class="right text-right">
          <b-button class="green-btn" @click="toAddEvent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus icon-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            Campaign
          </b-button>
        </div>
      </b-card-text>
      <b-table ref="table" striped hover :items="items" :fields="fields">
        <template #cell(twibbon_template)="dataEvent">
          <img
            :src="baseUrl + '/' + dataEvent.item.twibbon_template"
            alt="twibbon_template"
            width="100"
            height="100"
          />
        </template>
        <template #cell(id_event)="dataEvent">
          <div class="button-wrapper">
            <b-button
              @click="toViewParticipant(dataEvent.item.id_event, $event.target)"
              variant="info"
              class="green-120-btn"
              >View</b-button
            >
            <b-button
              @click="toEditEvent(dataEvent.item.id_event, $event.target)"
              variant="warning"
              class="btn-yellow"
              >Edit Event</b-button
            >
            <b-button
              @click="deleteEvent(dataEvent.item.id_event, $event.target)"
              class="ml-3 btn-red"
              variant="danger"
              >Delete Event</b-button
            >
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "/src/helpers/listUrl.js";

export default {
  name: "list-event-table",
  props: {
    baseUrl: {
      type: String,
      default: process.env.VUE_APP_BACKEND_BASE_URL,
    },
    fields: {
      type: Array,
      default: () => {
        return [
          "event_name",
          "event_date",
          "participant_total",
          "event_desc",
          "twibbon_template",
          { key: "id_event", label: "Actions" },
        ];
      },
    },
    initialItems: Array,
  },
  data() {
    return {
      items: this.initialItems,
      API_URL,
    };
  },
  created() {
    this.items = this.$props.initialItems.map((item) => {
      const tanggal = new Date(item.tanggal_event).toLocaleDateString("fr-CA");
      return {
        event_name: item.nama_event,
        event_date: tanggal,
        participant_total: item.jumlah_anggota,
        event_desc: item.deskripsi_event,
        twibbon_template: item.template_twibbon,
        id_event: item.id,
        campaignerId: item.campaignerId,
      };
    });
  },
  methods: {
    toAddEvent() {
      this.$router.push({ name: "createEvent" });
    },

    toEditEvent(id_event) {
      this.$router.push({ name: "editEvent", params: { id: id_event } });
    },

    toViewParticipant(eventId) {
      this.$router.push({
        name: "view-event-participant",
        params: { eventId },
      });
    },

    async deleteEvent(id_event) {
      const config = {
        method: "DELETE",
        url: this.API_URL.deleteEvent + id_event,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
      };

      try {
        await axios(config);
        this.messageHelpers.success("Data has been deleted");
        this.$emit("eventDeleted", id_event);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
