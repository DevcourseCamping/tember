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
        class="bg-[var(--primary)] w-[460px] h-[55px] border-b border-[rgba(255,255,255,0.2)] flex items-center"
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

<!-- white ver -->
<!-- <script setup></script>
<template>
  <section
    class="flex flex-col absolute bottom-0 w-full bg-white border border[rgba(75,60,47,0.3)] rounded-t-[15px]"
  >
    <header class="flex justify-between pt-6 pb-4 px-[30px] items-center">
      <p class="text-xl font-bold">작업 선택</p>
      <img src="@/assets/icons/close-brown.svg" alt="" class="w-[18px] h-[18px] cursor-pointer" />
    </header>
    <div class="w-full flex flex-col px-5">
      <div class="w-[460px] h-[55px] border-b border-[rgba(75,60,47,0.3)] flex items-center">
        <p class="ml-[25px] text-lg cursor-pointer">게시글 수정</p>
      </div>
      <div class="w-[460px] h-[55px] flex items-center">
        <p class="ml-[25px] text-[#FF2B41] text-lg cursor-pointer">게시글 삭제</p>
      </div>
    </div>
  </section>
</template>
<style scoped></style> -->
