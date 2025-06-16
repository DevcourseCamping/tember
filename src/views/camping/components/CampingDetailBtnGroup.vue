<template>
  <div class="flex items-center justify-around gap-4 border-b border-b-[#4B3C2F50] p-[20px]">
    <button @click="scrollTo('#basic-info')" class="text-[15px] text-[#222222] dark:text-white">
      기본 정보
    </button>
    <button
      @click="scrollTo('#camping-intro')"
      class="text-[15px] text-[#22222230] dark:text-[#dbdbdb90]"
    >
      캠핑장 소개
    </button>
    <button
      @click="scrollTo('#location-info')"
      class="text-[15px] text-[#22222230] dark:text-[#dbdbdb90]"
    >
      위치 정보
    </button>
    <button @click="scrollTo('#review')" class="text-[15px] text-[#22222230] dark:text-[#dbdbdb90]">
      리뷰
    </button>
  </div>
</template>

<script setup>
const scrollTo = (id) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="scss" scoped></style>
