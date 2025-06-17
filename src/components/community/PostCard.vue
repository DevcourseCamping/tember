<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommunityStore } from '@/stores/communityStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { useRouter } from 'vue-router'
import 'swiper/css'
import 'swiper/css/pagination'
import commentIcon from '@/assets/icons/light/light-comment.svg'
import like from '@/assets/icons/light/light-like-filled.svg'
import unlike from '@/assets/icons/light/light-like-outline.svg'
import d_commentIcon from '@/assets/icons/dark/dark-comment.svg'
import d_like from '@/assets/icons/dark/dark-like-filled.svg'
import d_unlike from '@/assets/icons/dark/dark-like-outline.svg'
import SkeletonPostCard from './SkeletonPostCard.vue'
import formDate from '@/utils/formDate'

const communityStore = useCommunityStore()
const { posts, loading } = storeToRefs(communityStore)

const props = defineProps({
  inputValue: String,
})

const router = useRouter()
const goToDetail = (postId) => {
  router.push({ name: 'communityPostDetail', params: { postId } })
}
const toggleLike = async (event, post) => {
  event.stopPropagation()
  await communityStore.toggleLike(post)
}

const parseImage = (imageField) => {
  try {
    const parsed = JSON.parse(imageField)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const filteredPosts = computed(() => {
  if (!props.inputValue?.trim()) return posts.value
  return posts.value.filter((post) =>
    post.content.toLowerCase().includes(props.inputValue.trim().toLowerCase()),
  )
})

onMounted(() => {
  communityStore.getCommunityPosts()
})

const goToUserProfile = (userId) => {
  router.push({ name: 'user-profile', params: { id: userId } })
}
</script>
<template>
  <div class="px-[30px] pt-5 pb-[30px] flex flex-col gap-[30px]">
    <SkeletonPostCard v-if="loading" />
    <div
      v-for="post in filteredPosts"
      :key="post.id"
      class="border border-[var(--primary-30)] dark:bg-[#212121] dark:border-[#3a3a3a30] rounded-[5px] cursor-pointer"
    >
      <div class="flex items-center justify-between pl-[15px] pt-[15px]">
        <div class="flex items-center" @click="goToUserProfile(post.user_id)">
          <img
            :src="post.profiles?.image || post.profiles?.avatar_url"
            alt="사용자 이미지"
            class="w-[52px] h-[52px] rounded-full mr-[15px]"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[14px] font-semibold dark:text-white">
              {{ post.profiles?.username || '익명' }}
            </p>
            <p class="text-[13px] text-[var(--grey)] dark:text-[#ffffff50]">
              {{ formDate(post.created_at) }}
            </p>
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
      <router-link
        :to="{ name: 'communityPostDetail', params: { postId: post.id } }"
        class="block pt-5 pl-5 pr-5 text-[15px]"
      >
        <p class="break-words dark:text-white">{{ post.content }}</p>
      </router-link>
      <div class="flex items-center justify-between pl-[20px] pr-[20px] pt-[30px] pb-[15px]">
        <!-- <div
          class="w-20 h-[30px] bg-[var(--primary)] dark:bg-[#3a3a3a] text-[var(--white)] text-[12px] rounded-[5px] flex items-center justify-center"
          @click="goToDetail(post.id)"
        >
          {{ post.category === 'pet' ? '반려동물' : '일반' }}
        </div> -->
        <template v-if="post.category === 'pet'">
          <div
            class="w-20 h-[30px] bg-[#CEE8EC] dark:bg-[#CEE8EC85] text-[var(--primary)] dark:text-white text-[12px] rounded-[5px] flex items-center justify-center"
            @click="goToDetail(post.id)"
          >
            반려동물
          </div>
        </template>
        <template v-else>
          <div
            class="w-20 h-[30px] bg-[var(--primary)] dark:bg-[#3a3a3a] text-[var(--white)] text-[12px] rounded-[5px] flex items-center justify-center"
            @click="goToDetail(post.id)"
          >
            일반
          </div>
        </template>

        <template class="flex gap-4 text-sm cursor-pointer">
          <div class="flex gap-2" @click.stop="toggleLike($event, post)">
            <img
              :src="post.isLiked ? like : unlike"
              alt="좋아요 아이콘"
              class="block dark:hidden"
            />
            <img
              :src="post.isLiked ? d_like : d_unlike"
              alt="좋아요 아이콘"
              class="hidden dark:block"
            />
            <p class="dark:text-white">{{ post.likeCount }}</p>
          </div>
          <div class="flex gap-2">
            <img :src="commentIcon" alt="댓글 아이콘" class="block dark:hidden" />
            <img :src="d_commentIcon" alt="댓글 아이콘" class="hidden dark:block" />
            <p class="dark:text-white">{{ post.commentCount }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
