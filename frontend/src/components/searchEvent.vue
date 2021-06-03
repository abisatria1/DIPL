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
        ></b-form-input>
      </b-form-group>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchEvent",
  data() {
    return {
      namaEvent: "",
    }
  },
}
</script>
