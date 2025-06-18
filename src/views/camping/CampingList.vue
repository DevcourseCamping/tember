<template>
  <!-- 250618 border 삭제 ( header, nav 양 옆 여백 제거 ) -->
  <div
    class="w-full h-screen flex flex-col bg-white dark:bg-[#121212] dark:border-black relative z-20 transition-colors duration-300 md:w-[500px] md:mx-auto 2xl:w-[500px] 2xl:mx-auto"
  >
    <div class="sticky top-0 z-30 bg-white">
      <HeaderSearch @handleFilterClick="handleFilterClick" @update:inputValue="handleInput" />
      <div v-if="isFilterModalOpen" class="fixed inset-0 z-50 overflow-y-auto no-scrollbar">
        <SearchFilter @close="handleFilterClose" @setFilterCampingList="setFilterCampingList" />
      </div>
    </div>

    <div ref="scrollContainer" class="flex-1 overflow-y-auto pb-10 no-scrollbar">
      <BookmarkCard :campingList="campingList" mode="search" />
    </div>

    <NavBar />
  </div>
</template>

<script setup>
import HeaderSearch from '@/components/community/CommunityHeader.vue'
import BookmarkCard from '@/components/common/BookmarkCard.vue'
import NavBar from '@/components/common/NavBar.vue'
import SearchFilter from '@/components/searchfilter/SearchFilter.vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'

import { ref, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import { useCampingStore } from '@/stores/campingStore'

const route = useRoute()
const selectedCategory = ref(route.query.category || null)

const categoryMap = {
  autoCamping: '자동차야영장',
  glamping: '글램핑',
  caravan: '카라반',
  pet: '반려동물',
}

const isFilterModalOpen = ref(false)
const page = ref(1)
const size = ref(10)
const campingList = ref([])
const filterCampingList = ref(false)
const filterRequestBody = ref(null)
const total = ref(0)
const keyword = ref('')
const profile = useUserStore()

const handleFilterClick = () => {
  isFilterModalOpen.value = true
}

const handleFilterClose = () => {
  isFilterModalOpen.value = false
}

const handleInput = async (value) => {
  keyword.value = value
  page.value = 1
  await getCampingList()
}

const setFilterCampingList = (filterCampingList, requestBody, totalNumber) => {
  filterCampingList.value = true
  filterRequestBody.value = requestBody
  const newCampingList = filterCampingList.map((item) => {
    return {
      camp_sites: item,
    }
  })
  campingList.value = newCampingList
  total.value = totalNumber
}

const getCampingList = async () => {
  let user = null
  if (!profile.user) {
    user = await profile.fetchUser()
  }

  const requestBody = {
    ...filterRequestBody.value,
    page: page.value,
    pageSize: size.value,
    userId: user !== null ? user.id : profile.user?.id,
    filters: {},
  }
  if (keyword.value) {
    requestBody.keyword = keyword.value
  }

  if (selectedCategory.value) {
    if (selectedCategory.value === 'pet') {
      requestBody.filters.animalCmgCl = ['가능']
    } else {
      const korCategory = categoryMap[selectedCategory.value]
      if (korCategory) requestBody.filters.induty = [korCategory]
    }
  }

  try {
    const response = await axios.post(
      'https://bszdfvksgtumpbnekvnd.supabase.co/functions/v1/camping',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    total.value = response.data.total
    const newCampingList = response.data.data.map((item) => ({
      camp_sites: item,
    }))
    if (keyword.value !== '' && page.value === 1) {
      campingList.value = newCampingList
    } else {
      campingList.value = [...campingList.value, ...newCampingList]
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword
    page.value = 1
    campingList.value = []
    await getCampingList()
  } else {
    await getCampingList()
  }
  scrollContainer.value?.addEventListener('scroll', handleScroll)
})

watch(
  () => route.query.keyword,
  (newQ) => {
    keyword.value = newQ || null
    page.value = 1
    campingList.value = []
    getCampingList()
  },
)

const isLoading = ref(false)
const scrollContainer = ref(null)

const handleScroll = async () => {
  const el = scrollContainer.value
  if (!el) return

  const scrollBottom = el.scrollTop + el.clientHeight
  if (!isLoading.value && scrollBottom >= el.scrollHeight - 200) {
    if (total.value === campingList.value.length) return
    isLoading.value = true
    page.value++
    await getCampingList()
    isLoading.value = false
  }
}

const campingStore = useCampingStore()

onMounted(async () => {
  // store에 값이 있으면 여기서 종료 없으면 아래 getCampingList() 호출
  if (campingStore.campingList.length > 0) {
    campingList.value = campingStore.campingList
    return
  }

  if (!filterCampingList.value) {
    await getCampingList()
  }
  scrollContainer.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)

  // store 초기화
  campingStore.campingList = []
  campingStore.total = 0
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

html,
body {
  overflow: auto;
}
</style>
