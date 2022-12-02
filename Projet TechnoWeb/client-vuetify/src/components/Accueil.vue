<template>
  <v-app>
    <Menu />
    <v-container class="text-h5">
      Rechercher des restaurants
      <v-btn @click="searchClique">
        <v-icon color="green">
          {{ icons.mdiStoreSearch }}
        </v-icon>
      </v-btn>
    </v-container>

    <div v-if="search">
      <Recherche />
      <Ajoute />
    </div>

    <ListeRestaurant />
  </v-app>
</template>

<script>
import icons from "../assets/icons";
import Menu from "./Menu.vue";
import ListeRestaurant from "./ListeRestaurant";
import Recherche from "./Recherche";
import Ajoute from "./Ajoute";

export default {
  name: "Accueil",

  components: {
    Menu,
    Recherche,
    Ajoute,
    ListeRestaurant,
  },

  data: () => ({
    icons,
    search: false,
  }),
  

  methods: {
    searchClique() {
      if (this.search) {
        this.search = false;
      } else {
        this.search = true;
      }
    },
  },
  created(){
  this.$store.commit("SetpageActive", "accueil");
  },
};
</script>
<style >

</style>