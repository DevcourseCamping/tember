<script setup>
defineProps({
  label: String,
})
</script>
<template>
  <div
    class="inline-flex items-center justify-center h-[25px] px-[15px] rounded-[20px] text-[14px] text-[#222222] border border-[#4B3C2F] cursor-pointer whitespace-nowrap"
  >
    {{ label }}
  </div>
</template>
<style scoped></style>
