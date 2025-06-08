<script setup></script>
<template>
  <section class="flex flex-col absolute bottom-0 w-full bg-[#4B3C2F] rounded-t-[15px]">
    <header class="flex justify-between pt-6 pb-4 px-[30px] items-center">
      <p class="text-xl text-white font-bold">작업 선택</p>
      <img src="@/assets/icons/close-white.svg" alt="" class="w-[18px] h-[18px] cursor-pointer" />
    </header>
    <div class="w-full flex flex-col px-5">
      <div
        class="bg-[#4B3C2F] w-[460px] h-[55px] border-b border-[rgba(255,255,255,0.2)] flex items-center"
      >
        <p class="ml-[25px] text-white text-lg cursor-pointer">게시글 수정</p>
      </div>
      <div class="bg-[#4B3C2F] w-[460px] h-[55px] rounded-[50px] flex items-center">
        <p class="ml-[25px] text-[#FF2B41] text-lg cursor-pointer">게시글 삭제</p>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
