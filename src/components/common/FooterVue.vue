<script setup>
import homeon from '@/assets/icons/nav/nav-home-on.svg'
import homeoff from '@/assets/icons/nav/nav-home-off.svg'
import searchon from '@/assets/icons/nav/nav-search-on.svg'
import searchoff from '@/assets/icons/nav/nav-search-off.svg'
import communityon from '@/assets/icons/nav/nav-community-on.svg'
import communityoff from '@/assets/icons/nav/nav-community-off.svg'
import myoff from '@/assets/icons/nav/nav-mypage-off.svg'

import { ref } from 'vue'

const currentTab = ref('home') // 초기 선택 탭

const tabs = [
  { name: 'home', label: '홈', on: homeon, off: homeoff },
  { name: 'search', label: '검색', on: searchon, off: searchoff },
  { name: 'community', label: '커뮤니티', on: communityon, off: communityoff },
  { name: 'my', label: '마이', off: myoff },
]

const changeTab = (name) => {
  currentTab.value = name
}

</script>
<template>
 <footer class="w-[500px] h-[60px] bg-[--primary] mx-auto flex items-center justify-center">
    <div class="flex justify-between w-[440px] px-2">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="flex flex-col items-center justify-center cursor-pointer"
        @click="changeTab(tab.name)"
      >
        <img :src="currentTab === tab.name ? tab.on : tab.off" class="w-[20px] h-[20px]" />
        <span
          class="text-xs mt-1"
          :class="currentTab === tab.name ? 'text-white' : 'text-[--white-30]'"
        >
          {{ tab.label }}
        </span>
      </div>
    </div>
  </footer>
</template>
<style scoped>
</style>