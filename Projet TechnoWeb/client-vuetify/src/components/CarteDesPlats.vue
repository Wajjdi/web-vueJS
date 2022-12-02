<template>
<div>
<h1> La Carte</h1>
 <p>Entrer : {{carte[nbentrer].entrer}}  </p>
  <p> Plat : {{carte[nbplat].plat}} </p>
   <p>Dessert : {{carte[nbdessert].dessert}} </p>
</div>
</template>




<script>


export default {
  name: "CarteDesplats",

  components: {
  },

  data: () => ({
    //
    nbentrer:0,
    nbplat:0,
    nbdessert:0,
    carte: [
        {entrer: 'Terrine végétale', plat:'Cheeseburger' , dessert:'Tiramisu' },
   {entrer: 'Œufs mimosa aux œufs de saumon', plat: 'Pizza Reine', dessert:'Panna cotta' },
   {entrer: 'Éclairs aux langoustines et chantilly au wasabi', plat:'Boulettes de viande et sauce tomate', dessert:'Mousse au chocolat et mascarpone' },
   {entrer: 'Saumon gravlax maison', plat:'Échine de cochon confite au thé', dessert:'Brownies' },
   {entrer: 'Salade de crabe', plat:'Poivrons au barbecue' , dessert:'Crème au chocolat' },
    ],
  }),
   methods: {
    getRandomDessert(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
   this.nbdessert = Math.floor(Math.random() * (max - min +1)) + min;
},
getRandomPlat(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
   this.nbentrer = Math.floor(Math.random() * (max - min +1)) + min;
},
  getRandomEntrer(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
   this.nbdessert = Math.floor(Math.random() * (max - min +1)) + min;
},
   },
    created(){
  this.$store.commit("SetpageActive", "detailrestaurant");
     this.getRandomDessert(0, 4) ;
      this.getRandomPlat(0, 4) ;
       this.getRandomEntrer(0, 4) ;
  },

};
</script>
