<template>
  <div class="flex flex-col gap-[30px]">
    <div
      v-for="n in 3"
      :key="n"
      class="border border-[var(--grey)] opacity-30 rounded-sm py-[15px] animate-pulse"
    >
      <div class="flex items-center gap-4 mb-3">
        <div class="w-[52px] h-[52px] bg-[var(--grey)] rounded-full ml-[15px]"></div>
        <div class="flex flex-col gap-2 flex-1">
          <div class="w-[80px] h-[12px] bg-[var(--grey)] rounded-sm"></div>
          <div class="w-[50px] h-[10px] bg-[var(--grey)] rounded-sm"></div>
        </div>
      </div>
      <div class="w-full h-[390px] bg-[var(--grey)] mb-5"></div>
      <div class="w-full px-5">
        <div class="w-full h-[14px] bg-[var(--grey)] rounded-sm mb-2"></div>
        <div class="w-full h-[14px] bg-[var(--grey)] rounded-sm mb-2"></div>
      </div>

      <div class="flex justify-between items-center mt-[40px] px-5">
        <div class="w-20 h-[30px] bg-[var(--grey)] rounded-sm"></div>
        <div class="flex gap-4">
          <div class="w-[30.78px] h-[20px] bg-[var(--grey)] rounded-sm"></div>
          <div class="w-[30.78px] h-[20px] bg-[var(--grey)] rounded-sm"></div>
        </div>
      </div>
    </div>
  </div>
</template>
