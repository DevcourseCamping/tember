<template>
  <div id="location-info">
    <div class="m-[10px] p-[20px]">
      <span class="text-[#222222] text-md font-bold dark:text-white">위치 정보</span>
      <div class="mt-[20px] mb-[15px] dark:text-white">경기 성남시 분당구 불정로 6 그린팩토리</div>
      <div class="h-[365px]">
        <div id="map" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  initMap()
})

const initMap = () => {
  const map = new window.naver.maps.Map('map', {
    center: new window.naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 15,
  })
  new window.naver.maps.Marker({
    position: new window.naver.maps.LatLng(37.3595704, 127.105399),
    map: map,
  })
}
</script>

<style lang="scss" scoped></style>
