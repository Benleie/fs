import Vue from "vue"
import VueRouter from "vue-router"
const Layout = () => import('./components/home/layout.vue')
Vue.use(VueRouter)

const constantRoutes = [
  {
    path: "/login", name: "login", component: () => import("./components/login.vue"),
  },
  { path: "/login/findPwd", component: () => import("./components/welcome/findPwd.vue") },
  { path: "/", redirect: "/welcome" },
  { path: "/welcome", component: () => import('./components/welcome/welcome.vue') },
  { path: "/signup", component: () => import('./components/welcome/signup.vue') },
  { path: "/home", component: Layout, redirect: "/home/resource", children: [
    { path:"/home/home", component:() => import('./components/home/home.vue') },
    { path: "/home/manager", component:() => import('./components/home/manager.vue') },
    { path: "/home/deleter", component:() => import('./components/home/deleter.vue') },
    { path: "/home/show", component:() => import('./components/home/quanjingku.vue') },
    { path: "/home/resource", component:() => import('./components/home/sucaiku.vue') },
  ]},
  { path: "/hello", component: () => import('./components/HelloWorld.vue') },
  { path: "/todo", component: () => import('./components/todo/todo.vue') },
  { path: "/counter", component: () => import('./demo/countMoney.vue') }
]

const createRouter = () => new VueRouter({
  routes: constantRoutes,
  mode: "history"
})
const router = createRouter()
/* 
router.beforeEach((to, from, next) => {
    console.log(from.fullPath);
    // console.log(to.fullPath);
    next();

    let isNotHome = false
        || to.name == "login"
        || to.path === "/welcome"
        || to.path === "/signup"
        || to.path === "/login/findPwd"
    // token exists？
    if(localStorage.getItem('loginToken')){
        console.log("from where: " + from.name)
        if(isNotHome){
            // console.log("already log in!")
            // console.log("from where: " + from.name)
            next({ path: "/home" } );
        } else {
            next();
        }
    } else {
        if(isNotHome)
            next()
        else {
            console.log("Please log in")
            next({
                name:'login'
            })
        }
    }
}); 
*/
export default router