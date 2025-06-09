<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import close from '@/assets/icons/close-brown.svg'
import more from '@/assets/icons/light/light-more.svg'
//import setting from '@/assets/icons/light/light-setting.svg'
</script>
<template>
  <header class="w-[500px] h-[80px] bg-[--white] mx-auto flex flex-row items-center justify-between px-6">
    <img :src="close" class="w-[20px] h-[20px]" />
    <img :src="logo" class="w-[84px] h-[43px]" />
    <!--<p class="text-lg">리뷰쓰기</p>-->
    <img :src="more" class="w-[20px] h-[20px]" />
    <!--<img :src="setting" class="w-[20px] h-[20px]" />-->
    </header>
</template>
<style scoped>
  
</style>