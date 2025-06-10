<template>
  <div id="review">
    <div class="m-[10px] p-[20px] mb-0 pb-0">
      <div class="text-[#222222] dark:text-white font-bold flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span>리뷰</span>
          <span class="text-[#A8AEB2] dark:text-white">6</span>
        </div>
        <div class="flex items-center gap-2 cursor-pointer justify-center">
          <img :src="light_post" alt="" class="w-[20px] h-[20px]" />
          <span class="text-[#222222] dark:text-white">리뷰 등록하기</span>
        </div>
      </div>
    </div>
    <ReviewCard />
  </div>
</template>

<script setup>
import light_post from '../../../assets/icons/light/light-post.svg'
import ReviewCard from '../../../components/common/ReviewCard.vue'
</script>

<style lang="scss" scoped></style>
