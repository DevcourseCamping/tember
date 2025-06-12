<script setup>
import filledBookmarkIcon from '../../assets/icons/light/light-bookmark-filled.svg'
import outlineBookmarkIcon from '../../assets/icons/light/light-bookmark-outline.svg'

import onCaravanIcon from '../../assets/icons/light/light-caravan-on.svg'
import offCaravanIcon from '../../assets/icons/light/light-caravan-off.svg'
import onPetIcon from '../../assets/icons/light/light-pet-on.svg'
import offPetIcon from '../../assets/icons/light/light-pet-off.svg'
import onTrailerIcon from '../../assets/icons/light/light-trailer-on.svg'
import offTrailerIcon from '../../assets/icons/light/light-trailer-off.svg'
import filledStarIcon from '../../assets/icons/star-filled.svg'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { useUserApi } from '@/composables/user'

const profile = useUserStore()
const bookmarks = ref([])

onMounted(async () => {
  const { getBookmark } = useUserApi()
  const user = await profile.fetchUser()
  if (!user || !user.id) return

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

  // console.log(bookmarkData)
})
</script>
<template>
  <div class="p-[30px] flex flex-col">
    <div
      v-if="bookmarks.length === 0"
      class="text-center text-[var(--grey)] text-[14px] flex items-center justify-center h-[calc(100vh-450px)]"
    >
      북마크한 캠핑장이 없습니다.
    </div>
    <div v-else>
      <div
        v-for="item in bookmarks"
        :key="item.camp_id"
        class="mb-[30px] relative border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
      >
        <img
          v-if="item.camp_sites.first_image_url"
          :src="item.camp_sites.first_image_url"
          alt="임시 캠핑장 이미지"
          class="w-[440px] h-[216px] rounded-tl-[5px] rounded-tr-[5px]"
        />
        <div class="flex flex-col pl-[15px]">
          <div class="flex items-center justify-between pt-[15px]">
            <p class="text-[14px] text-[var(--black)]">{{ item.camp_sites.induty }}</p>
            <img
              :src="item.isMarked ? filledBookmarkIcon : outlineBookmarkIcon"
              alt="북마크"
              class="pr-[15px]"
            />
          </div>

          <p class="font-semibold text-[17px]">{{ item.camp_sites.faclt_nm }}</p>
          <p class="text-[var(--grey)] pt-[5px] text-[15px]">{{ item.camp_sites.sigungu_nm }}</p>

          <div class="flex gap-[20px] pb-[20px] pt-[20px]">
            <img
              :src="item.filter?.caravan ? onCaravanIcon : offCaravanIcon"
              alt="카라반"
              class="w-[24px] h-[24px]"
            />
            <img
              :src="item.filter?.trailer ? onTrailerIcon : offTrailerIcon"
              alt="트레일러"
              class="w-[24px] h-[24px]"
            />
            <img
              :src="item.filter?.pet ? onPetIcon : offPetIcon"
              alt="반려동물"
              class="w-[24px] h-[24px]"
            />
          </div>
          <div
            class="absolute right-0 bottom-0 w-[100px] h-[36px] bg-[var(--primary)] flex items-center justify-center gap-[13px] rounded-tl-[5px] rounded-br-[5px]"
          >
            <p class="text-[var(--white)]">4.8</p>
            <img :src="filledStarIcon" alt="별점" class="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
