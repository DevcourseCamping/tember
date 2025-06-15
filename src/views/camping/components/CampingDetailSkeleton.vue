<template>
  <div class="w-full h-[400px] relative">
    <div class="w-full h-full">
      <div
        role="status"
        class="flex items-center justify-center h-full w-full bg-gray-300 rounded-lg dark:bg-gray-700"
      >
        <svg
          class="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <div class="w-full relative">
    <div class="m-[10px] p-[20px] mb-0">
      <div class="flex items-center gap-2">
        <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2"></div>
      </div>
      <div class="flex items-center justify-between gap-2">
        <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="flex items-center gap-4">
          <div class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-7 mb-4"></div>
          <div class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-7 mb-4"></div>
          <div class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-7 mb-4"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-around gap-4 border-b border-b-[--primary-50] p-[20px]">
    <button @click="scrollTo('#basic-info')" class="text-md text-[--black]">기본 정보</button>
    <button @click="scrollTo('#camping-intro')" class="text-md text-[--black-30]">
      캠핑장 소개
    </button>
    <button @click="scrollTo('#location-info')" class="text-md text-[--black-30]">위치 정보</button>
    <button @click="scrollTo('#review')" class="text-md text-[--black-30]">리뷰</button>
  </div>
  <div id="basic-info" class="w-full relative">
    <div class="m-[10px] p-[20px] flex flex-col gap-2">
      <div class="flex items-center justify-start gap-12">
        <span class="text-[--grey] w-[65px]">환경</span>
        <span class="text-[--black]">
          <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div>
        </span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[--grey] w-[65px]">사업주체</span>
        <span class="text-[--black]"
          ><div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div
        ></span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[--grey] w-[65px]">운영기간</span>
        <span class="text-[--black]"
          ><div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div
        ></span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[--grey] w-[65px]">운영일</span>
        <span class="text-[--black]"
          ><div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div
        ></span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[--grey] w-[65px]">예약 방법</span>
        <span class="text-[--black]"
          ><div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div
        ></span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[--grey] w-[65px]">화로대</span>
        <span class="text-[--black]"
          ><div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div
        ></span>
      </div>
    </div>
  </div>
  <hr class="mx-5 border-b border-b-[--primary-50]" />
</template>

<script setup></script>

<style lang="scss" scoped></style>
