<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ReviewCard from '../common/ReviewCard.vue'
import CommunityCard from '../common/CommunityCard.vue'
import BookmarkCard from '../common/BookmarkCard.vue'
import { useUserPage } from '@/composables/useUserPage'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import BottomSheet from '@/components/common/BottomSheet.vue'
import supabase from '@/utils/supabase'
import { useUserStore } from '@/stores/userStore'

const profile = useUserStore()
const { isMyPage } = useUserPage()
const clickTab = ref('review')

const isBottomOpen = ref(false)
const selectedReview = ref(null)
const router = useRouter()

const handleOpenBottomSheet = (review) => {
  const loginUserId = profile.user?.id
  const reviewUserId = review.user_id

  if (loginUserId === reviewUserId) {
    selectedReview.value = review
    isBottomOpen.value = true
  } else {
    router.push({ name: 'campingDetail', params: { id: review.camp_id } })
  }
}
const handleSelect = async (key) => {
  isBottomOpen.value = false

  if (key === 'edit') {
    router.push({
      name: 'campReviewEdit',
      params: {
        id: selectedReview.value.camp_id,
        reviewId: selectedReview.value.id,
      },
    })
  } else if (key === 'delete') {
    const confirmDelete = confirm('리뷰를 삭제하시겠어요?')
    if (!confirmDelete) return

    const { error } = await supabase.from('camp_reviews').delete().eq('id', selectedReview.value.id)

    if (error) {
      console.error(error)
      alert('리뷰 삭제에 실패했습니다.')
    } else {
      alert('리뷰가 삭제되었습니다.')
      window.location.reload()
    }
  } else if (key === 'goToCamp') {
    router.push({ name: 'campingDetail', params: { id: selectedReview.value.camp_id } })
  }
}
</script>
<template>
  <div class="flex justify-around pl-[35px] pr-[35px] pt-[35px] text-[15px] font-bold">
    <button
      @click="clickTab = 'review'"
      :class="clickTab === 'review' ? 'text-[var(--primary)]' : 'text-[var(--primary-30)]'"
    >
      리뷰
    </button>
    <button
      @click="clickTab = 'community'"
      :class="clickTab === 'community' ? 'text-[var(--primary)]' : 'text-[var(--primary-30)]'"
    >
      커뮤니티
    </button>
    <button
      v-if="isMyPage"
      @click="clickTab = 'bookmark'"
      :class="clickTab === 'bookmark' ? 'text-[var(--primary)]' : 'text-[var(--primary-30)]'"
    >
      북마크
    </button>
  </div>
  <hr class="mt-[10px] border border-[var(--primary-20)]" />

  <div class="h-[calc(100vh-333px)] overflow-y-auto scrollbar-hide">
    <ReviewCard v-if="clickTab === 'review'" @openBottomSheet="handleOpenBottomSheet" />
    <CommunityCard v-if="clickTab === 'community'" />
    <BookmarkCard v-if="clickTab === 'bookmark'" />
  </div>

  <BottomSheetWrapper :show="isBottomOpen" @close="isBottomOpen = false">
    <BottomSheet type="review" @close="isBottomOpen = false" @select="handleSelect" />
  </BottomSheetWrapper>
</template>
