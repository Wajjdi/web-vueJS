<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Cuisine</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <p v-if="restaurants.length == 0">No data available</p>
          <tr v-for="r in restaurants" :key="r._id" >
            <td @click="redirectDetails(r)">{{ r.name }}</td>
            <td @click="redirectDetails(r)">{{ r.cuisine }}</td>
            <td>
              <v-btn icon color="red" @click="supprimerRestaurant(r)">
                <v-icon>{{ icons.mdiDelete }}</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
       <div>
         <v-btn  class="previous round" :disabled="page === 0" @click="pagePrecedente()">&#8249;</v-btn>
        <a id='page'> {{page}} - {{nbpagetotal}}</a>
        <v-btn class="next round" :disabled="page === nbpagetotal" @click="pageSuivant()" >&#8250;</v-btn>
       </div>
      </template>
    </v-simple-table>
  </v-container>
</template>



<script>
import icons from "../assets/icons";

export default {
  name: "ListeRestaurant",
  data: () => ({
    icons,
    nom: "",
    cuisine: "",
    nbRestaurantsTotal: 0,
    page: 0,
    pageSize: 10,
    nbpagetotal: 0,
    nomRestaurantRechercher: "",
    msg: "",
    restaurants: [],
  }),
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;
      else {
        this.page--;
        this.getRestaurantsFromServer();
         console.log(this.nbpagetotal);
      }
    },
    pageSuivant() {
      if (this.page === this.nbpagetotal) return;
      else {
        this.page++;
        this.getRestaurantsFromServer();
      }
    },

    getRestaurantsFromServer() {
      // url (required), options (optional)
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.$store.state.pageSize;
      console.log(this.$store.state.pageSize);
      if (this.$store.state.pageSize != '' ){
        this.pageSize=this.$store.state.pageSize
        }
        else {
           this.pageSize=10;
        }
      
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
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;
      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.msg = res.msg;
            // on rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    
    getColor(index) {
      return index % 2 ? "white" : "LightGray";
    },

    redirectDetails(r) {
       this.$store.commit("SetpageActive", "detailrestaurant");
      return this.$router.push({
        name: "detailRestaurant",
        params: { id: r._id, restaurant: r },
      });
    },
  },

  mounted() {
    // `this` points to the vm instance
    this.getRestaurantsFromServer();
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
#page {
  color: #1e1e1e;
    margin-left: 10px;
    margin-right: 10px;
}
.v-btn:not(.v-btn--round).v-size--default{
  min-width: 36px;
}
.v-btn  {
  background-color: #ddd;
  color: black;
}
.previous {
  background-color: #f1f1f1;
  color: black;
}


.next {
  background-color: #f1f1f1;
  color: white;
}


</style>