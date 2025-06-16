<script setup>
import { useRoute, useRouter } from 'vue-router'
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import ReviewCreate from '@/components/review/ReviewCreate.vue'
import ReviewEditor from '@/components/review/ReviewEditor.vue'

const route = useRoute()
const router = useRouter()

const isEditMode = !!route.params.reviewId
const campId = route.params.id
const reviewId = route.params.reviewId

const goToDetail = () => {
  router.push({ name: 'campingDetail', params: { id: campId } })
}

const handleClose = () => {
  router.back()
}
</script>

<template>
  <div class="relative mx-auto w-full max-w-[500px] h-screen bg-[var(--white)]">
    <!-- header -->
    <HeaderSimple :title="isEditMode ? '리뷰 수정' : '리뷰 쓰기'" @navClick="handleClose" />

    <!-- create -->
    <ReviewCreate v-if="!isEditMode" :camp-id="campId" @done="goToDetail" />

    <!-- update -->
    <ReviewEditor v-else :review-id="reviewId" @done="goToDetail" />
  </div>
</template>
