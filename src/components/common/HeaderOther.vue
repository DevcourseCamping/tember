<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import logo2 from '@/assets/icons/logo-white.svg'
/* import close from '@/assets/icons/close-brown.svg' */
import back from '@/assets/icons/light/light-back-header.svg'
import back2 from '@/assets/icons/dark/dark-back-header.svg'
/* import more from '@/assets/icons/light/light-more.svg' */
import setting from '@/assets/icons/light/light-setting.svg'
import setting2 from '@/assets/icons/dark/dark-setting.svg'
import { computed } from 'vue';
import { useDark } from '@vueuse/core';
/* import ThemeIcon from '@/components/common/ThemeIcon.vue' */

const isDark = useDark();

const logoSrc = computed(() => {
  return isDark.value ? logo2 : logo;
});

const backSrc = computed(() => {
  return isDark.value ? back2 : back;
});

const settingSrc = computed(() => {
  return isDark.value ? setting2 : setting;
});

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
    <div class="w-full max-w-[500px] h-[80px] flex items-center px-[30px] justify-between relative">
      <button @click="emit('navClick')">
  <img
        :src="backSrc" class="w-7 h-7" />
</button>
      <img
        :src="logoSrc"
        class="w-[84px] h-[43px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <button v-if="props.menuType" @click="emit('menuClick')">
  <img
        :src="settingSrc" class="w-7 h-7" />
</button>
    </div>
  </header>
</template>
