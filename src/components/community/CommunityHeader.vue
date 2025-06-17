<script setup>
import logo from '@/assets/icons/logo-white.svg'
import filter from '@/assets/icons/light/light-filter.svg'
import arrow from '@/assets/icons/light/light-arrow-down.svg'
import search from '@/assets/icons/light/light-search.svg'
import d_filter from '@/assets/icons/dark/dark-filter.svg'
import d_arrow from '@/assets/icons/dark/dark-arrow-down.svg'
import d_search from '@/assets/icons/dark/dark-search.svg'

import { ref } from 'vue'

const props = defineProps({
  iconType: {
    type: String,
    default: 'filter', // filter, arrow
  },
})
// 20250613 검색 페이지 사용을 위한 로직 추가
const emit = defineEmits(['iconClick', 'update:inputValue', 'handleFilterClick'])
// end

const inputValue = ref('')

const handleInput = (e) => {
  inputValue.value = e.target.value
  emit('update:inputValue', inputValue.value)
}
</script>

<template>
  <header
    class="bg-[var(--primary)] dark:bg-[#181818] w-full max-w-[500px] flex flex-col items-center pt-5 px-[30px] pb-[30px]"
  >
    <img :src="logo" class="w-[106px] h-[53px] mb-5" />
    <div
      class="w-full relative h-[45px] flex items-center justify-between bg-[var(--white)] dark:bg-[#3a3a3a] rounded-[5px] px-5 py-3"
    >
      <div class="flex items-center w-full">
        <img :src="search" class="w-5 h-5 mr-[30px] block dark:hidden" />
        <img :src="d_search" class="w-5 h-5 mr-[30px] hidden dark:block" />
        <input
          :value="inputValue"
          type="text"
          placeholder="검색하기"
          class="flex-grow h-full dark:bg-[#3a3a3a] focus:outline-none placeholder:text-[var(--grey)] dark:placeholder:text-[#ffffff50] text-[15px]"
          @input="handleInput"
        />
        <!-- 20250613 검색 페이지 사용을 위한 로직 추가 -->

        <button @click="emit('iconClick')" v-if="props.iconType === 'arrow'">
          <img :src="arrow" class="w-5 h-5 ml-5 block dark:hidden" />
          <img :src="d_arrow" class="w-5 h-5 ml-5 hidden dark:block" />
        </button>
        <button @click="emit('handleFilterClick')" v-else>
          <img :src="filter" class="w-5 h-5 ml-5 block dark:hidden" />
          <img :src="d_filter" class="w-5 h-5 ml-5 hidden dark:block" />
        </button>
        <!-- end -->
      </div>
    </div>
  </header>
</template>
