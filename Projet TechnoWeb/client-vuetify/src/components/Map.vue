<template>
  <l-map
    id="map"
    :center="center"
    :zoom="zoom"
    class="map"
    ref="map"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
  >
    <l-tile-layer :url="url"> </l-tile-layer>
    <div v-if="this.markers.length!=0">
    <l-marker v-for="m in markers" :key="m.id" :lat-lng="m.coordinate">
      <l-icon :icon-anchor="staticAnchor">
        <img src="../assets/marker.png" />
      </l-icon>
      <l-popup>
        <a id="popup" @click=" redirectDetails(m)">{{ m.name }}!</a>
      </l-popup>
    </l-marker>
     </div>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: {
    coordinates:[], // en reprend toute les coordonné utile du restaurant
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
  },
  data: () => ({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    center: [1,2],
    zoom: 5,
    staticAnchor: [16, 37],
    markers: [],
  }),
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    createdCenter(){
      this.center=this.markers[0].coordinate;
    },
    createMarkers() {
      // c'est ici quand prend tout les données du marker
      this.coordinates.forEach((coord) => {
        console.log(coord);
        this.markers.push({
          _id: coord._id,
          address : coord.address,
          coordinate: [coord.address.coord[1], coord.address.coord[0]],
          name: coord.name,
          borough:coord.borough,
          cuisine:coord.cuisine,
          grades:coord.grades,
          restaurant_id: coord.restaurant_id,
        });
      });
      //this.createdCenter()
      
    },
     redirectDetails(r) {
        if (this.$store.state.pageActive != "detailrestaurant") {
       this.$store.commit("SetpageActive", "detailrestaurant");
      return this.$router.push({
        name: "detailRestaurant",
        params: { id: r._id, restaurant: r },
      });
        }
    },

    
  },
 beforeUpdate() {
  
    // Code that will run only after the
    // entire view has been re-rendered
    this.createdCenter()
},
  created() {
     this.createMarkers();
     if (this.markers.length ==1){
       this.createdCenter()
     }
      //this.createdCenter()
  },

  watch: {
    coordinates() {
      this.markers = []; // remise a zero des coordonnées
      this.createMarkers();
        this.createdCenter();
      
    },
  },
};
</script>

<style>
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
img {
  width: 30px;
  height: 30px;
}
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
  margin-bottom: 47px;
}
#popup {
  color: #1e1e1e;
}
</style>