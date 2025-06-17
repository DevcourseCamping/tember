<script setup>
import notfound from '@/assets/icons/light/light-404.svg'
import d_notfound from '@/assets/icons/dark/dark-404.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMain = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div
    class="max-w-[500px] mx-auto w-full h-screen bg-[var(--white)] dark:bg-[#121212] flex flex-col justify-between items-center py-10"
  >
    <div class="pt-[250px]">
      <img :src="notfound" class="w-[266px] h-[162px] block dark:hidden" />
      <img :src="d_notfound" class="w-[266px] h-[162px] hidden dark:block" />
    </div>

    <div
      class="w-full max-w-[400px] h-[60px] bg-[var(--primary)] dark:bg-[#3a3a3a] rounded-md flex items-center justify-center gap-5"
    >
      <p class="text-white text-lg cursor-pointer" @click="goToMain">Go Back Home</p>
    </div>
  </div>
</template>
<style scoped></style>
