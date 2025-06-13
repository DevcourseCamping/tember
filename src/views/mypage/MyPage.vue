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

const router = useRouter()
const isBottomOpen = ref(false)

const { isMyPage } = useUserPage()

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

const handleSelect = async (key) => {
  isBottomOpen.value = false

  if (key === 'edit') {
    router.push({ name: 'edit' })
  } else if (key === 'logout') {
    await handleLogout()
  }
}
</script>
<template>
  <div class="fixed w-full max-w-[500px] h-screen bg-white left-1/2 -translate-x-1/2">
    <HeaderOther
      nav-type="back"
      :menu-type="isMyPage ? 'setting' : null"
      @navClick="clickBack"
      @menuClick="clickSetting"
    />

    <MyProfile />
    <MyActivity />

    <div v-show="isBottomOpen">
      <BottomSheetWrapper :show="isBottomOpen" @close="!isBottomOpen">
        <BottomSheet type="my" @close="clickSetting" @select="handleSelect" />
      </BottomSheetWrapper>
    </div>

    <NavBar v-if="!isBottomOpen" class="absolute bottom-0 w-full h-[60px]" />
  </div>
</template>
