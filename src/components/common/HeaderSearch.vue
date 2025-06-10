<script setup>
import logo from '@/assets/icons/logo-white.svg'
import filter from '@/assets/icons/light/light-filter.svg'
import arrow from '@/assets/icons/light/light-arrow-down.svg'
import search from '@/assets/icons/light/light-search.svg'

const props = defineProps({
  iconType: {
    type: String,
    default: 'filter', // filter, arrow
  },
})
const emit = defineEmits(['iconClick'])
</script>

<template>
  <header class="w-[500px] bg-[var(--primary)] flex flex-col items-center pt-5 py-[30px] pb-[30px]">
    <img :src="logo" class="w-[106px] h-[53px] mb-5" />
    <div
      class="relative w-[440px] h-[45px] flex items-center justify-between bg-[var(--white)] rounded-[5px] px-5 py-3"
    >
      <div class="flex items-center">
        <img :src="search" class="w-5 h-5 mr-[30px]" />
        <input
          type="text"
          placeholder="검색하기"
          class="w-[330px] h-full focus:outline-none placeholder:text-[var(--grey)] text-[15px]"
        />
        <button @click="emit('iconClick')">
          <img :src="props.iconType === 'arrow' ? arrow : filter" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
</template>
