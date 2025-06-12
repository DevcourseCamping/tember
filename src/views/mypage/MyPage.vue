<script setup>
import BottomSheet from '@/components/common/BottomSheet.vue'
import HeaderOther from '@/components/common/HeaderOther.vue'
import MyActivity from '@/components/mypage/MyActivity.vue'
import MyProfile from '@/components/mypage/MyProfile.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/utils/supabase'

const isBottomOpen = ref(false)

const router = useRouter()

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('로그아웃 중 에러:', error.message)
  } else {
    console.log('로그아웃 성공')
    router.push({ name: 'login' })
  }
}

const clickBack = () => {
  router.push({ name: 'home' })
}
const clickSetting = () => {
  isBottomOpen.value = !isBottomOpen.value
}

const handleSelect = (key) => {
  if (key === 'edit') {
    router.push({ name: 'edit' })
  }
}
</script>
<template>
  <div class="fixed w-full max-w-[500px] h-screen bg-white left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderOther
      nav-type="back"
      menu-type="setting"
      @navClick="clickBack"
      @menuClick="clickSetting"
    />

    <MyProfile />
    <MyActivity />

    <BottomSheet v-if="isBottomOpen" type="my" @close="clickSetting" @select="handleSelect" />
    <!-- footer -->
    <button
      v-if="!isBottomOpen"
      @click="handleLogout"
      href="#"
      class="absolute bottom-0 w-full h-[60px] bg-[#4B3C2F] flex justify-center items-center text-[18px] text-[#FFFFFF]"
    >
      로그아웃
    </button>
  </div>
</template>
