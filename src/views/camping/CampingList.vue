<template>
  <div
    class="w-full min-h-screen bg-white border-l border-r border-gray-200 relative z-20 transition-colors duration-300 md:w-[500px] md:mx-auto 2xl:w-[500px] 2xl:mx-auto"
  >
    <div class="sticky top-0 z-30 bg-white">
      <HeaderSearch @handleFilterClick="handleFilterClick" />
      <div v-if="isFilterModalOpen" class="fixed inset-0 z-50 bg-white overflow-y-auto">
        <SearchFilter @close="handleFilterClose" @setFilterCampingList="setFilterCampingList" />
      </div>
    </div>
    <div class="flex-1 overflow-y-auto pb-10">
      <BookmarkCard />
    </div>
    <NavBar />
  </div>
</template>

<script setup>
import HeaderSearch from '@/components/community/CommunityHeader.vue'
import BookmarkCard from '@/components/common/BookmarkCard.vue'
import NavBar from '@/components/common/NavBar.vue'
import SearchFilter from '@/components/searchfilter/SearchFilter.vue'

import { ref } from 'vue'

const isFilterModalOpen = ref(false)

const filterCampingList = ref([])

const handleFilterClick = () => {
  isFilterModalOpen.value = true
}

const handleFilterClose = () => {
  isFilterModalOpen.value = false
}

const setFilterCampingList = (campingList) => {
  filterCampingList.value = campingList
  console.log('filterCampingList', filterCampingList.value)
}
</script>

<style lang="scss" scoped></style>
