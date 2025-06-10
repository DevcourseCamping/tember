<template>
  <div id="basic-info" class="w-full relative">
    <div class="m-[10px] p-[20px] flex flex-col gap-2">
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">환경</span>
        <span class="text-[#222222] dark:text-white">숲</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">사업주체</span>
        <span class="text-[#222222] dark:text-white">민간</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">운영기간</span>
        <span class="text-[#222222] dark:text-white">봄,여름,가을,겨울</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">운영일</span>
        <span class="text-[#222222] dark:text-white">평일+주말</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">예약 방법</span>
        <span class="text-[#222222] dark:text-white">온라인실시간예약</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">화로대</span>
        <span class="text-[#222222] dark:text-white">개별</span>
      </div>
    </div>
  </div>
  <hr class="mx-5 border-b border-b-[#4B3C2F50]" />
  <div class="w-full relative">
    <div class="m-[10px] p-[20px]">
      <span class="text-[#222222] dark:text-white text-md font-bold">부대시설</span>
      <div class="flex items-center justify-between gap-2 mt-[30px]">
        <div class="w-[60px] flex items-center justify-center flex-col gap-2">
          <img :src="light_amenity_electric" alt="" />
          <span class="text-[#222222] dark:text-white">전기</span>
        </div>
        <div class="w-[60px] flex items-center justify-center flex-col gap-2">
          <img :src="light_amenity_pool" alt="" />
          <span class="text-[#222222] dark:text-white">물놀이장</span>
        </div>
        <div class="w-[60px] flex items-center justify-center flex-col gap-2">
          <img :src="light_amenity_playground" alt="" />
          <span class="text-[#222222] dark:text-white">놀이터</span>
        </div>
        <div class="w-[60px] flex items-center justify-center flex-col gap-2">
          <img :src="light_amenity_trampoline" alt="" />
          <span class="text-[#222222] dark:text-white">트렘폴린</span>
        </div>
        <div class="w-[60px] flex items-center justify-center flex-col gap-2">
          <img :src="light_amenity_gym" alt="" />
          <span class="text-[#222222] dark:text-white">운동시설</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import light_amenity_electric from '../../../assets/icons/light/amenity/light-amenity-electric.svg'
import light_amenity_pool from '../../../assets/icons/light/amenity/light-amenity-pool.svg'
import light_amenity_playground from '../../../assets/icons/light/amenity/light-amenity-playground.svg'
import light_amenity_trampoline from '../../../assets/icons/light/amenity/light-amenity-trampoline.svg'
import light_amenity_gym from '../../../assets/icons/light/amenity/light-amenity-gym.svg'
</script>

<style lang="scss" scoped></style>
