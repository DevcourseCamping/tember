<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import close from '@/assets/icons/close-brown.svg'
import google from '@/assets/icons/light/light-google.png'
</script>
<template>
    <div class="w-[500px] h-screen bg-[var(--white)] mx-auto relative">
  <header class="w-full h-[80px] flex items-center relative">
    <img :src="close" class="w-[20px] h-[20px] absolute left-6" />
    <p class="text-lg mx-auto">로그인</p>
  </header>
  <img :src="logo" class="w-[136px] h-[64px] absolute top-[250px] left-1/2 -translate-x-1/2" />
  <div class="w-[440px] h-[60px] bg-[var(--primary)] rounded-md absolute top-[380px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-5">
    <img :src="google" class="w-[20px] h-[20px]" />
    <p class="text-sm text-white">Google</p>
  </div>
</div>
</template>
<style scoped>
  
</style>