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
      @click="clickTab = 'bookmark'"
      :class="clickTab === 'bookmark' ? 'text-[var(--primary)]' : 'text-[var(--primary-30)]'"
    >
      북마크
    </button>
  </div>
  <hr class="mt-[10px] border border-[var(--primary-20)]" />

  <div class="h-[calc(100vh-333px)] overflow-y-auto scrollbar-hide">
    <ReviewCard v-if="clickTab === 'review'" />
    <CommunityCard v-if="clickTab === 'community'" />
    <BookmarkCard v-if="clickTab === 'bookmark'" />
  </div>
</template>
