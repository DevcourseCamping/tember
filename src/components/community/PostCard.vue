<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommunityStore } from '@/stores/communityStore'

import commentIcon from '../../assets/icons/light/light-comment.svg'
import like from '../../assets/icons/light/light-like-filled.svg'
import unlike from '../../assets/icons/light/light-like-outline.svg'
import { useRouter } from 'vue-router'
import SkeletonPostCard from './SkeletonPostCard.vue'

const communityStore = useCommunityStore()
const { posts, loading } = storeToRefs(communityStore)

const router = useRouter()
const goToDetail = (postId) => {
  router.push(`/community/post/${postId}`)
}
const toggleLike = async (event, post) => {
  event.stopPropagation()
  await communityStore.toggleLike(post)
}

onMounted(() => {
  communityStore.getCommunityPosts()
})
</script>
<template>
  <div class="p-[30px] flex flex-col gap-[30px]">
    <SkeletonPostCard v-if="loading" />
    <div
      v-else
      v-for="post in posts"
      :key="post.id"
      class="border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
      @click="goToDetail(post.id)"
    >
      <div class="flex items-center justify-between pl-[15px] pt-[15px]">
        <div class="flex items-center">
          <img
            :src="post.profiles?.image || post.profiles?.avatar_url"
            alt="사용자 이미지"
            class="w-[52px] h-[52px] rounded-full mr-[15px]"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[14px] font-semibold">{{ post.profiles?.username || '익명' }}</p>
            <p class="text-[13px] text-[var(--grey)]">
              {{ post.created_at }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="post.image">
        <img :src="post.image" alt="게시글 이미지" class="w-[440px] h-[400px] pt-[15px]" />
      </div>
      <div class="pt-5 pl-5 pr-5 text-[15px]">
        <p class="break-words">
          {{ post.content }}
        </p>
      </div>
      <div class="flex items-center justify-between pl-[20px] pr-[20px] pt-[30px] pb-[15px]">
        <div
          class="w-20 h-[30px] bg-[var(--primary)] text-[var(--white)] text-[12px] rounded-[5px] flex items-center justify-center"
        >
          {{ post.category === 'pet' ? '반려동물' : '일반' }}
        </div>
        <template class="flex gap-4 text-sm cursor-pointer">
          <div class="flex gap-[3px]" @click.stop="toggleLike($event, post)">
            <img :src="post.isLiked ? like : unlike" alt="좋아요 아이콘" />
            <p>{{ post.likeCount }}</p>
          </div>
          <div class="flex gap-[3px]">
            <img :src="commentIcon" alt="댓글 아이콘" />
            <p>{{ post.commentCount }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
