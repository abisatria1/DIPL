import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Event from "../views/Event.vue"
import editEvent from "../views/editEvent.vue"
import addEvent from "../views/addEvent.vue"

Vue.use(VueRouter)

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
      baseUrl: "http://localhost:3000",
      url: {
        login: "/api/user/login",
      },
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    props: {
      baseUrl: "http://localhost:3000",
      url: {
        registerCampaigner: "/api/user/register/campaigner",
        registerParticipant: "/api/user/register/participant",
      },
    },
  },
  {
    path: "/event",
    name: "Event",
    component: Event,
    props: {
      baseUrl: "http://localhost:3000",
      url: {
        viewAllEvent: "/api/campaigner/event",
      },
    },
  },
  {
    path: "/event/edit/:id",
    name: "EventEdit",
    component: editEvent,
    props: {
      baseUrl: "http://localhost:3000",
      url: {
        viewDetailEvent: "/api/campaigner/event/",
        updateEvent: "/api/campaigner/event/",
      },
    },
  },
  {
    path: "/event/add",
    name: "EventAdd",
    component: addEvent,
    props: {
      baseUrl: "http://localhost:3000",
      url: {
        createEvent: "/api/campaigner/event",
      },
    },
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
