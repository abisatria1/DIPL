import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Event from "../views/Event.vue"
import editEvent from "../views/editEvent.vue"
import addEvent from "../views/addEvent.vue"
import DashboardParticipant from "../views/DashboardParticipant.vue"
import dashboardCampaigner from "../views/dashboardCampaigner.vue"
import DetailEvent from "../views/detailEvent.vue"
import AllTwibbon from "../views/allTwibbon.vue"
import ViewParticipant from "../views/viewParticipant.vue"
import CampaignerUpdateProfile from "../views/campaignerUpdateProfile.vue"
import CampaignerUpdateAccount from "../views/campaignerUpdateAccount.vue"

Vue.use(VueRouter)

const baseUrl = "http://localhost:3000"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    props: {
      baseUrl,
      url: {
        login: "/api/user/login",
        my: "/api/user/my",
      },
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    props: {
      baseUrl,
      url: {
        registerCampaigner: "/api/user/register/campaigner",
        registerParticipant: "/api/user/register/participant",
      },
    },
  },

  {
    path: "/participant",
    name: "dashboard-participant",
    component: DashboardParticipant,
    props: {
      baseUrl,
      url: {},
    },
  },

  {
    path: "/participant/event/:eventId",
    name: "detail-event",
    component: DetailEvent,
  },

  {
    path: "/participant/my/twibbons",
    name: "view-all-twibbon",
    component: AllTwibbon,
  },

  {
    path: "/campaigner",
    name: "dashboard-campaigner",
    component: dashboardCampaigner,
    props: {
      baseUrl,
      url: {
        viewAllEventByCampaigner: "/api/campaigner/event",
      },
    },
  },

  {
    path: "/campaigner/event/:eventId",
    name: "view-event-participant",
    component: ViewParticipant,
  },

  {
    path: "/event",
    name: "Event",
    component: Event,
    props: {
      baseUrl,
      url: {
        viewAllEvent: "/api/campaigner/event",
      },
    },
  },
  {
    path: "/event/edit/:id",
    name: "editEvent",
    component: editEvent,
    props: {
      baseUrl,
      url: {
        viewDetailEvent: "/api/campaigner/event/",
        updateEvent: "/api/campaigner/event/",
      },
    },
  },
  {
    path: "/event/add",
    name: "createEvent",
    component: addEvent,
    props: {
      baseUrl,
      url: {
        createEvent: "/api/campaigner/event",
      },
    },
  },
  {
    path: "/campaigner/profile",
    name: "campaigner-update-profile",
    component: CampaignerUpdateProfile,
  },
  {
    path: "/campaigner/account",
    name: "campaigner-update-account",
    component: CampaignerUpdateAccount,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
