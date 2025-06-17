<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCommunityStore } from '@/stores/communityStore'
import PostCard from '@/components/community/PostCard.vue'
import NavBar from '@/components/common/NavBar.vue'
import post from '@/assets/icons/light/light-post-opacity.svg'
import d_post from '@/assets/icons/dark/dark-post-opacity.svg'
import BottomSheet from '@/components/common/BottomSheet.vue'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import { useUserStore } from '@/stores/userStore'
import CommunityHeader from '@/components/community/CommunityHeader.vue'
const isBottomOpen = ref(false)
const inputValue = ref('')
const profile = useUserStore()

const communityStore = useCommunityStore()
const openBottomSheet = () => {
  isBottomOpen.value = true
}

const handleSelect = async (key) => {
  console.log('정렬 선택:', key)

  let sortOption = 'created'
  if (key === 'latest') sortOption = 'created'
  else if (key === 'popular') sortOption = 'popular'

  await communityStore.getCommunityPosts({ sorted: sortOption })
  isBottomOpen.value = false
}

const closeSheet = () => {
  isBottomOpen.value = false
}
const router = useRouter()
const goToCreatePost = () => {
  router.push({ name: 'communityPostCreate' })
}

const goToLogin = () => {
  if (!profile.user?.id) {
    router.push({ name: 'login' })
  }
}
</script>
<template>
  <div class="relative mx-auto w-full max-w-[500px] h-screen bg-[var(--white)] dark:bg-[#121212]">
    <!-- header -->
    <CommunityHeader
      iconType="arrow"
      :inputValue="inputValue"
      @update:inputValue="inputValue = $event"
      @iconClick="openBottomSheet"
    />
    <!-- post list -->
    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 168px - 60px)">
      <PostCard :inputValue="inputValue" @click="goToLogin" />
    </main>
    <!-- nav -->
    <NavBar v-if="!isBottomOpen" class="absolute bottom-0" />
    <!-- create post button -->
    <div
      class="w-[60px] h-[60px] absolute right-[20px] bottom-[80px] cursor-pointer z-50"
      @click="goToCreatePost"
    >
      <img :src="post" class="block dark:hidden" />
      <img :src="d_post" class="hidden dark:block" />
    </div>
  </div>
  <BottomSheetWrapper :show="isBottomOpen" @close="closeSheet">
    <BottomSheet type="sort" @select="handleSelect" @close="closeSheet" />
  </BottomSheetWrapper>
</template>
<style scoped></style>
