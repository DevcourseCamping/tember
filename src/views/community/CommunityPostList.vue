<script setup>
import CommunityCard from '@/components/common/CommunityCard.vue'
import NavBar from '@/components/common/NavBar.vue'
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header (임시) -->
    <div class="h-[168px] bg-[var(--primary)]"></div>
    <!-- post list -->
    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 168px - 60px)">
      <CommunityCard />
    </main>
    <!-- nav -->
    <NavBar />
    <!-- create post button -->
    <div class="w-[60px] h-[60px] fixed right-[20px] bottom-[80px]">
      <img src="@/assets/icons/light/light-post.svg" alt="게시글 작성 버튼" />
    </div>
  </div>
</template>
<style scoped></style>
