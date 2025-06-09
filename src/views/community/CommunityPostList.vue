<script setup>
import CommunityCard from '@/components/common/CommunityCard.vue'
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-white left-1/2 -translate-x-1/2">
    <!-- header (임시) -->
    <div class="h-[168px] bg-[#4B3C2F]"></div>
    <!-- post list -->
    <main class="overflow-y-auto no-scrollbar" style="height: calc(100vh - 168px - 60px)">
      <CommunityCard />
    </main>
    <!-- nav (임시) -->
    <div class="w-full h-[60px] bg-[#4B3C2F] bottom-0 absolute"></div>
    <!-- create post button -->
    <button class="w-[60px] h-[60px] fixed right-[20px] bottom-[80px]">
      <img src="@/assets/icons/light/light-post.svg" alt="게시글 작성 버튼" />
    </button>
  </div>
</template>
<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
