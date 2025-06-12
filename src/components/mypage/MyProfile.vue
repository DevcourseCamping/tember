<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProfileSkeleton from './ProfileSkeleton.vue'

const router = useRouter()
const profile = useUserStore()
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  await profile.fetchUser()
  isLoading.value = false
})

const clickFollow = () => {
  router.push({ name: 'follow' })
}
</script>
<template>
  <ProfileSkeleton v-if="isLoading" />
  <div v-else class="flex items-center text-[var(--black)] pt-[35px] pl-[35px]">
    <img
      :src="profile.user?.image || profile.user?.avatar_url"
      alt="사용자 임시 이미지"
      class="w-[90px] h-[90px] rounded-full"
    />

    <div class="pl-[45px]">
      <p class="text-[18px] font-bold">{{ profile.user?.username }}</p>
      <div class="flex gap-[60px] text-4 pt-[10px]" @click="clickFollow">
        <button>
          팔로워 <span class="font-semibold pl-[10px]">{{ profile.user?.followingCount }}</span>
        </button>
        <button>
          팔로잉 <span class="font-semibold pl-[10px]">{{ profile.user?.followerCount }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
