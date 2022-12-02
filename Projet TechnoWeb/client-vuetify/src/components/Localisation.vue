<template>
  <v-app>
    <Menu />
        <v-container>
    <Recherche />
    </v-container>
     <v-container>

    <Map class="map"     :coordinates="this.restaurants" />
 </v-container>
  </v-app>
</template>

<script>
import Menu from "./Menu.vue";
import Recherche from "./Recherche.vue";
import Map from "./Map.vue";

export default {
  name: "Localisation",

  components: {
    Menu,
    Recherche,
    Map,
  },

  data: () => ({
    nom: "",
    cuisine: "",
    nbRestaurantsTotal: 0,
    page: 0,
    pageSize: 10,
    nbpagetotal: 0,
    nomRestaurantRechercher: "",
    msg: "",
    restaurants: [],
    coords: [],
  }),

  methods: {
    getRestaurantsFromServer() {
        this.coords = []// remise a zero des coordonnées
      // url (required), options (optional)
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.$store.state.pageSize;
      url += "&name=" + this.$store.state.nomRestaurantRecherche;
      fetch(url, {
        method: "get",
      })
        .then((res) => {
          // arrow functions, conserve le bon "this"
          res.json().then((res) => {
            this.restaurants = res.data;
            this.nbRestaurantsTotal = res.count;
            this.nbpagetotal = Math.round(
              this.nbRestaurantsTotal / this.pageSize
            );
            this.restaurants.forEach((r) => {
              this.coords.push(r.address.coord);
            });
            //console.log(this.coords);
            
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getRestaurantsFromServer();
  },
  created(){
  this.$store.commit("SetpageActive", "localisation");
  },

  watch: {
    // watcher sur le nom du restaurant recherché en store
    "$store.state.nomRestaurantRecherche": function () {
      this.getRestaurantsFromServer();
    },
    "$store.state.pageSize": function () {
      this.getRestaurantsFromServer();
    },
  },
};
</script>

<style >
#map {
 width: 65%;
  height: 60%;
}
</style>
