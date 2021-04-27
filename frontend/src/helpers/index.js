import Vue from "vue"

import messageHelpers from "@/helpers/message.js"

export default {
  install: () => {
    Vue.prototype.messageHelpers = messageHelpers
    Vue.messageHelpers = messageHelpers
  },
}
