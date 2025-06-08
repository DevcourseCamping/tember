<script setup>
import { ref } from 'vue'
import ReviewCard from '../common/ReviewCard.vue'
import CommunityCard from '../common/CommunityCard.vue'
import BookmarkCard from '../common/BookmarkCard.vue'

const clickTab = ref('review')
</script>
<template>
  <div class="flex justify-between pl-[35px] pr-[35px] pt-[35px] text-[15px] font-bold">
    <button
      @click="clickTab = 'review'"
      :class="clickTab === 'review' ? 'text-[#4B3C2F]' : 'text-[#4B3C2F] opacity-30'"
    >
      리뷰
    </button>
    <button
      @click="clickTab = 'community'"
      :class="clickTab === 'community' ? 'text-[#4B3C2F]' : 'text-[#4B3C2F] opacity-30'"
    >
      커뮤니티
    </button>
    <button
      @click="clickTab = 'bookmark'"
      :class="clickTab === 'bookmark' ? 'text-[#4B3C2F]' : 'text-[#4B3C2F] opacity-30'"
    >
      북마크
    </button>
  </div>
  <hr class="mt-[10px] border-t border-[#4B3C2F]/20" />

  <div class="h-[calc(100vh-333px)] overflow-y-scroll">
    <ReviewCard v-if="clickTab === 'review'" />
    <CommunityCard v-if="clickTab === 'community'" />
    <BookmarkCard v-if="clickTab === 'bookmark'" />
  </div>
</template>
<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>
