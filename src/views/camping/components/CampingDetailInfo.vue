<template>
  <div id="camping-intro">
    <div class="m-[10px] p-[20px]">
      <span class="text-[--black] text-md font-bold dark:text-white">캠핑장 소개</span>
      <div class="mt-[30px] dark:text-white">
        {{ campingIntro || '-' }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { campingIntro } = defineProps({
  campingIntro: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
