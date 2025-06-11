<template>
  <div class="flex flex-col gap-[30px]">
    <div
      v-for="n in 3"
      :key="n"
      class="border border-[var(--grey)] rounded-[5px] p-[15px] animate-pulse"
    >
      <div class="flex items-center gap-4 mb-3">
        <div class="w-[52px] h-[52px] bg-[var(--grey)] rounded-full"></div>
        <div class="flex flex-col gap-2 flex-1">
          <div class="w-[100px] h-[12px] bg-[var(--grey)] rounded"></div>
          <div class="w-[70px] h-[10px] bg-[var(--grey)] rounded"></div>
        </div>
      </div>
      <div class="w-full h-[200px] bg-[var(--grey)] rounded mb-3"></div>
      <div class="w-full h-[12px] bg-[var(--grey)] rounded mb-2"></div>
      <div class="w-[80%] h-[12px] bg-[var(--grey)] rounded mb-4"></div>
      <div class="flex justify-between items-center">
        <div class="w-[70px] h-[24px] bg-[var(--grey)] rounded"></div>
        <div class="flex gap-4">
          <div class="w-[40px] h-[20px] bg-[var(--grey)] rounded"></div>
          <div class="w-[40px] h-[20px] bg-[var(--grey)] rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>
