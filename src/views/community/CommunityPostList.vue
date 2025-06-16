<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCommunityStore } from '@/stores/communityStore'
import PostCard from '@/components/community/PostCard.vue'
import HeaderSearch from '@/components/community/CommunityHeader.vue'
import NavBar from '@/components/common/NavBar.vue'
import post from '@/assets/icons/light/light-post-opacity.svg'
import BottomSheet from '@/components/common/BottomSheet.vue'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import { useUserPage } from '@/composables/useUserPage'
import { useUserStore } from '@/stores/userStore'

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
  router.push('/community/post/create')
}

const goToLogin = () => {
  if (!profile.user?.id) {
    router.push({ name: 'login' })
  }
}
</script>
<template>
  <div class="fixed w-full max-w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSearch
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
