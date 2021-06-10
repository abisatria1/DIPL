<style lang="scss">
@import "@/scss/variables.scss";

.container.no-event {
  .no-event-wrapper {
    padding-top: 100px;
    text-align: center;
  }
  img {
    width: 400px;
    height: 300px;
  }
  h1 {
    font-size: 28px;
  }

  .custom-btn {
    background-color: $secondary-color;
    padding: 12px !important;
    margin: auto !important;
    font-weight: $medium-font-weight;
    font-size: 16px;
    width: 200px;
    color: white;
    border: none;
    border-radius: 10px;
  }
}
</style>

<template>
  <div class="container no-event">
    <div class="no-event-wrapper">
      <img src="../assets/no-event.svg" alt="no event found" />
      <h1 class="mt-2">You dont have any campaign</h1>
      <button class="custom-btn" @click="goToCreateEvent">
        Start Campaign Here
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "no-event",
  methods: {
    goToCreateEvent() {
      this.$router.push({ name: "createEvent" })
    },
  },
}
</script>
