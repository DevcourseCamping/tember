<template>
  <div class="w-full h-[400px] relative">
    <div class="w-full h-full">
      <img
        src="https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        class="w-full h-full object-cover rounded-b-[20px]"
      />
    </div>
    <div class="absolute top-[20px] left-[20px] z-10">
      <img
        :src="light_back_button"
        alt=""
        class="w-[60px] h-[60px] cursor-pointer"
        @click="handleClickBackButton"
      />
    </div>
    <div
      class="absolute bottom-0 right-0 z-10 bg-[#4B3C2F] w-[100px] h-[40px] flex items-center justify-center gap-2 rounded-br-[20px] rounded-tl-[20px]"
    >
      <span class="text-white text-sm font-bold">4.8</span>
      <img :src="star_filled" alt="" class="w-[20px] h-[20px]" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import light_back_button from '../../../assets/icons/light/light-back-button.svg'
import star_filled from '../../../assets/icons/star-filled.svg'

const router = useRouter()

const handleClickBackButton = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
