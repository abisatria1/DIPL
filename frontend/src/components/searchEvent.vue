<style lang="scss">
@import "@/scss/variables.scss";

.search-event {
  input.form-control {
    width: 100%;
    padding: 30px 15px !important;
    height: 81.6px;
    margin: auto !important;
    color: $grey-font-color;
    box-shadow: 0 3px 5px 1px rgba(201, 201, 201, 0.295);
  }
}
</style>

<template>
  <div class="search-event container">
    <form action="">
      <b-form-group>
        <b-form-input
          v-model="namaEvent"
          type="text"
          placeholder="Type event or campaign name's"
          required
          @input="onChange"
        ></b-form-input>
      </b-form-group>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import { API_URL } from "../helpers/listUrl"
export default {
  name: "SearchEvent",
  data() {
    return {
      namaEvent: "",
    }
  },

  methods: {
    async onChange() {
      try {
        const events = await this.findEvent(this.namaEvent)
        this.$emit("eventChanged", events)
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : error.message
        this.messageHelpers.error(message)
        console.log(error.response)
      }
    },

    async findEvent(nama_event) {
      const config = {
        method: "get",
        url: API_URL.searchEvent,
        params: {
          nama_event,
        },
      }

      const result = await axios(config)
      return result.data.data
    },
  },
}
</script>
