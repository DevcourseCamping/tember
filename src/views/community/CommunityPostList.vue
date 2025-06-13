<script setup>
import PostCard from '@/components/community/PostCard.vue'
import HeaderSearch from '@/components/common/HeaderSearch.vue'
import NavBar from '@/components/common/NavBar.vue'
import post from '@/assets/icons/light/light-post-opacity.svg'
import BottomSheet from '@/components/common/BottomSheet.vue'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// bottom sheet 완성되면 마무리
const isBottomOpen = ref(false)
const openBottomSheet = () => {
  isBottomOpen.value = true
  console.log('🧸 Open Bottom Sheet')
}
const handleSelect = (key) => {
  console.log('정렬 선택:', key)
  isBottomOpen.value = false
}

const closeSheet = () => {
  isBottomOpen.value = false
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
      class="w-[60px] h-[60px] fixed right-[20px] bottom-[80px] cursor-pointer z-50"
      @click="goToCreatePost"
    >
      <img :src="post" />
    </div>
  </div>
  <BottomSheetWrapper :show="isBottomOpen" @close="closeSheet">
    <BottomSheet type="sort" @select="handleSelect" @close="closeSheet" />
  </BottomSheetWrapper>
</template>
<style scoped></style>
