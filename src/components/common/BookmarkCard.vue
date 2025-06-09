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

const bookmark = [
  {
    category: '글램핑',
    name: '포천 썬오브 글램핑카라반',
    filter: {
      caravan: true,
      trailer: false,
      pet: false,
    },
    region: '경기도 포천시',
    campingImg:
      'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
    isMarked: true,
  },
]
</script>
<template>
  <div class="p-[30px] flex flex-col gap-[30px]">
    <div
      v-for="(favorite, index) in bookmark"
      :key="index"
      class="relative w-[440px] h-auto border border-[rgba(75,60,47,0.3)] rounded-[5px] cursor-pointer"
    >
      <img
        :src="favorite.campingImg"
        alt="임시 캠핑장 이미지"
        class="w-[440px] h-[216px] rounded-tl-[5px] rounded-tr-[5px]"
      />
      <div class="flex flex-col pl-[15px]">
        <div class="flex items-center justify-between pt-[15px]">
          <p class="text-[15px] text-[#222222]">{{ favorite.category }}</p>
          <img
            :src="favorite.isMarked ? filledBookmarkIcon : outlineBookmarkIcon"
            alt="북마크"
            class="pr-[15px]"
          />
        </div>

        <p class="font-semibold text-[18px]">{{ favorite.name }}</p>
        <p class="text-[#A8AEB2] pt-[5px] text-[15px]">{{ favorite.region }}</p>

        <div class="flex gap-[20px] pb-[20px] pt-[20px]">
          <img
            :src="favorite.filter.caravan ? onCaravanIcon : offCaravanIcon"
            alt="카라반"
            class="w-[24px] h-[24px]"
          />
          <img
            :src="favorite.filter.trailer ? onTrailerIcon : offTrailerIcon"
            alt="트레일러"
            class="w-[24px] h-[24px]"
          />
          <img
            :src="favorite.filter.pet ? onPetIcon : offPetIcon"
            alt="반려동물"
            class="w-[24px] h-[24px]"
          />
        </div>
        <div
          class="absolute right-0 bottom-0 w-[100px] h-[36px] bg-[#4B3C2F] flex items-center justify-center gap-[13px] rounded-tl-[5px] rounded-br-[5px]"
        >
          <p class="text-[#FFFFFF]">4.8</p>
          <img :src="filledStarIcon" alt="별점" class="w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  </div>
</template>
