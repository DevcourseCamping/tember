<script setup>
import onCaravanIcon from '../../assets/icons/light/light-caravan-on.svg'
import offCaravanIcon from '../../assets/icons/light/light-caravan-off.svg'
import onPetIcon from '../../assets/icons/light/light-pet-on.svg'
import offPetIcon from '../../assets/icons/light/light-pet-off.svg'
import onTrailerIcon from '../../assets/icons/light/light-trailer-on.svg'
import offTrailerIcon from '../../assets/icons/light/light-trailer-off.svg'
import filledStarIcon from '../../assets/icons/star-filled.svg'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref, watch, toRefs } from 'vue'
import { useUserApi } from '@/composables/useUserApi'
import BookmarkSkeleton from '../mypage/BookmarkSkeleton.vue'
import BookmarkToggle from './BookmarkToggle.vue'

const profile = useUserStore()
const bookmarks = ref([])
const defaultImage =
  'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D'
const isLoading = ref(true)

// 20250616 캠핑장 검색 리스트 로직 추가
const props = defineProps({
  campingList: {
    type: Array,
  },
  mode: {
    type: String,
    default: 'bookmark',
  },
})

const getBookmark = async () => {
  const { getBookmark } = useUserApi()
  const user = await profile.fetchUser()
  if (!user || !user.id) {
    isLoading.value = false
    return
  }

  try {
    const bookmarkData = await getBookmark(user.id)
    bookmarks.value = bookmarkData.map((item) => {
      const site = item.camp_sites || {}
      return {
        ...item,
        filter: {
          pet: site.animal_cmg_cl === '가능',
          caravan: site.carav_acmpny_at === 'Y',
          trailer: site.trler_acmpny_at === 'Y',
        },
      }
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  if (props.mode === 'bookmark') {
    await getBookmark()
  }
})

const { campingList, mode } = toRefs(props)

watch(
  campingList,
  (newVal) => {
    if (mode.value === 'search') {
      bookmarks.value = newVal
      isLoading.value = false
    }
  },
  { immediate: true },
)
</script>
<template>
  <div class="p-[30px] flex flex-col">
    <div v-if="isLoading">
      <BookmarkSkeleton v-for="n in 2" :key="n" class="mb-[30px]" />
    </div>
    <div
      v-else-if="bookmarks.length === 0"
      class="text-center text-[var(--grey)] text-[14px] flex items-center justify-center h-[calc(100vh-450px)]"
    >
      북마크한 캠핑장이 없습니다.
    </div>
    <div v-else>
      <div
        v-for="item in bookmarks"
        :key="item.camp_sites.content_id"
        class="mb-[30px] relative border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
      >
        <router-link :to="`/camping/${item.camp_sites.content_id}`">
          <img
            :src="item.camp_sites.first_image_url ? item.camp_sites.first_image_url : defaultImage"
            alt="임시 캠핑장 이미지"
            class="w-[440px] h-[216px] rounded-tl-[5px] rounded-tr-[5px]"
          />
          <div class="flex flex-col pl-[15px]">
            <div class="flex items-center justify-between pt-[15px]">
              <p class="text-[14px] text-[var(--black)]">{{ item.camp_sites.induty }}</p>
              <BookmarkToggle
                :campingId="item.camp_sites.content_id"
                :isBookmark="mode === 'search' ? item.camp_sites.bookmark : true"
              />
            </div>

            <p class="font-semibold text-[17px]">{{ item.camp_sites.faclt_nm }}</p>
            <p class="text-[var(--grey)] pt-[5px] text-[15px]">{{ item.camp_sites.sigungu_nm }}</p>

            <div class="flex gap-[20px] pb-[20px] pt-[20px]">
              <img
                :src="item.camp_sites.carav_acmpny_at === 'Y' ? onCaravanIcon : offCaravanIcon"
                alt="카라반"
                class="w-[24px] h-[24px]"
              />
              <img
                :src="item.camp_sites.trler_acmpny_at === 'Y' ? onTrailerIcon : offTrailerIcon"
                alt="트레일러"
                class="w-[24px] h-[24px]"
              />
              <img
                :src="item.camp_sites.animal_cmg_cl === '가능' ? onPetIcon : offPetIcon"
                alt="반려동물"
                class="w-[24px] h-[24px]"
              />
            </div>
            <div
              class="absolute right-0 bottom-0 w-[100px] h-[36px] bg-[var(--primary)] flex items-center justify-center gap-[13px] rounded-tl-[5px] rounded-br-[5px]"
            >
              <p class="text-[var(--white)]">
                {{ item.camp_sites.avg_rating ? item.camp_sites.avg_rating.toFixed(1) : '미평가' }}
              </p>
              <img :src="filledStarIcon" alt="별점" class="w-[20px] h-[20px]" />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
