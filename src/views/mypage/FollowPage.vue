<script setup>
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import FollowList from '@/components/mypage/FollowList.vue'
import { useUserPage } from '@/composables/useUserPage'
import { useFollowStore } from '@/stores/followStore'
import { useUserStore } from '@/stores/userStore'
import supabase from '@/utils/supabase'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = useUserStore()
const { isMyPage, targetUserId } = useUserPage()
const follow = useFollowStore()
const { followers, followings } = storeToRefs(follow)
const otherUser = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  if (isMyPage.value) {
    await profile.fetchUser()
  } else {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', targetUserId.value)
      .maybeSingle()

    if (!error) {
      otherUser.value = data
    }
  }
  await follow.fetchFollowing(targetUserId.value)
  await follow.fetchFollowers(targetUserId.value)

  isLoading.value = false
})

onBeforeMount(() => {
  follow.followers = []
  follow.followings = []
  otherUser.value = null
})

const clickClose = () => {
  router.go(-1)
}
</script>
<template>
  <div class="fixed w-full max-w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSimple
      :title="isMyPage ? profile.user?.username : otherUser?.username"
      @click="clickClose"
    />
    <!-- main -->
    <FollowList :followers="followers" :followings="followings" :is-loading="isLoading" />
  </div>
</template>
<style scoped></style>
