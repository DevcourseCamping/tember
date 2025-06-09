<script setup>
import HeaderOther from '@/components/common/HeaderOther.vue'
import MyActivity from '@/components/mypage/MyActivity.vue'
import MyProfile from '@/components/mypage/MyProfile.vue'
const clickBack = () => {
  console.log('back')
}
const clickSetting = () => {
  console.log('setting')
}
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-white left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderOther
      nav-type="back"
      menu-type="setting"
      @navClick="clickBack"
      @menuClick="clickSetting"
    />
    <MyProfile />
    <MyActivity />
    <!-- footer -->
    <button
      href="#"
      class="absolute bottom-0 w-full h-[60px] bg-[#4B3C2F] flex justify-center items-center text-[18px] text-[#FFFFFF]"
    >
      로그아웃
    </button>
  </div>
</template>
