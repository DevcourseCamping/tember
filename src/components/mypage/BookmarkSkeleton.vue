<script setup></script>
<template>
  <div class="mb-[30px] relative border border-[var(--primary-30)] rounded-[5px] cursor-pointer">
    <div
      class="w-[440px] h-[216px] rounded-tl-[5px] rounded-tr-[5px] bg-[var(--grey)] opacity-30"
    ></div>
    <div class="flex flex-col pl-[15px]">
      <div class="flex items-center justify-between pt-[15px]">
        <div class="bg-[var(--grey)] opacity-30 w-[100px] h-[14px] rounded-sm"></div>
        <div class="mr-[15px] bg-[var(--grey)] opacity-30 w-[20px] h-[25px] rounded-sm"></div>
      </div>

      <div class="w-[100px] h-[15px] bg-[var(--grey)] rounded-sm opacity-30 mb-[10px]"></div>
      <div class="w-[70px] h-[14px] bg-[var(--grey)] rounded-sm opacity-30"></div>

      <div class="flex gap-[20px] pb-[20px] pt-[20px]">
        <div class="w-[24px] h-[24px] bg-[var(--grey)] opacity-30 rounded-sm"></div>
        <div class="w-[24px] h-[24px] bg-[var(--grey)] opacity-30 rounded-sm"></div>
        <div class="w-[24px] h-[24px] bg-[var(--grey)] opacity-30 rounded-sm"></div>
      </div>
      <div
        class="absolute right-0 bottom-0 w-[100px] h-[36px] bg-[var(--grey)] opacity-30 flex items-center justify-center gap-[13px] rounded-tl-[5px] rounded-br-[5px]"
      >
        <div class="w-[20px] h-[20px] bg-[var(--grey)] opacity-30" />
      </div>
    </div>
  </div>
</template>
