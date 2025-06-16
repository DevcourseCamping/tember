<script setup>
import logo from '@/assets/icons/logo-white.svg'
import ThemeIcon from '@/components/common/ThemeIcon.vue'
const emit = defineEmits(['filterClick'])
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
  </header>
</template>

<style scoped></style>
