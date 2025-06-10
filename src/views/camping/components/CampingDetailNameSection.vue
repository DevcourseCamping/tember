<template>
  <div class="w-full relative">
    <div class="m-[10px] p-[20px]">
      <div class="flex items-center gap-2">
        <img src="../../../assets/icons/light/light-bookmark-filled.svg" alt="" />
        <span class="text-md opacity-50 dark:text-white">글램핑</span>
      </div>
      <div class="flex items-center justify-between gap-2 mt-[10px]">
        <span class="text-[20px] font-bold dark:text-white">포천 썬오브 글램핑카라반</span>
        <div class="flex items-center gap-4">
          <img :src="light_caravan_off" alt="" class="w-[24px] h-[24px]" />
          <img :src="light_trailer_on" alt="" class="w-[24px] h-[24px]" />
          <img :src="light_pet_on" alt="" class="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import light_caravan_off from '../../../assets/icons/light/light-caravan-off.svg'
import light_trailer_on from '../../../assets/icons/light/light-trailer-on.svg'
import light_pet_on from '../../../assets/icons/light/light-pet-on.svg'
</script>

<style lang="scss" scoped></style>
