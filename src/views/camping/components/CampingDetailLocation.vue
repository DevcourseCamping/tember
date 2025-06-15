<template>
  <div id="location-info">
    <div class="m-[10px] p-[20px]">
      <span class="text-[--black] text-md font-bold dark:text-white">위치 정보</span>
      <div class="mt-[20px] mb-[15px] dark:text-white">
        {{ campingLocation.add1 }} {{ campingLocation.add2 }}
      </div>
      <div class="h-[365px]">
        <div id="map" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const { campingLocation } = defineProps({
  campingLocation: {
    type: Object,
    required: true,
  },
})

onMounted(() => {
  initMap()
})

const initMap = () => {
  const map = new window.naver.maps.Map('map', {
    center: new window.naver.maps.LatLng(campingLocation.y, campingLocation.x),
    zoom: 15,
  })
  new window.naver.maps.Marker({
    position: new window.naver.maps.LatLng(campingLocation.y, campingLocation.x),
    map: map,
  })
}
</script>

<style lang="scss" scoped></style>
