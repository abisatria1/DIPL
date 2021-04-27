import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Event from "../views/Event.vue"
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
  },
  {
    path: "/event/add",
    name: "EventAdd",
    component: addEvent,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
