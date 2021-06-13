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
  <b-card title="Participant List">
    <b-card-text class="d-flex align-items-center justify-content-between">
      <div class="left">
        <p>
          View your event participant here, you can view their information. Use
          this information responsibly!
        </p>
      </div>
    </b-card-text>
    <b-table ref="table" striped hover :items="items" :fields="fields">
      <template #cell(twibbonId)="participant">
        <div class="button-wrapper">
          <b-button
            @click="viewTwibbon(participant.item.hasil_foto)"
            variant="info"
            class="green-btn"
            >View Twibbon</b-button
          >
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
// import axios from "axios"
// import { API_URL } from "/src/helpers/listUrl.js"

export default {
  name: "view-participant-table",
  props: {
    fields: {
      type: Array,
      default: () => {
        return [
          "no",
          "participant_name",
          "email",
          "participate_date",
          { key: "twibbonId", label: "Actions" },
        ]
      },
    },
    initialItems: Array,
  },
  data() {
    return {
      items: this.initialItems,
    }
  },
  created() {
    let i = 1
    this.items = this.$props.initialItems.map((item) => {
      const tanggal = new Date(
        item["event-participant"]["createdAt"]
      ).toLocaleDateString("fr-CA")
      return {
        no: i,
        participant_name: item.nama_participant,
        email: item.user.email,
        participate_date: tanggal,
        twibbonid: item["event-participant"]["twibbonId"],
        hasil_foto: item["event-participant"]["hasil_foto"],
      }
    })
  },
  methods: {
    viewTwibbon(url) {
      console.log({ mantap: url })
      this.$emit("showTwibbonModal", url)
    },
  },
}
</script>
