<template>
  <div id="review">
    <div class="m-[10px] p-[20px] mb-0 pb-0">
      <div class="text-[--black] dark:text-white font-bold flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span>리뷰</span>
          <span class="text-[--grey] dark:text-white">{{ reviewCount }}</span>
        </div>
        <div class="flex items-center gap-2 cursor-pointer justify-center">
          <img :src="light_post" alt="" class="w-[20px] h-[20px]" />
          <span class="text-[--black] dark:text-white">리뷰 등록하기</span>
        </div>
      </div>
    </div>
    <template v-if="campingReview.length > 0">
      <ReviewCard :reviews="campingReview" />
    </template>
    <template v-else>
      <div class="flex items-center justify-center h-[200px]">
        <span class="text-[--grey] dark:text-white">리뷰가 없습니다.</span>
      </div>
    </template>
  </div>
</template>

<script setup>
// TODO: 리뷰 등록하기 버튼 클릭 시 리뷰 등록 페이지로 이동
import { computed } from 'vue'
import light_post from '../../../assets/icons/light/light-post.svg'
import ReviewCard from '../../../components/common/ReviewCard.vue'

const { campingReview } = defineProps({
  campingReview: {
    type: Object,
    required: true,
  },
})

const reviewCount = computed(() => {
  return campingReview.length
})
</script>

<style lang="scss" scoped></style>
