<template>
    <div>
        <b-card title="Event">
            <b-button href="#" variant="primary">Add Event</b-button>
            <b-table striped hover :items="items" :fields="fields">
              <template #cell(id_event)="dataEvent">
                <b-button @click="editEvent(dataEvent.item.id_event,$event.target)" variant="warning" >Edit Event</b-button>
                <b-button @click="deleteEvent(dataEvent.item.id_event,$event.target)" variant="danger" >Delete Event</b-button>
              </template>
            </b-table>

        </b-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        fields:['nama_event','date_event','jumlah_participant',{key:'id_event',label:"Actions"}],
        items: [
          { id_event: 30, nama_event: 'Belajar Menulis Skripsi', date_event: '2021-12-05', jumlah_participant: '10' },
        ]
      }
    },
    methods: {
      editEvent(id_event) {
        console.log(id_event)
        this.$router.push({ name: 'EventEdit', params: { id:id_event } });
      },
      deleteEvent(id_event){
        alert(id_event)
      }
    }
  }
</script>