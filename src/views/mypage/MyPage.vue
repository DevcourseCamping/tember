<script setup>
import BottomSheet from '@/components/common/BottomSheet.vue'
import HeaderOther from '@/components/common/HeaderOther.vue'
import MyActivity from '@/components/mypage/MyActivity.vue'
import MyProfile from '@/components/mypage/MyProfile.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/utils/supabase'
import NavBar from '@/components/common/NavBar.vue'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import { useUserPage } from '@/composables/useUserPage'
import { useUserStore } from '@/stores/userStore'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const router = useRouter()
const isBottomOpen = ref(false)
const profile = useUserStore()
const { isMyPage } = useUserPage()

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('로그아웃 중 에러:', error.message)
  } else {
    profile.user = null
    router.push({ name: 'home' })
  }
}

const clickBack = () => {
  router.back()
}

const clickSetting = () => {
  isBottomOpen.value = !isBottomOpen.value
}

const handleSelect = async (key) => {
  isBottomOpen.value = false

  if (key === 'edit') {
    router.push({ name: 'edit' })
  } else if (key === 'logout') {
    await handleLogout()
  } else if (key === 'dark') {
    themeStore.toggleTheme()
  }
}
</script>
<template>
  <div class="mx-auto w-full max-w-[500px] h-screen bg-white dark:bg-[#121212]">
    <HeaderOther
      nav-type="back"
      :menu-type="isMyPage ? 'setting' : null"
      @navClick="clickBack"
      @menuClick="clickSetting"
    />

    <MyProfile />
    <MyActivity />

    <BottomSheetWrapper :show="isBottomOpen" @close="isBottomOpen = false">
      <BottomSheet type="my" @close="clickSetting" @select="handleSelect" />
    </BottomSheetWrapper>

    <NavBar v-if="!isBottomOpen" />
  </div>
</template>
