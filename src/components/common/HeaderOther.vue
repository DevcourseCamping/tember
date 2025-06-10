<script setup>
import logo from '@/assets/icons/logo-brown.svg'
import close from '@/assets/icons/close-brown.svg'
import back from '@/assets/icons/light/light-back-header.svg'
import more from '@/assets/icons/light/light-more.svg'
import setting from '@/assets/icons/light/light-setting.svg'

const props = defineProps({
  navType: {
    type: String, // close, back
    default: 'close',
  },
  menuType: {
    type: String, // more, setting
    default: 'more',
  },
})
const emit = defineEmits(['navClick', 'menuClick'])
</script>

<template>
  <header>
    <div class="w-[500px] h-[80px] flex items-center px-[30px] justify-between">
      <button @click="emit('navClick')">
        <img v-if="props.navType === 'close'" :src="close" class="w-5 h-5" />
        <img v-else :src="back" class="w-7 h-7" />
      </button>
      <img :src="logo" class="w-[84px] h-[43px]" />
      <button @click="emit('menuClick')">
        <img v-if="props.menuType === 'more'" :src="more" class="w-5 h-5" />
        <img v-else :src="setting" class="w-7 h-7" />
      </button>
    </div>
  </header>
</template>
