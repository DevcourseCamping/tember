<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import close from '@/assets/icons/close-brown.svg'
import back from '@/assets/icons/light/light-back-header.svg'
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
  <header class="relative w-full max-w-[500px] h-20 bg-[var(--white)] flex items-center">
    <button @click="emit('navClick')" class="absolute left-[30px]">
      <img v-if="props.navType === 'close'" :src="close" class="w-5 h-5" />
      <img v-else :src="back" class="w-7 h-7" />
    </button>
    <div class="absolute left-1/2 transform -translate-x-1/2">
      <span v-if="props.centerContent === 'title'" class="text-xl">{{ props.title }}</span>
      <img v-if="props.centerContent === 'logo'" :src="logo" class="w-[85px] h-[43px]" />
    </div>
  </header>

  <!-- user profile page header 사용 시 -->
  <!-- <HeaderSimple center-content="logo" nav-type="back" /> -->
</template>
<style scoped></style>
