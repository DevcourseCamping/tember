<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import google from '@/assets/icons/light/light-google.png'
import HeaderSimple from '@/components/common/HeaderSimple.vue'
</script>
<template>
  <div class="w-[500px] h-screen bg-[var(--white)] mx-auto relative">
    <HeaderSimple title="로그인" />
    <img :src="logo" class="w-[136px] h-[64px] absolute top-[250px] left-1/2 -translate-x-1/2" />
    <div
      class="w-[440px] h-[60px] bg-[var(--primary)] rounded-md absolute top-[380px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-5"
    >
      <img :src="google" class="w-[20px] h-[20px]" />
      <p class="text-sm text-white">Google</p>
    </div>
  </div>
</template>
<style scoped></style>
