<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import close from '@/assets/icons/close-brown.svg'
import back from '@/assets/icons/light/light-back-header.svg'
import more from '@/assets/icons/light/light-more.svg'
import setting from '@/assets/icons/light/light-setting.svg'

import darkLogo from '@/assets/icons/dark/dark-logo-white.svg'
import darkClose from '@/assets/icons/close-white.svg'
import darkBack from '@/assets/icons/dark/dark-back-header.svg'
import darkMore from '@/assets/icons/dark/dark-more.svg'
import darkSetting from '@/assets/icons/dark/dark-setting.svg'

const props = defineProps({
  navType: {
    type: String, // close, back
    default: 'close',
  },
  menuType: {
    type: String, // more, setting
    default: null,
  },
})
const emit = defineEmits(['navClick', 'menuClick'])
</script>
<template>
  <header>
    <div
      class="w-full max-w-[500px] h-[80px] flex items-center px-[30px] justify-between relative dark:bg-[#121212]"
    >
      <button @click="emit('navClick')">
        <template v-if="props.navType === 'close'">
          <img :src="close" class="w-[18px] h-[18px] block dark:hidden" />
          <img :src="darkClose" class="w-[18px] h-[18px] hidden dark:block" />
        </template>
        <template v-else>
          <img :src="back" class="w-7 h-7 block dark:hidden" />
          <img :src="darkBack" class="w-7 h-7 hidden dark:block" />
        </template>
      </button>
      <img
        :src="logo"
        class="w-[84px] h-[43px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block dark:hidden"
      />
      <img
        :src="darkLogo"
        class="w-[84px] h-[43px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden dark:block"
      />
      <button v-if="props.menuType" @click="emit('menuClick')">
        <template v-if="props.menuType === 'more'">
          <img :src="more" class="w-5 h-5 block dark:hidden" />
          <img :src="darkMore" class="w-5 h-5 hidden dark:block" />
        </template>
        <template v-else>
          <img :src="setting" class="w-7 h-7 block dark:hidden" />
          <img :src="darkSetting" class="w-7 h-7 hidden dark:block" />
        </template>
      </button>
    </div>
  </header>
</template>
