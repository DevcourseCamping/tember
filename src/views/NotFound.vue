<script setup>
import notfound from '@/assets/icons/light/light-404.svg'
</script>
<template>
    <div class="w-[500px] h-screen bg-[var(--white)] mx-auto relative">
  <img :src="notfound" class="w-[266px] h-[162px] absolute top-[250px] left-1/2 -translate-x-1/2" />
  <div class="w-[440px] h-[60px] bg-[var(--primary)] rounded-md absolute top-[640px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-5">
    <p class="text-white text-sm">Go Back Home</p>
  </div>
</div>
</template>
<style scoped>
  
</style>