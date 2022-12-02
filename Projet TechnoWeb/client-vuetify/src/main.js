import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

// ----- ICONS ---- //

//import Recherche from './components/Recherche.vue'
//import Menu from "./components/Menu.vue";
import Localisation from "./components/Localisation.vue";
import Accueil from "./components/Accueil.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue"
Vue.use(VueRouter)

const routes = [
  { name: "localisation", path: '/localisation', component: Localisation },
  { name: "accueil", path: '/', component: Accueil },
  { name: "detailRestaurant", path: "/restaurants/?:id", component: RestaurantDetail, props: true }
]

// 3. Create the router instance and pass the routes option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  
  routes, // short for routes: routes
  mode: 'history'
})


Vue.use(Vuex)
// ------ STORE -------- //
const store = new Vuex.Store({
  state: {
    pageActive:'',
    nomRestaurantRecherche: '',
    pageSize: '',
    restaurantActive : null,
  },
  getters: {

  },
  mutations: {
    setNomRestaurantRecherche(state, nvNomRestaurant) {
      this.state.nomRestaurantRecherche = nvNomRestaurant
    },
    setPageSize(state, nvPage) {
      this.state.pageSize = nvPage
    },
    setRestaurantActive(state,nvRestaurantActive){
      this.state.restaurantActive = nvRestaurantActive
    },
    SetpageActive(state,nvPageActive){
      this.state.pageActive = nvPageActive
    }
  }
})

Vue.config.productionTip = false
new Vue({
  vuetify,
  store: store,
  router,
  render: h => h(App),
}).$mount('#app')
