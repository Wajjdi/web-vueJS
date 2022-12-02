<template>
  <v-container>
    Nouveau restaurant :
    <v-row class="align-center">
      <v-col cols="5.5">
        <v-text-field label="#Restaurant" v-model="nom"> </v-text-field>
      </v-col>
      <v-col cols="5.5">
        <v-text-field label="#Cuisine" v-model="cuisine"> </v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn @click="ajouterRestaurant">
          <v-icon>
            {{ icons.mdiHomePlus }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import icons from "../assets/icons";
export default {
  name: "Ajoute",
  data: () => ({
    icons,
    nom: "",
    cuisine: "",
  }),
  methods: {
    ajouterRestaurant(event) {
      event.preventDefault();

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement


      let formData = new FormData()
      formData.append("nom", this.nom)
      formData.append("cuisine", this.cuisine)
      console.log(formData)
      

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            // Maintenant res est un vrai objet JavaScript
            this.msg = res.msg;
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      this.nom = "";
      this.cuisine = "";
    },
  },
};
</script>