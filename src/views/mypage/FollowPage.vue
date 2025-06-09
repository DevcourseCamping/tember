<script setup>
import FollowList from '@/components/mypage/FollowList.vue'
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- headr (임시) -->
    <div class="h-20 bg-(var(--white)) flex items-center">
      <img
        src="@/assets/icons/close-brown.svg"
        class="w-5 h-5 absolute left-[30px] cursor-pointer"
        alt=""
      />
    </div>
    <!-- main -->
    <FollowList />
  </div>
</template>
<style scoped></style>
