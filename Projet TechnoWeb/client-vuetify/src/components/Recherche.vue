<template>
  <v-container>
    <v-row class="align-center">
      <v-col cols="6">
        <v-text-field
          @input="chercherRestaurant()"
          type
          label="#Restaurant"
          v-model="nomRestaurant"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-slider
          v-model="pageSize"
          min = 10
          max = 300
          @change="chercherRestaurant()"
          thumb-label
        ></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";

export default {
  name: "Recherche",
  data: () => ({
    nomRestaurant: "",
    pageSize: "",
  }),
  methods: {
    rechercheRestaurant() {
      this.$store.commit("setNomRestaurantRecherche", this.nomRestaurant);
      this.$store.commit("setPageSize", this.pageSize);
    },
    chercherRestaurant: _.debounce(function () {
      this.rechercheRestaurant();
    }, 1000),
  },
};
</script>

<style>
.rechercheBar {
  align-items: center;
}
</style>
