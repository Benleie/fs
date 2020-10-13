import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: "/login", name: "login", component: () => import("./components/login.vue"),
  },
  { path: "/", redirect: "login" },
  { path:"/home", name:"home", component:() => import('./components/home.vue') },
  { 
    path: "/hello", 
    name: 'hello', 
    component: () => import('./components/HelloWorld.vue') 
  }
]

const createRouter = () => new VueRouter({
  routes: constantRoutes,
  mode: "history"
})
const router = createRouter()
export default router