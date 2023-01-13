<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Search / Results -->
    <div
      class="z-20 flex justify-center relative
      bg-hero-pattern bg-cover px-4 pt-8 pb-32">
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
        <div class="flex">
          <input
            v-model="queryIp"
            class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none"
            type="text"
            placeholder="Search for any IP address or leave empty to get your ip info"
          />
        <i 
        @click="getIpInfo"
        class="cursor-pointer bg-black text-white px-4
            rounded-tr-md rounded-br-md
            flex items-center justify-center
            fas fa-chevron-right"></i>
        </div>
      </div>
      <!-- IP Info -->
      <IpInfo v-if="ipInfo" :ipInfo="ipInfo" />
    </div>

    <!-- Map -->
    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
import IpInfo from "../components/IpInfo.vue";
import leaflet from "leaflet"; 
import { onMounted,ref } from "vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    IpInfo
  },
  setup() {
    const VITE_mapbox_api_token = import.meta.env.VITE_mapbox_api_key;
    const VITE_GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
    let myMap;
    const queryIp = ref("");
    const ipInfo=ref(null)
    const getIpInfo = async () => {
      try {
        const response = await axios.get(
          `https://geo.ipify.org/api/v2/country?apiKey=${VITE_GEO_API_KEY}&ipAddress=${queryIp.value}`
        );
        ipInfo.value = {
          ipAdress:response.data.ip,
          address:response.data.location.region,
          timezone:response.data.location.timezone,
          isp:response.data.isp,
          lat:response.data.location.lat,
          lng:response.data.location.lng
        };
        // console.log(ipInfo.value.la,ipInfo.value.lng);
        // leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(myMap);
        // myMap.setView([ipInfo.value.lat, ipInfo.value.lng], 12);
      }
      catch (error) {
        console.log(error);
      }
    }
    // console.log(getIpInfo)
    onMounted(() => {
      myMap = leaflet.map("mapid").setView([51.505, -0.09], 13);
      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${VITE_mapbox_api_token}`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:`${VITE_mapbox_api_token}`
          }
        )
        .addTo(myMap);
    });
    return {
      queryIp,
      ipInfo,
      getIpInfo,
    }
  
  }
  
}
</script>