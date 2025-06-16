<script setup>
import logo from '@/assets/icons/logo-white.svg'
/* import filter from '@/assets/icons/light/light-filter.svg'
import search from '@/assets/icons/light/light-search.svg'
import auto from '@/assets/icons/light/light-auto-camping-button.svg'
import glamping from '@/assets/icons/light/light-glamping-button.svg'
import caravan from '@/assets/icons/light/light-caravan-button.svg'
import pet from '@/assets/icons/light/light-pet-button.svg'
import chatbot from '@/assets/icons/chatbot-white.svg' */
import ThemeIcon from '@/components/common/ThemeIcon.vue'
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';

const theme = useThemeStore();
const isDark = computed(() => theme.isDark);

const emit = defineEmits(['filterClick', 'categoryClick'])
</script>

<template>
  <header class="bg-[var(--primary)] flex flex-col items-center pt-5 py-[30px] pb-[25px]">
    <img :src="logo" class="w-[106px] h-[53px] mb-5" />
    <section class="px-[30px]">
      <div
        class="relative h-[45px] flex items-center justify-between bg-[var(--popular)] rounded-[5px] px-5 py-3"
      >
        <div class="flex items-center w-full">
          <ThemeIcon name="search" :is-dark="isDark" class="w-5 h-5 mr-[30px]" />
          <input
            type="text"
            placeholder="검색하기"
            class="w-[330px] h-full focus:outline-none placeholder:text-[var(--grey)] text-[15px] bg-[var(--popular)]"
          />
          <button @click="emit('filterClick')">
            <ThemeIcon name="filter" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
    <section class="flex w-full px-[30px] pt-[25px] justify-between">
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'autoCamping')">
        <ThemeIcon name="autoCamping" :is-dark="isDark" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[--icon-text]">오토캠핑</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'glamping')">
        <ThemeIcon name="glamping" :is-dark="isDark" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[--icon-text]">글램핑</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'caravan')">
        <ThemeIcon name="caravan" :is-dark="isDark" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[--icon-text]">카라반</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'pet')">
        <ThemeIcon name="pet" :is-dark="isDark" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[--icon-text]">반려동물</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'chatbot')">
        <ThemeIcon name="chatbot" :is-dark="isDark" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[--icon-text]">챗봇</span>
      </button>
    </section>
  </header>
</template>
