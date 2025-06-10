<template>
  <div
    class="w-full min-h-screen bg-white border-l border-r border-gray-200 relative z-20 transition-colors duration-300 md:w-[500px] md:mx-auto 2xl:w-[500px] 2xl:mx-auto"
  >
    <HeaderSearch />
    <div class="pb-10">
      <template v-for="item in 5" :key="item">
        <BookmarkCard />
      </template>
    </div>
    <NavBar />
  </div>
</template>

<script setup>
import HeaderSearch from '@/components/common/HeaderSearch.vue'
import BookmarkCard from '@/components/common/BookmarkCard.vue'
import NavBar from '@/components/common/NavBar.vue'
</script>

<style lang="scss" scoped></style>
