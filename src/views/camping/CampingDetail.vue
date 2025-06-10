<template>
  <div
    class="w-full min-h-screen bg-white border-l border-r border-gray-200 relative z-20 transition-colors duration-300 md:w-[500px] md:mx-auto 2xl:w-[500px] 2xl:mx-auto"
  >
    <div class="w-full h-[400px] relative">
      <div class="w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="w-full h-full object-cover rounded-b-[20px]"
        />
      </div>
      <div class="absolute top-[20px] left-[20px] z-10">
        <img
          src="../../assets/icons/light/light-back-button.svg"
          alt=""
          class="w-[60px] h-[60px] cursor-pointer"
        />
      </div>
      <div
        class="absolute bottom-0 right-0 z-10 bg-[#4B3C2F] w-[100px] h-[40px] flex items-center justify-center gap-2 rounded-br-[20px] rounded-tl-[20px]"
      >
        <span class="text-white text-sm font-bold">4.8</span>
        <img src="../../assets/icons/star-filled.svg" alt="" class="w-[20px] h-[20px]" />
      </div>
    </div>
    <div class="w-full relative">
      <div class="m-[10px] p-[20px]">
        <div class="flex items-center gap-2">
          <img src="../../assets/icons/light/light-bookmark-filled.svg" alt="" />
          <span class="text-md opacity-50">글램핑</span>
        </div>
        <div class="flex items-center justify-between gap-2 mt-[10px]">
          <span class="text-[20px] font-bold">포천 썬오브 글램핑카라반</span>
          <div class="flex items-center gap-4">
            <img
              src="../../assets/icons/light/light-caravan-off.svg"
              alt=""
              class="w-[24px] h-[24px]"
            />
            <img
              src="../../assets/icons/light/light-trailer-on.svg"
              alt=""
              class="w-[24px] h-[24px]"
            />
            <img src="../../assets/icons/light/light-pet-on.svg" alt="" class="w-[24px] h-[24px]" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-around gap-4 border-b border-b-[#4B3C2F50] p-[20px]">
      <a href="#basic-info" class="text-md text-[#222222]">기본 정보</a>
      <a href="#camping-intro" class="text-md text-[#22222230]">캠핑장 소개</a>
      <a href="#location-info" class="text-md text-[#22222230]">위치 정보</a>
      <a href="#review" class="text-md text-[#22222230]">리뷰</a>
    </div>
    <div id="basic-info" class="w-full relative">
      <div class="m-[10px] p-[20px] flex flex-col gap-2">
        <div class="flex items-center justify-start gap-12">
          <span class="text-[#A8AEB2] w-[65px]">환경</span>
          <span class="text-[#222222]">숲</span>
        </div>
        <div class="flex items-center justify-start gap-12">
          <span class="text-[#A8AEB2] w-[65px]">사업주체</span>
          <span class="text-[#222222]">민간</span>
        </div>
        <div class="flex items-center justify-start gap-12">
          <span class="text-[#A8AEB2] w-[65px]">운영기간</span>
          <span class="text-[#222222]">봄,여름,가을,겨울</span>
        </div>
        <div class="flex items-center justify-start gap-12">
          <span class="text-[#A8AEB2] w-[65px]">운영일</span>
          <span class="text-[#222222]">평일+주말</span>
        </div>
        <div class="flex items-center justify-start gap-12">
          <span class="text-[#A8AEB2] w-[65px]">예약 방법</span>
          <span class="text-[#222222]">온라인실시간예약</span>
        </div>
        <div class="flex items-center justify-start gap-12">
          <span class="text-[#A8AEB2] w-[65px]">화로대</span>
          <span class="text-[#222222]">개별</span>
        </div>
      </div>
    </div>
    <hr class="mx-5 border-b border-b-[#4B3C2F50]" />
    <div class="w-full relative">
      <div class="m-[10px] p-[20px]">
        <span class="text-[#222222] text-md font-bold">부대시설</span>
        <div class="flex items-center justify-between gap-2 mt-[30px]">
          <div class="w-[60px] flex items-center justify-center flex-col gap-2">
            <img src="../../assets/icons/light/amenity/light-amenity-electric.svg" alt="" />
            <span>전기</span>
          </div>
          <div class="w-[60px] flex items-center justify-center flex-col gap-2">
            <img src="../../assets/icons/light/amenity/light-amenity-pool.svg" alt="" />
            <span>물놀이장</span>
          </div>
          <div class="w-[60px] flex items-center justify-center flex-col gap-2">
            <img src="../../assets/icons/light/amenity/light-amenity-playground.svg" alt="" />
            <span>놀이터</span>
          </div>
          <div class="w-[60px] flex items-center justify-center flex-col gap-2">
            <img src="../../assets/icons/light/amenity/light-amenity-trampoline.svg" alt="" />
            <span>트렘폴린</span>
          </div>
          <div class="w-[60px] flex items-center justify-center flex-col gap-2">
            <img src="../../assets/icons/light/amenity/light-amenity-gym.svg" alt="" />
            <span>운동시설</span>
          </div>
        </div>
      </div>
    </div>
    <hr class="mx-5 border-b border-b-[#4B3C2F50]" />
    <div id="camping-intro">
      <div class="m-[10px] p-[20px]">
        <span class="text-[#222222] text-md font-bold">캠핑장 소개</span>
        <div class="mt-[30px]">
          수영장, 카페 등 부대시설이 알찬 곳 파크킹은 경북 김천시 어모면 중왕리에 자리 잡았다.
          김천시청을 기점으로 6km가량 떨어졌다. 자동차를 타고 어모로와 은림로를 번갈아 달리면
          닿는다. 도착까지 걸리는 시간은 10분 안팎이다. 캠핑장에는 자갈로 이뤄진 일반캠핑 사이트
          32면이 마련돼 있다. 사이트 크기는 가로 10m 세로 2m 등이다. 피크닉장도 운영 중이다.
          외부음식 가지고 입장할 수 있으며, 취사도 가능하다. 수영장, 카페, 산책로 등 부대시설도
          알차게 갖춰져 있다. 주변에는 김천자산동벽화마을이 있어 연계 여행에 나서기 편하다.
        </div>
      </div>
    </div>
    <hr class="mx-5 border-b border-b-[#4B3C2F50]" />
    <div id="location-info">
      <div class="m-[10px] p-[20px]">
        <span class="text-[#222222] text-md font-bold">위치 정보</span>
        <div class="mt-[20px] mb-[15px]">경기 성남시 분당구 불정로 6 그린팩토리</div>
        <div class="h-[365px]">
          <div id="map" class="w-full h-full"></div>
        </div>
      </div>
    </div>
    <hr class="mx-5 border-b border-b-[#4B3C2F50]" />
    <div id="review">
      <div class="m-[10px] p-[20px] mb-0 pb-0">
        <div class="text-[#222222] font-bold flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>리뷰</span>
            <span class="text-[#A8AEB2]">6</span>
          </div>
          <div class="flex items-center gap-2 cursor-pointer justify-center">
            <img src="../../assets/icons/light/light-post.svg" alt="" class="w-[20px] h-[20px]" />
            <span class="text-[#222222]">리뷰 등록하기</span>
          </div>
        </div>
      </div>
      <ReviewCard />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ReviewCard from '../../components/common/ReviewCard.vue'

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
