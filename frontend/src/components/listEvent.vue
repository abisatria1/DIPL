<style lang="scss">
@import "@/scss/variables.scss";

.list-event {
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }

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
}
</style>

<template>
  <div class="list-event container">
    <br />
    <hr />
    <div class="wrapper">
      <div class="card-item">
        <img src="../assets/killer.jpg" alt="killer" />
        <div class="judul">
          <h5>Ini Judul Event</h5>
        </div>
        <div class="deskripsi">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo a cumque perferendis saepe ullam ab repudiandae temporibus quia
            distinctio explicabo dolore suscipit, odit iste veniam magnam
            impedit ratione architecto.
          </p>
        </div>
      </div>
      <div class="card-item">
        <img src="../assets/killer.jpg" alt="killer" />
        <div class="judul">
          <h5>Ini Judul Event</h5>
        </div>
        <div class="deskripsi">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo a cumque perferendis saepe ullam ab repudiandae temporibus quia
            distinctio explicabo dolore suscipit, odit iste veniam magnam
            impedit ratione architecto.
          </p>
        </div>
      </div>
      <div class="card-item">
        <img src="../assets/killer.jpg" alt="killer" />
        <div class="judul">
          <h5>Ini Judul Event</h5>
        </div>
        <div class="deskripsi">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo a cumque perferendis saepe ullam ab repudiandae temporibus quia
            distinctio explicabo dolore suscipit, odit iste veniam magnam
            impedit ratione architecto.
          </p>
        </div>
      </div>
      <div class="card-item">
        <img src="../assets/killer.jpg" alt="killer" />
        <div class="judul">
          <h5>Ini Judul Event</h5>
        </div>
        <div class="deskripsi">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo a cumque perferendis saepe ullam ab repudiandae temporibus quia
            distinctio explicabo dolore suscipit, odit iste veniam magnam
            impedit ratione architecto.
          </p>
        </div>
      </div>
      <div class="card-item">
        <img src="../assets/killer.jpg" alt="killer" />
        <div class="judul">
          <h5>Ini Judul Event</h5>
        </div>
        <div class="deskripsi">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo a cumque perferendis saepe ullam ab repudiandae temporibus quia
            distinctio explicabo dolore suscipit, odit iste veniam magnam
            impedit ratione architecto.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListEvent",
  props: {
    listEvent: Array,
  },
}
</script>
