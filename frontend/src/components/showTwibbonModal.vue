<style lang="scss" scoped>
@import "@/scss/variables.scss";

#show-twibbon-modal {
  .image-wrapper {
    width: 300px !important;
    height: 300px !important;
    margin: 0 auto;
    border: 1px solid rgba(211, 211, 211, 0.548);
    padding: 10px;
    box-shadow: 0 4px 5px 2px rgba(245, 230, 230, 0.349);
    border-radius: 8px;
  }
  img {
    width: 100%;
    height: 100%;
  }

  .red-btn {
    @include button($btn-red);
  }
  .green-btn {
    @include button($btn-green);
  }

  .button-wrapper {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>

<template>
  <b-modal id="show-twibbon-modal" title="View Twibbon" :hide-footer="true">
    <div class="image-wrapper">
      <img v-bind:src="imgUrl" alt="twibbon-template" />
    </div>

    <div class="button-wrapper mt-3">
      <b-button type="button" @click="onCancel" class="ml-3 mt-3 red-btn"
        >Back</b-button
      >
    </div>
  </b-modal>
</template>

<script>
// import axios from "axios"
// import { BASE_URL, API_URL } from "../helpers/listUrl"
export default {
  name: "show-twibbon-modal",

  props: {
    show: Boolean,
    twibbon: String,
  },

  data() {
    return {
      showModal: this.$props.show,
      imgUrl: this.$props.twibbon,
    }
  },

  mounted() {
    if (this.showModal) {
      this.$bvModal.show("show-twibbon-modal")
    } else {
      this.$bvModal.hide("show-twibbon-modal")
    }
  },

  methods: {
    onCancel() {
      this.$bvModal.hide("show-twibbon-modal")
      this.$emit("showTwibbonModalClosed")
    },
  },
}
</script>
