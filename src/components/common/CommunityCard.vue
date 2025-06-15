<script setup>
import { onMounted, ref } from 'vue'
import commentIcon from '../../assets/icons/light/light-comment.svg'
import filledLikeIcon from '../../assets/icons/light/light-like-filled.svg'
import outlineLikeIcon from '../../assets/icons/light/light-like-outline.svg'
import { useUserStore } from '@/stores/userStore'
import { useUserApi } from '@/composables/useUserApi'
import CommunitySkeleton from '../mypage/CommunitySkeleton.vue'
import { useUserPage } from '@/composables/useUserPage'
import { useRouter } from 'vue-router'
import { useCommunityStore } from '@/stores/communityStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const profile = useUserStore()
const posts = ref([])
const isLoading = ref(true)
const { targetUserId } = useUserPage()

const formDate = (value) => {
  const now = new Date()
  const timeValue = new Date(value)

  const time = Math.floor(now.getTime() - timeValue.getTime()) / 1000
  if (time < 60) return '방금 전'
  if (time < 3600) return `${Math.floor(time / 60)}분 전`
  if (time < 86400) return `${Math.floor(time / 3600)}시간 전`
  if (time < 31536000) return `${Math.floor(time / 86400)}일 전`

  return `${Math.floor(time / 31536000)}년 전`
}

const router = useRouter()

const goToDetail = (postId) => {
  router.push({ name: 'communityPostDetail', params: { postId } })
}

const communityStore = useCommunityStore()

const toggleLike = async (event, post) => {
  event.stopPropagation()
  await communityStore.toggleLike(post)
}

onMounted(async () => {
  isLoading.value = true

  if (!profile.user?.id) {
    await profile.fetchUser()
    isLoading.value = false
  } else {
    try {
      const { getPost } = useUserApi()
      const postData = await getPost(targetUserId.value)

      posts.value = postData.data
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
})

const parseImage = (imageField) => {
  try {
    const parsed = JSON.parse(imageField)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
</script>
<template>
  <div class="p-[30px] flex flex-col">
    <div v-if="isLoading">
      <CommunitySkeleton v-for="n in 4" :key="n" />
    </div>
    <div
      v-else-if="posts.length === 0"
      class="text-center text-[var(--grey)] text-[14px] flex items-center justify-center h-[calc(100vh-450px)]"
    >
      작성하신 게시글이 없습니다.
    </div>
    <div v-else>
      <div
        v-for="post in posts"
        :key="post.id"
        class="mb-[30px] border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
      >
        <div class="flex items-center justify-between pl-[15px] pt-[15px]">
          <div class="flex items-center">
            <img
              :src="post.profiles.image || post.profiles.avatar_url"
              alt="임시 사용자 이미지"
              class="w-[52px] h-[52px] rounded-full mr-[15px]"
            />
            <div class="flex flex-col justify-center">
              <p class="text-[14px] font-semibold">{{ post.profiles.username }}</p>
              <p class="text-[13px] text-[var(--grey)]">{{ formDate(post.created_at) }}</p>
            </div>
          </div>
        </div>
        <div v-if="parseImage(post.image).length" @click="goToDetail(post.id)">
          <section v-if="parseImage(post.image).length === 1">
            <img
              :src="parseImage(post.image)[0]"
              alt="게시글 이미지"
              class="w-full h-[400px] pt-[15px] object-cover"
            />
          </section>
          <section v-else class="pt-[15px]">
            <Swiper
              :modules="[Pagination]"
              :pagination="{ clickable: true }"
              class="w-full h-[400px]"
            >
              <SwiperSlide
                v-for="(img, idx) in parseImage(post.image)"
                :key="idx"
                class="w-full h-full"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </SwiperSlide>
            </Swiper>
          </section>
        </div>
        <div class="pt-5 pl-5 pr-5 text-[15px]" @click="goToDetail(post.id)">
          <p class="break-words">
            {{ post.content }}
          </p>
        </div>
        <div class="flex items-center justify-between pl-[20px] pr-[20px] pt-[30px] pb-[10px]">
          <div
            class="w-20 h-[30px] bg-[var(--primary)] text-[var(--white)] text-[12px] rounded-[5px] flex items-center justify-center"
            @click="goToDetail(post.id)"
          >
            {{ post.category === 'pet' ? '반려동물' : '일반' }}
          </div>
          <template class="flex gap-4 text-sm cursor-pointer">
            <div class="flex gap-[3px]" @click.stop="toggleLike($event, post)">
              <img :src="post.isLiked ? filledLikeIcon : outlineLikeIcon" alt="좋아요 아이콘" />
              <p>{{ post.likeCount }}</p>
            </div>
            <div class="flex gap-[3px]" @click="goToDetail(post.id)">
              <img :src="commentIcon" alt="댓글 아이콘" />
              <p>{{ post.commentCount }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
