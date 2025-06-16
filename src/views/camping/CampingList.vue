<template>
  <div
    class="fixed w-full max-w-[500px] h-screen bg-[--white] left-1/2 -translate-x-1/2 z-20 transition-colors duration-300"
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
