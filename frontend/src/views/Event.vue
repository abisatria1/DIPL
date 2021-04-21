<template>
    <div>
        <b-card title="Event">
            <b-button href="#" variant="primary">Add Event</b-button>
            <b-table striped hover :items="items"></b-table>
              <template #cell(show_details)>
                 <b-button v:on-click="row" variant="primary">Add Event</b-button>
                  
              </template>

        </b-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        fields:['id_event','nama_event','date_event','jumlah_participant'],
        items: [
          { id_event: 40, nama_event: 'Dickerson', date_event: 'Macdonald', jumlah_participant: 'Macdonald' },
        ]
      }
    }
  }
</script>