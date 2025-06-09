<script setup>
import CommunityCard from '@/components/common/CommunityCard.vue'
import HeaderSearch from '@/components/common/HeaderSearch.vue'
import NavBar from '@/components/common/NavBar.vue'
import post from '@/assets/icons/light/light-post.svg'
const openBottomSheet = () => {
  console.log('Open Bottom Sheet')
}
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSearch iconType="arrow" @iconClick="openBottomSheet" />
    <!-- post list -->
    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 168px - 60px)">
      <CommunityCard />
    </main>
    <!-- nav -->
    <NavBar />
    <!-- create post button -->
    <div class="w-[60px] h-[60px] fixed right-[20px] bottom-[80px]">
      <img :src="post" />
    </div>
  </div>
</template>
<style scoped></style>
