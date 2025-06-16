<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { useUserApi } from '@/composables/useUserApi'
import BookmarkSkeleton from '../mypage/BookmarkSkeleton.vue'
import ThemeIcon from '@/components/common/ThemeIcon.vue'
import filledStarIcon from '../../assets/icons/star-filled.svg'
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';

const theme = useThemeStore();
const isDark = computed(() => theme.isDark);

const profile = useUserStore()
const bookmarks = ref([])
const defaultImage =
  'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D'
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
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
        isMarked: true,
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
})
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
        :key="item.camp_id"
        class="mb-[30px] relative bg-[var(--color-surface)] rounded-[5px] cursor-pointer border border-[var(--primary-30)]"
      >
        <img
          :src="item.camp_sites.first_image_url ? item.camp_sites.first_image_url : defaultImage"
          alt="임시 캠핑장 이미지"
          class="w-full h-[216px] rounded-tl-[5px] rounded-tr-[5px] object-cover"
        />
        <div class="flex flex-col pl-[15px]">
          <div class="flex items-center justify-between pt-[15px]">
            <p class="text-[13px] text-[var(--color-text-primary)]">{{ item.camp_sites.induty }}</p>
            <ThemeIcon
              :name="item.isMarked ? 'bookmark-filled' : 'bookmark-outline'"
              :is-dark="isDark"
              alt="북마크"
              class="pr-[15px] w-[39px] h-[24px]"
            />
          </div>

          <p class="font-semibold text-[19px]">{{ item.camp_sites.faclt_nm }}</p>
          <p class="text-[var(--grey)] pt-[5px] text-[13px]">{{ item.camp_sites.sigungu_nm }}</p>

          <div class="flex gap-[20px] pb-[20px] pt-[20px]">
            <ThemeIcon
              :name="item.filter?.caravan ? 'caravan-on' : 'caravan-off'"
              :is-dark="isDark"
              alt="카라반"
              class="w-[24px] h-[24px]"
            />
            <ThemeIcon
              :name="item.filter?.trailer ? 'trailer-on' : 'trailer-off'"
              :is-dark="isDark"
              alt="트레일러"
              class="w-[24px] h-[24px]"
            />
            <ThemeIcon
              :name="item.filter?.pet ? 'pet-on' : 'pet-off'"
              :is-dark="isDark"
              alt="반려동물"
              class="w-[24px] h-[24px]"
            />
          </div>
          <div
            class="absolute right-0 bottom-0 w-[100px] h-[36px] bg-[var(--primary)] flex items-center justify-center gap-[13px] rounded-tl-[5px] rounded-br-[5px]"
          >
            <p class="text-[var(--icon-text)]">4.8</p>
            <img :src="filledStarIcon" alt="별점" class="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>