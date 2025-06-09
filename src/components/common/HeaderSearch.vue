<script setup>
import logo from '@/assets/icons/logo-white.svg'
import filter from '@/assets/icons/light/light-filter.svg'
//import arrow from '@/assets/icons/light/light-arrow-down.svg'

</script>
<template>
  <header class="w-[500px] h-[188px] bg-[--primary] mx-auto flex flex-col items-center justify-center">
    <img :src="logo" class="w-[106px] h-[53px]" />
  <div class="relative w-[440px] h-[45px] flex items-center justify-between bg-[--white] rounded-md px-4 mt-7">
  <img src="@/assets/icons/light/light-search.svg" class="w-5 h-5 mr-4" />
  <input
    type="text"
    placeholder="검색하기"
    class="flex-1 h-full focus:outline-none"
  />
  <img
    :src="filter"
    class="absolute right-[25px] w-5 h-5"
  />
  <!--<img
    :src="arrow"
    class="absolute right-[25px] w-5 h-5"
  />-->
  </div>
</header>
</template>
<style scoped>
  
</style>