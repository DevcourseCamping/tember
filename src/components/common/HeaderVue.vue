<script setup>
import logo from '@/assets/icons/light/light-logo-white.svg'
</script>
<template>
  <header class="w-[500px] h-[188px] bg-[#4B3C2F] mx-auto flex flex-col items-center justify-center">
    <img :src="logo" class="w-[106px] h-[53px]" />
    <div class="w-[440px] h-[45px]">
  <input
    type="text"
    placeholder="검색하기"
    class="w-full h-full px-4 py-2 rounded-md focus:outline-none"
  />
</div>
</header>
</template>
<style scoped>
  
</style>