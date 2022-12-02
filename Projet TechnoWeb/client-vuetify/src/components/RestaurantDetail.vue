<template>
  <div>
    <Menu />
    <v-container>
      <v-card elevation="5" class="textalign-center">
        <v-row>
          <div class="text-h1">{{ restaurant.name }}</div>
          <div>
            <v-icon>{{ icons.mdiSilverwareForkKnife }}</v-icon>
            {{ restaurant.cuisine }}
            <span v-for="(star,i) in 5" :key="i">
          <v-icon v-if="i<averageScore" color="yellow">{{icons.mdiStar}}</v-icon>
          <v-icon v-else color="grey">{{icons.mdiStar}}</v-icon>
        </span>
          </div>
          <div>
            <v-icon>{{ icons.mdiStoreMarker }}</v-icon>
            {{ restaurant.address.building }} {{ restaurant.address.street }}
            {{ restaurant.address.zipcode }}, {{ restaurant.borough }}
          </div>
        </v-row>
      </v-card>
    </v-container>
    <br />
  
    
    <v-container>
       <CarteRestau/>
    </v-container>
    <v-container>
       <img v-bind:src="'https://loremflickr.com/1024/576/food,street,restaurant,cafe&id='+ item_id" alt="photoRestaurant" style="width:50%;height:50%;">
    </v-container>
    <v-container>
      <Map
        :coordinates="[restaurant]"
      />
    </v-container>
     
  </div>
</template>

<script>
import icons from "../assets/icons";
import Menu from "./Menu.vue";
import Map from "./Map.vue";
import CarteRestau from "./CarteDesPlats.vue"

export default {
  name: "RestaurantDetail",

  data() {
    return {
      icons,
      item_id:null,
    };
  },

  components: {
    Menu,
    Map,
    CarteRestau
  },

  props: {
    id: String,
    restaurant: null,
  },

  methods: {
     getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
   this.item_id = Math.floor(Math.random() * (max - min +1)) + min;
},
},

  computed: {
    averageScore: function () {
      let grades = this.restaurant.grades;
      let score = 0;
      grades.forEach((g) => {
        score += g.score;
      });
      let scoreAv = score / grades.length;
      return Math.round(scoreAv / 4);
    },
  },

  mounted() {
    console.log(this.restaurant);
  },
  created(){
  this.$store.commit("SetpageActive", "detailrestaurant");
     this.getRandomIntInclusive(0, 100) ;
  },
};
</script>
