const BASE_URL = "http://localhost:3000"
const API_URL = {
  login: "/api/user/login",
  my: "/api/user/my",
  registerCampaigner: "/api/user/register/campaigner",
  registerParticipant: "/api/user/register/participant",
  viewAllEventByCampaigner: "/api/campaigner/event",
  viewDetailEvent: "/api/campaigner/event/",
  updateEvent: "/api/campaigner/event/",
  createEvent: "/api/campaigner/event",
  deleteEvent: "/api/campaigner/event/",
  updateTemplateTwibbon: "/api/campaigner/event/template/",
  viewDetailEventByCampaigner: "/api/event/",
  createTwibbon: "/api/participant/twibbon/",
  viewTwibbon: "/api/participant/twibbon/",
  deleteTwibbon: "/api/participant/twibbon/",
  viewAllEvent: "/api/event",
  searchEvent: "/api/event/search",
}

for (const property in API_URL) {
  const url = API_URL[property]
  API_URL[property] = BASE_URL + url
}

export { API_URL, BASE_URL }
