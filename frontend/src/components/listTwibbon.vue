<style lang="scss">
@import "@/scss/variables.scss";

.list-twibbon {
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
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
  <div class="list-twibbon container">
    <hr />
    <div class="wrapper" id="wrapper">
      <div class="text-center" v-bind:class="{ 'd-none': isHideSpinner }">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL, BASE_URL } from "../helpers/listUrl";
export default {
  name: "list-twibbon",

  props: ["listTwibbons"],

  data() {
    return {
      isHideSpinner: true,
      twibbons: this.$props.listTwibbons || [],
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      this.isHideSpinner = false;
      try {
        let twibbons = this.twibbons;
        if (!twibbons.length) {
          twibbons = await this.getAllTwibbons();
        }

        const wrapper = document.getElementById("wrapper");
        wrapper.innerHTML = "";
        this.appendAllTwibbons(twibbons);
        this.isHideSpinner = true;
      } catch (error) {
        this.isHideSpinner = true;
        const message = error.response
          ? error.response.data.message
          : error.message;
        this.messageHelpers.error(message);
        console.log(error.response);
      }
    },
    async getAllTwibbons() {
      const config = {
        method: "get",
        url: API_URL.viewAllTwibbon,
        headers: {
          Authorization: this.$session.get("jwtToken"),
        },
      };
      const { data } = await axios(config);
      const twibbons = data.data;
      return twibbons;
    },

    async appendAllTwibbons(twibbons) {
      const wrapper = document.getElementById("wrapper");
      console.log({ wrapper });
      twibbons.forEach((event) => {
        const cardItem = document.createElement("div");
        cardItem.className = "card-item";
        cardItem.addEventListener("click", () => {
          this.handleItemClick(event.id);
        });

        const templateTwibbon = document.createElement("img");
        templateTwibbon.src = `${BASE_URL}/${event["event-participant"]["hasil_foto"]}`;
        templateTwibbon.alt = event.nama_event;

        const judul = document.createElement("div");
        judul.className = "judul";

        const judulText = document.createElement("h5");
        judulText.textContent = event.nama_event;
        judul.appendChild(judulText);

        const deskripsi = document.createElement("div");
        deskripsi.className = "deskripsi";

        const deskripsiText = document.createElement("p");
        deskripsiText.textContent = event.deskripsi_event;
        deskripsi.appendChild(deskripsiText);

        cardItem.appendChild(templateTwibbon);
        cardItem.appendChild(judul);
        cardItem.appendChild(deskripsi);

        wrapper.appendChild(cardItem);
      });
    },

    handleItemClick(eventId) {
      this.$router.push({ name: "detail-event", params: { eventId } });
    },
  },
};
</script>
