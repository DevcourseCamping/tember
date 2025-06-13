<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProfileSkeleton from './ProfileSkeleton.vue'
import { useUserApi } from '@/composables/useUserApi'
import { useUserPage } from '@/composables/useUserPage'

const router = useRouter()
const profile = useUserStore()
const isLoading = ref(true)
const { isMyPage, targetUserId } = useUserPage()
const targetUser = ref(null)

onMounted(async () => {
  isLoading.value = true

  if (isMyPage.value) {
    const user = await profile.fetchUser()
    targetUser.value = { ...user }
    isLoading.value = false
  } else {
    try {
      const { getUser } = useUserApi()
      const { user, followerCount, followingCount } = await getUser(targetUserId.value)
      targetUser.value = {
        ...user,
        followerCount,
        followingCount,
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
})

const clickFollow = () => {
  router.push({ name: 'follow' })
}
</script>
<template>
  <ProfileSkeleton v-if="isLoading" />
  <div v-else class="flex items-center text-[var(--black)] pt-[35px] pl-[35px]">
    <img
      :src="targetUser?.image || targetUser?.avatar_url"
      alt="사용자 임시 이미지"
      class="w-[90px] h-[90px] rounded-full"
    />

    <div class="pl-[45px]">
      <p class="text-[18px] font-bold">{{ targetUser?.username }}</p>
      <div class="flex gap-[60px] text-4 pt-[10px]" @click="clickFollow">
        <button>
          팔로워 <span class="font-semibold pl-[10px]">{{ targetUser?.followingCount }}</span>
        </button>
        <button>
          팔로잉 <span class="font-semibold pl-[10px]">{{ targetUser?.followerCount }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
