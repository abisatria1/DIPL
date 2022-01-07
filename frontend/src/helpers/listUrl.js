const BASE_URL = process.env.VUE_APP_BACKEND_BASE_URL;
const API_URL = {
  login: "/api/user/login",
  my: "/api/user/my",
  registerCampaigner: "/api/user/register/campaigner",
  registerParticipant: "/api/user/register/participant",
  viewAllEventByCampaigner: "/api/campaigner/event",
  viewDetailEventByCampaigner: "/api/campaigner/event/",
  viewEventParticipant: "/api/campaigner/event/participant/",
  updateEvent: "/api/campaigner/event/",
  createEvent: "/api/campaigner/event",
  deleteEvent: "/api/campaigner/event/",
  updateTemplateTwibbon: "/api/campaigner/event/template/",
  viewDetailEvent: "/api/event/",
  createTwibbon: "/api/participant/twibbon/",
  viewTwibbon: "/api/participant/twibbon/",
  deleteTwibbon: "/api/participant/twibbon/",
  viewAllEvent: "/api/event",
  searchEvent: "/api/event/search",
  viewAllTwibbon: "/api/participant/twibbon",
  campaignerUpdateProfile: "/api/campaigner/update/profile",
  updateEmail: "/api/user/update/email",
  updatePassword: "/api/user/update/password",
  participantUpdateProfile: "/api/participant/update/profile",
};

for (const property in API_URL) {
  const url = API_URL[property];
  API_URL[property] = BASE_URL + url;
}

export { API_URL, BASE_URL };
