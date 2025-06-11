<script setup>
import { onMounted, ref } from 'vue'
import commentIcon from '../../assets/icons/light/light-comment.svg'
import filledLikeIcon from '../../assets/icons/light/light-like-filled.svg'
import outlineLikeIcon from '../../assets/icons/light/light-like-outline.svg'
import { useUserStore } from '@/stores/userStore'
import { useUserApi } from '@/composables/user'

const profile = useUserStore()
const posts = ref([])

onMounted(async () => {
  const user = await profile.fetchUser()
  if (!user || !user.id) return

  const { getPost } = useUserApi()
  const postData = await getPost(user.id)

  posts.value = postData.data
  console.log(postData.data)
})
</script>
<template>
  <div class="p-[30px] flex flex-col gap-[30px]">
    <div
      v-for="post in posts"
      :key="post.id"
      class="border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
    >
      <div class="flex items-center justify-between pl-[15px] pt-[15px]">
        <div class="flex items-center">
          <img
            :src="post.profiles.avatar_url"
            alt="임시 사용자 이미지"
            class="w-[52px] h-[52px] rounded-full mr-[15px]"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[15px] font-semibold">{{ post.profiles.username }}</p>
            <p class="text-[13px] text-[var(--grey)]">{{ post.created_at }}</p>
          </div>
        </div>
      </div>
      <div>
        <img
          v-if="post.postImg"
          :src="post.postImg"
          alt="임시 게시글 이미지"
          class="w-[440px] h-[400px] pt-[15px]"
        />
      </div>
      <div class="pt-5 pl-5 pr-5 text-[15px]">
        <p class="break-words">
          {{ post.content }}
        </p>
      </div>
      <div class="flex items-center justify-between pl-[20px] pr-[20px] pt-[30px] pb-[10px]">
        <div
          class="w-20 h-[30px] bg-[var(--primary)] text-[var(--white)] text-[12px] rounded-[5px] flex items-center justify-center"
        >
          {{ post.category }}
        </div>
        <div class="flex gap-[3px] text-[15px]">
          <img :src="post.isLiked ? filledLikeIcon : outlineLikeIcon" alt="좋아요 아이콘" />
          <p>{{ post.likeCount }}</p>
          <img :src="commentIcon" alt="댓글 아이콘" class="pl-[10px]" />
          <p>{{ post.commentCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
