<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

import homeon from '@/assets/icons/nav/nav-home-on.svg'
import homeoff from '@/assets/icons/nav/nav-home-off.svg'
import searchon from '@/assets/icons/nav/nav-search-on.svg'
import searchoff from '@/assets/icons/nav/nav-search-off.svg'
import communityon from '@/assets/icons/nav/nav-community-on.svg'
import communityoff from '@/assets/icons/nav/nav-community-off.svg'
import myoff from '@/assets/icons/nav/nav-mypage-off.svg'
import myon from '@/assets/icons/nav/nav-mypage-on.svg'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const route = useRoute()
const profile = useUserStore()

const tabs = [
  { name: 'home', label: '홈', path: '/', on: homeon, off: homeoff },
  { name: 'search', label: '검색', path: '/search', on: searchon, off: searchoff },
  { name: 'community', label: '커뮤니티', path: '/community', on: communityon, off: communityoff },
  { name: 'mypage', label: '마이', path: '/mypage', on: myon, off: myoff },
]

const currentTab = computed(() => {
  const matched = tabs.find((tab) => route.path === tab.path)
  return matched?.name || ''
})

const changeTab = async (tab) => {
  if (tab.name === 'mypage') {
    if (!profile.user?.id) {
      router.push({ name: 'login' })
      return
    }
  }
  router.push(tab.path)
}

onMounted(() => {
  profile.fetchUser()
})
</script>
<template>
  <footer class="fixed bottom-0 w-full max-w-[500px] h-[60px] bg-[--primary] flex">
    <div class="w-full px-8 flex justify-between items-center">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="flex flex-col items-center justify-center cursor-pointer"
        @click="changeTab(tab)"
      >
        <img :src="currentTab === tab.name ? tab.on : tab.off" class="w-[20px] h-[20px]" />
        <span
          class="text-sm mt-1"
          :class="currentTab === tab.name ? 'text-[--white]' : 'text-[--white-30]'"
        >
          {{ tab.label }}
        </span>
      </div>
    </div>
  </footer>
</template>
