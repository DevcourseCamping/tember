<script setup>
import supabase from '@/utils/supabase'
import filledStarIcon from '../../assets/icons/star-filled.svg'
import outlineStarIcon from '../../assets/icons/star-outline.svg'
import { onMounted, ref } from 'vue'
import ReviewSkeleton from '../mypage/ReviewSkeleton.vue'
import { useUserPage } from '@/composables/useUserPage'
import { useUserStore } from '@/stores/userStore'

const reviews = ref([])
const isLoading = ref(true)
const profile = useUserStore()
const { targetUserId } = useUserPage()

const formDate = (newDate) => {
  const date = new Date(newDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

onMounted(async () => {
  isLoading.value = true

  if (!profile.user?.id) {
    await profile.fetchUser()
    isLoading.value = false
  } else {
    try {
      const { data, error } = await supabase
        .from('camp_reviews')
        .select('*, profiles(*)')
        .eq('user_id', targetUserId.value)
      if (error) {
        console.error(error)
      } else {
        reviews.value = data
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
})
</script>
<template>
  <div class="p-[30px] flex flex-col">
    <div v-if="isLoading">
      <ReviewSkeleton v-for="n in 3" :key="n" class="mb-[30px]" />
    </div>
    <div
      v-else-if="reviews.length === 0"
      class="text-center text-[var(--grey)] text-[14px] flex items-center justify-center h-[calc(100vh-450px)]"
    >
      작성하신 리뷰가 없습니다.
    </div>
    <ReviewSkeleton v-else-if="isLoading" />

    <div v-else>
      <div
        v-for="review in reviews"
        :key="review.id"
        class="mb-[30px] border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
        @mouseenter="hoverMoreIndex = index"
      >
        <div class="flex items-center justify-between pl-[15px] pt-[15px]">
          <div class="flex items-center">
            <img
              :src="review.profiles.image || review.profiles.avatar_url"
              alt="임시 사용자 이미지"
              class="w-[52px] h-[52px] rounded-full mr-[15px]"
            />
            <div class="flex flex-col justify-center">
              <p class="text-[14px] font-semibold">{{ review.profiles.username }}</p>
              <p class="text-[13px] text-[var(--grey)]">{{ formDate(review.created_at) }}</p>
            </div>
          </div>
        </div>
        <div class="pt-[25px] pl-5 pr-5 text-[15px]">
          <p class="break-words">
            {{ review.content }}
          </p>
        </div>
        <div class="pt-[30px] pl-5 pr-5 flex gap-[27px] items-center">
          <p class="font-bold text-[14px]">만족도</p>
          <div class="flex gap-[3px] items-center">
            <img
              v-for="n in 5"
              :key="n"
              :src="n <= review.rating ? filledStarIcon : outlineStarIcon"
              alt="별"
              class="w-4 h-4"
            />
          </div>
        </div>
        <div class="pt-[13px] pl-5 pr-5 pb-5 flex gap-[27px]">
          <p class="font-bold text-[14px]">청결도</p>
          <p class="text-[14px]">{{ review.cleanlines }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
