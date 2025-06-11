<script setup>
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import FollowList from '@/components/mypage/FollowList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const clickClose = () => {
  router.go(-1)
}
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSimple title="캠핑 초보" @click="clickClose" />
    <!-- main -->
    <FollowList />
  </div>
</template>
<style scoped></style>
