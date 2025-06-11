<script setup>
import PostCard from '@/components/community/PostCard.vue'
import HeaderSearch from '@/components/common/HeaderSearch.vue'
import NavBar from '@/components/common/NavBar.vue'
import post from '@/assets/icons/light/light-post-opacity.svg'
import { useRouter } from 'vue-router'

// bottom sheet 완성되면 마무리
const openBottomSheet = () => {
  console.log('🧸 Open Bottom Sheet')
}
const router = useRouter()
const goToCreatePost = () => {
  router.push('/community/post/create')
}
</script>
<template>
  <div class="fixed w-full max-w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSearch iconType="arrow" @iconClick="openBottomSheet" />
    <!-- post list -->
    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 168px - 60px)">
      <PostCard />
    </main>
    <!-- nav -->
    <NavBar />
    <!-- create post button -->
    <div
      class="w-[60px] h-[60px] fixed right-[20px] bottom-[80px] cursor-pointer"
      @click="goToCreatePost"
    >
      <img :src="post" />
    </div>
  </div>
</template>
<style scoped></style>
