<template>
  <b-card
    title="Card Title"
    sub-title="Card Subtitle"
    style="max-width: 20rem;"
  >
    <b-tabs>
      <b-tab title="Tab 1">
        <b-card-text>Tab 1 Contents</b-card-text>
      </b-tab>
      <b-tab title="Tab 2">
        <b-card-text>Tab 2 Contents</b-card-text>
        <b-button
          size="md"
          variant="primary"
        >
          Button
        </b-button>
      </b-tab>
      <b-tab title="Tab 3" disabled>
        <b-card-text>Tab 3 Contents</b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  name: 'BootstrapExample'
}
</script>