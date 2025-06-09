<!-- brown ver -->
<script setup></script>
<template>
  <section class="flex flex-col absolute bottom-0 w-full bg-[var(--primary)] rounded-t-[15px]">
    <header class="flex justify-between pt-6 pb-4 px-[30px] items-center">
      <p class="text-xl text-[var(--white)] font-bold">작업 선택</p>
      <img src="@/assets/icons/close-white.svg" alt="" class="w-[18px] h-[18px] cursor-pointer" />
    </header>
    <div class="w-full flex flex-col px-5">
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] border-b border-[var(--white-20)] flex items-center"
      >
        <p class="ml-[25px] text-[var(--white)] text-lg cursor-pointer">게시글 수정</p>
      </div>
      <div class="bg-[var(--primary)] w-[460px] h-[55px] flex items-center">
        <p class="ml-[25px] text-[var(--red)] text-lg cursor-pointer">게시글 삭제</p>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
