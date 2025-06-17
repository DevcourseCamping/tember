<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import ProfileSkeleton from './ProfileSkeleton.vue'
import { useUserApi } from '@/composables/useUserApi'
import { useUserPage } from '@/composables/useUserPage'
import { useFollowStore } from '@/stores/followStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = useUserStore()
const isLoading = ref(true)
const { isMyPage, targetUserId } = useUserPage()
const follow = useFollowStore()
const { isFollowing } = storeToRefs(follow)
const targetUser = ref({})

onMounted(async () => {
  isLoading.value = true

  if (isMyPage.value) {
    const user = await profile.fetchUser()
    targetUser.value = { ...user }
    isLoading.value = false
  } else {
    try {
      const my = await profile.fetchUser()
      const myId = my?.id
      const { getUser } = useUserApi()
      const { user: user2, followerCount, followingCount } = await getUser(targetUserId.value)
      targetUser.value = {
        ...user2,
        followerCount,
        followingCount,
      }

      const userId = targetUser.value.id
      if (myId && userId) {
        await follow.fetchIsFollowing(myId, userId)
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
})

const toggleFollow = async () => {
  const myId = profile.user.id
  const userId = targetUser.value.id

  if (isFollowing.value) {
    await follow.unfollowUser(myId, userId)
    isFollowing.value = false

    targetUser.value.followerCount -= 1
    profile.user.followingCount -= 1
  } else {
    await follow.followUser(myId, userId)
    isFollowing.value = true

    targetUser.value.followerCount += 1
    profile.user.followingCount += 1
  }
}

const clickFollow = (tab) => {
  router.push({
    name: 'user-follow',
    params: { id: targetUserId.value },
    query: { tab },
  })
}
</script>
<template>
  <ProfileSkeleton v-if="isLoading" />
  <div v-else class="flex items-center text-[var(--black)] pt-[35px] pl-[35px] pr-[35px]">
    <img
      :src="targetUser?.image || targetUser?.avatar_url"
      alt="사용자 임시 이미지"
      class="w-[90px] h-[90px] rounded-full"
    />

    <div class="pl-[45px]">
      <div class="flex items-center">
        <p class="text-[18px] font-bold dark:text-white">{{ targetUser?.username }}</p>
      </div>
      <div class="flex flex-col gap-[10px] text-4 pt-[5px]">
        <div class="flex gap-[56px] dark:text-white">
          <button @click="clickFollow('follower')">
            팔로워 <span class="font-semibold pl-[10px]">{{ targetUser?.followerCount }}</span>
          </button>
          <button @click="clickFollow('following')">
            팔로잉 <span class="font-semibold pl-[10px]">{{ targetUser?.followingCount }}</span>
          </button>
        </div>

        <div v-if="!isMyPage && targetUser">
          <button
            @click="toggleFollow"
            class="w-[200px] h-[25px] bg-[var(--primary)] text-[var(--white)] rounded-[5px] text-[13px] dark:bg-[#3A3A3A] dark:text-white"
          >
            {{ isFollowing ? '팔로우 취소' : '팔로우' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
