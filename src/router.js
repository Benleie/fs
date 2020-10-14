import Vue from "vue"
import VueRouter from "vue-router"
const Layout = () => import('./components/home/layout.vue')
Vue.use(VueRouter)

const constantRoutes = [
  {
    path: "/login", name: "login", component: () => import("./components/login.vue"),
  },
  { path: "/", redirect: "login" },
  { path: "/home", component: Layout, redirect: "/home/home", children: [
    { path:"/home/home", component:() => import('./components/home/home.vue') },
    { path: "/home/manager", component:() => import('./components/home/manager.vue') },
    { path: "/home/deleter", component:() => import('./components/home/deleter.vue') },
    { path: "/home/show", component:() => import('./components/home/quanjingku.vue') },
    { path: "/home/resource", component:() => import('./components/home/sucaiku.vue') },
  ]},
  { path: "/hello", component: () => import('./components/HelloWorld.vue') }
]

const createRouter = () => new VueRouter({
  routes: constantRoutes,
  mode: "history"
})
const router = createRouter()
export default router