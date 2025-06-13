<script setup>
import logo from '@/assets/icons/logo-white.svg'
import filter from '@/assets/icons/light/light-filter.svg'
import search from '@/assets/icons/light/light-search.svg'
import auto from '@/assets/icons/light/light-auto-camping-button.svg'
import glamping from '@/assets/icons/light/light-glamping-button.svg'
import caravan from '@/assets/icons/light/light-caravan-button.svg'
import pet from '@/assets/icons/light/light-pet-button.svg'
import chatbot from '@/assets/icons/chatbot-white.svg'

const emit = defineEmits(['filterClick', 'categoryClick'])
</script>

<template>
  <header class="bg-[var(--primary)] flex flex-col items-center pt-5 py-[30px] pb-[25px]">
    <img :src="logo" class="w-[106px] h-[53px] mb-5" />
    <section
      class="relative w-[440px] h-[45px] flex items-center justify-between bg-[var(--white)] rounded-[5px] px-5 py-3"
    >
      <div class="flex items-center">
        <img :src="search" class="w-5 h-5 mr-[30px]" />
        <input
          type="text"
          placeholder="검색하기"
          class="w-[330px] h-full focus:outline-none placeholder:text-[var(--grey)] text-[15px]"
        />
        <button @click="emit('filterClick')">
          <img :src="filter" class="w-5 h-5" />
        </button>
      </div>
    </section>
    <section class="flex w-full px-[30px] pt-[25px] justify-between">
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'autoCamping')">
        <img :src="auto" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[var(--white)]">오토캠핑</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'glamping')">
        <img :src="glamping" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[var(--white)]">글램핑</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'caravan')">
        <img :src="caravan" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[var(--white)]">카라반</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'pet')">
        <img :src="pet" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[var(--white)]">반려동물</span>
      </button>
      <button class="flex flex-col items-center" @click="emit('categoryClick', 'chatbot')">
        <img :src="chatbot" class="w-[45px] h-[45px]" />
        <span class="text-sm mt-[5px] text-[var(--white)]">챗봇</span>
      </button>
    </section>
  </header>
</template>
