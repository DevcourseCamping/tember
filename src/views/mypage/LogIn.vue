<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import darkLogo from '@/assets/icons/logo-white.svg'
import google from '@/assets/icons/light/light-google.png'
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import supabase from '@/utils/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        prompt: 'select_account',
        access_type: 'offline',
      },
    },
  })
  if (error) {
    console.error(error.message)
  } else if (data?.url) {
    window.location.href = data.url
  }
}

const clickClose = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div class="mx-auto w-full max-w-[500px] h-screen bg-[var(--white)] dark:bg-[#121212]">
    <HeaderSimple title="로그인 / 회원가입" type="close" @click="clickClose" />
    <div class="flex flex-col items-center justify-center pt-[200px] gap-[100px]">
      <img :src="logo" class="w-[157px] h-[79px] block dark:hidden" />
      <img :src="darkLogo" class="w-[157px] h-[79px] hidden dark:block" />
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center mb-[40px]">
          <hr class="w-[140px] border-t border-[var(--primary-30)] dark:border-[#ffffff]/30" />
          <p class="text-[14px] pl-[10px] pr-[10px] text-[var(--grey)] dark:text-[#ffffff]/50">
            로그인 / 회원가입
          </p>
          <hr class="w-[140px] border-t border-[var(--primary-30)] dark:border-[#ffffff]/30" />
        </div>

        <button
          @click="handleGoogleLogin"
          class="w-full max-w-[400px] h-[60px] bg-[var(--primary)] rounded-md flex items-center justify-center gap-5 dark:bg-[#3A3A3A]"
        >
          <img :src="google" class="w-[20px] h-[20px]" />
          <p class="text-[15px] text-white">Google로 로그인</p>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
