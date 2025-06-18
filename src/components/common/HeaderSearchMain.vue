<script setup>
import logo from '@/assets/icons/logo-white.svg'
import filter from '@/assets/icons/light/light-filter.svg'
import darkfilter from '@/assets/icons/dark/dark-filter.svg'
import search from '@/assets/icons/light/light-search.svg'
import darksearch from '@/assets/icons/dark/dark-search.svg'
import auto from '@/assets/icons/light/light-auto-camping-button.svg'
import darkauto from '@/assets/icons/dark/dark-auto-camping-button.svg'
import glamping from '@/assets/icons/light/light-glamping-button.svg'
import darkglamping from '@/assets/icons/dark/dark-glamping-button.svg'
import caravan from '@/assets/icons/light/light-caravan-button.svg'
import darkcaravan from '@/assets/icons/dark/dark-caravan-button.svg'
import pet from '@/assets/icons/light/light-pet-button.svg'
import darkpet from '@/assets/icons/dark/dark-pet-button.svg'
/* import chatbot from '@/assets/icons/chatbot-white.svg' */

const emit = defineEmits(['filterClick', 'categoryClick'])
</script>

<template>
  <header
    class="bg-[var(--primary)] flex flex-col items-center pt-5 pb-[22px] dark:bg-[#181818] px-[30px]"
  >
    <img :src="logo" class="w-[106px] h-[53px]" />

    <section class="w-full mt-[22px]">
      <div
        class="relative h-[45px] flex items-center bg-[var(--white)] dark:bg-[#3a3a3a] rounded-[5px]"
      >
        <div
          class="w-full relative h-[45px] flex items-center justify-between bg-[var(--white)] dark:bg-[#3a3a3a] rounded-[5px] px-5 py-3"
        >
          <img :src="search" class="w-5 h-5 mr-[30px] block dark:hidden" />
          <img :src="darksearch" class="w-5 h-5 mr-[30px] hidden dark:block" />
          <input
            type="text"
            placeholder="검색하기"
            class="w-full h-full focus:outline-none placeholder:text-[var(--grey)] text-[15px] bg-transparent dark:text-white"
          />
          <button @click="emit('filterClick')">
            <img :src="filter" class="w-6 h-6 block dark:hidden" />
            <img :src="darkfilter" class="w-5 h-5 hidden dark:block" />
          </button>
        </div>
      </div>
    </section>

    <section class="flex w-full mt-[23px] justify-around">
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'autoCamping')">
        <img :src="auto" class="w-[45px] h-[45px] block dark:hidden" />
        <img :src="darkauto" class="w-[45px] h-[45px] hidden dark:block" />
        <span class="text-sm mt-[5px] text-[var(--white)]">오토캠핑</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'glamping')">
        <img :src="glamping" class="w-[45px] h-[45px] block dark:hidden" />
        <img :src="darkglamping" class="w-[45px] h-[45px] hidden dark:block" />
        <span class="text-sm mt-[5px] text-[var(--white)]">글램핑</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'caravan')">
        <img :src="caravan" class="w-[45px] h-[45px] block dark:hidden" />
        <img :src="darkcaravan" class="w-[45px] h-[45px] hidden dark:block" />
        <span class="text-sm mt-[5px] text-[var(--white)]">카라반</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'pet')">
        <img :src="pet" class="w-[45px] h-[45px] block dark:hidden" />
        <img :src="darkpet" class="w-[45px] h-[45px] hidden dark:block" />
        <span class="text-sm mt-[5px] text-[var(--white)]">반려동물</span>
      </button>
    </section>
  </header>
</template>
