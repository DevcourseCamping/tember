<script setup>
import notfound from '@/assets/icons/light/light-404.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMain = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div
    class="max-w-[500px] mx-auto w-full h-screen bg-[var(--white)] flex flex-col justify-between items-center py-10"
  >
    <div class="pt-[250px]">
      <img :src="notfound" class="w-[266px] h-[162px]" />
    </div>

    <div
      class="w-full max-w-[400px] h-[60px] bg-[var(--primary)] rounded-md flex items-center justify-center gap-5"
    >
      <p class="text-white text-lg cursor-pointer" @click="goToMain">Go Back Home</p>
    </div>
  </div>
</template>
<style scoped></style>
