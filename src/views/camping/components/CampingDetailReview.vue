<template>
  <div id="review">
    <div class="m-[10px] p-[20px] mb-0 pb-0">
      <div class="text-[#222222] dark:text-white font-bold flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-[18px] font-bold">리뷰</span>
          <span class="text-[#A8AEB2] dark:text-white text-[18px] font-bold">{{
            reviewCount
          }}</span>
        </div>
        <div class="flex items-center gap-2 cursor-pointer justify-center">
          <img :src="themeStore.isDark ? dark_post : light_post" alt="" class="w-[20px] h-[20px]" />
          <router-link :to="loginUserId ? `/camping/${campingId}/review/create` : '/login'">
            <span class="text-[#222222] dark:text-white text-[15px] font-medium"
              >리뷰 등록하기</span
            >
          </router-link>
        </div>
      </div>
    </div>
    <template v-if="campingReview.length > 0">
      <ReviewCard :camping-reviews="campingReview" mode="detail" />
    </template>
    <template v-else>
      <div class="flex items-center justify-center h-[200px]">
        <span class="text-[#A8AEB2] dark:text-white text-[14px]">리뷰가 없습니다.</span>
      </div>
    </template>
  </div>
</template>

<script setup>
// TODO: 리뷰 등록하기 버튼 클릭 시 리뷰 등록 페이지로 이동
import { computed } from 'vue'
import light_post from '../../../assets/icons/light/light-post.svg'
import dark_post from '../../../assets/icons/dark/dark-post.svg'
import ReviewCard from '../../../components/common/ReviewCard.vue'

import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const { campingReview, campingId } = defineProps({
  campingReview: {
    type: Object,
    required: true,
  },
  campingId: {
    type: String,
    required: true,
  },
})

const reviewCount = computed(() => {
  return campingReview.length
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const loginUserId = user.value?.id
</script>

<style lang="scss" scoped></style>
