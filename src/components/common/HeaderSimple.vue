<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import close from '@/assets/icons/close-brown.svg'
import back from '@/assets/icons/light/light-back-header.svg'
import d_logo from '@/assets/icons/logo-white.svg'
import d_close from '@/assets/icons/close-white.svg'
import d_back from '@/assets/icons/dark/dark-back-header.svg'

const props = defineProps({
  navType: {
    type: String, // close, back
    default: 'close',
  },
  centerContent: {
    type: String, // title, logo
    default: 'title',
  },
  title: {
    type: String,
  },
})
const emit = defineEmits(['navClick'])
</script>
<template>
  <header
    class="relative w-full max-w-[500px] h-20 bg-[var(--white)] dark:bg-[#121212] flex items-center"
  >
    <button @click="emit('navClick')" class="absolute left-[30px]">
      <template v-if="props.navType === 'close'">
        <img :src="close" class="w-[18px] h-[18px] block dark:hidden" />
        <img :src="d_close" class="w-[18px] h-[18px] hidden dark:block" />
      </template>
      <template v-else>
        <img :src="back" class="w-7 h-7 block dark:hidden" />
        <img :src="d_back" class="w-7 h-7 hidden dark:block" />
      </template>
    </button>
    <div class="absolute left-1/2 transform -translate-x-1/2">
      <span v-if="props.centerContent === 'title'" class="text-lg dark:text-white">{{
        props.title
      }}</span>
      <img
        v-if="props.centerContent === 'logo'"
        :src="logo"
        class="w-[85px] h-[43px] block dark:hidden"
      />
      <img
        v-if="props.centerContent === 'logo'"
        :src="d_logo"
        class="w-[85px] h-[43px] hidden dark:block"
      />
    </div>
  </header>

  <!-- user profile page header 사용 시 -->
  <!-- <HeaderSimple center-content="logo" nav-type="back" /> -->
</template>
<style scoped></style>
