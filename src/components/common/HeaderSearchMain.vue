<script setup>
import logo from '@/assets/icons/logo-white.svg'
import filter from '@/assets/icons/light/light-filter.svg'
import search from '@/assets/icons/light/light-search.svg'
import auto from '@/assets/icons/light/light-auto-camping-button.svg'
import glamping from '@/assets/icons/light/light-glamping-button.svg'
import caravan from '@/assets/icons/light/light-caravan-button.svg'
import pet from '@/assets/icons/light/light-pet-button.svg'
import chatbot from '@/assets/icons/chatbot-white.svg'

</script>
<template>
  <header class="w-[500px] h-[253px] bg-[#4B3C2F] mx-auto flex flex-col items-center justify-center">
    <img :src="logo" class="w-[106px] h-[53px]" />
  <div class="relative w-[440px] h-[45px] flex items-center justify-between bg-white rounded-md px-4 mt-7">
  <img :src="search" class="w-5 h-5 mr-4" />
  <input
    type="text"
    placeholder="검색하기"
    class="flex-1 h-full focus:outline-none"
  />
  <img
    :src="filter"
    class="absolute right-[25px] w-5 h-5"
  />
  </div>
  <div class="flex space-x-[54px] mt-6 w-[440px] h-[70px] mx-auto justify-center">
  <div class="flex flex-col items-center">
    <img :src="auto" class="w-[45px] h-[45px]" />
    <span class="text-xs mt-1 text-white whitespace-nowrap">오토캠핑</span>
  </div>
  <div class="flex flex-col items-center">
    <img :src="glamping" class="w-[45px] h-[45px]" />
    <span class="text-xs mt-1 text-white">글램핑</span>
  </div>
  <div class="flex flex-col items-center">
    <img :src="caravan" class="w-[45px] h-[45px]" />
    <span class="text-xs mt-1 text-white">카라반</span>
  </div>
  <div class="flex flex-col items-center">
    <img :src="pet" class="w-[45px] h-[45px]" />
    <span class="text-xs mt-1 text-white whitespace-nowrap">반려동물</span>
  </div>
  <div class="flex flex-col items-center">
    <img :src="chatbot" class="w-[45px] h-[45px]" />
    <span class="text-xs mt-1 text-white">챗봇</span>
  </div>
</div>
</header>
</template>
<style scoped>
  
</style>