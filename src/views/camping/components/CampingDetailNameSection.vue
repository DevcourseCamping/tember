<template>
  <div class="w-full relative">
    <div class="m-[10px] p-[20px]">
      <div class="flex items-center gap-2">
        <img :src="bookmarkImage" alt="" class="cursor-pointer" @click="toggleBookmark" />
        <span class="text-md opacity-50 dark:text-white">{{ campingInduty }}</span>
      </div>
      <div class="flex items-center justify-between gap-2 mt-[10px]">
        <span class="text-[20px] font-bold dark:text-white">{{ campingName }}</span>
        <div class="flex items-center gap-4">
          <img :src="caravanImage" alt="" class="w-[24px] h-[24px]" />
          <img :src="trailerImage" alt="" class="w-[24px] h-[24px]" />
          <img :src="petImage" alt="" class="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import light_caravan_off from '../../../assets/icons/light/light-caravan-off.svg'
import light_caravan_on from '../../../assets/icons/light/light-caravan-on.svg'
import light_trailer_on from '../../../assets/icons/light/light-trailer-on.svg'
import light_trailer_off from '../../../assets/icons/light/light-trailer-off.svg'
import light_pet_on from '../../../assets/icons/light/light-pet-on.svg'
import light_pet_off from '../../../assets/icons/light/light-pet-off.svg'
import light_bookmark_filled from '../../../assets/icons/light/light-bookmark-filled.svg'
import light_bookmark_outlined from '../../../assets/icons/light/light-bookmark-outline.svg'
import supabase from '@/utils/supabase'
import { onMounted, ref } from 'vue'

// TODO: 로그인 후 유저 아이디 받아오기
const userId = '15a90d52-1eda-42fe-b59f-075299b3ee79'
const { campingName, campingInduty, campingId, campingCaravan, campingTrailer, campingPet } =
  defineProps({
    campingName: {
      type: String,
      required: true,
    },
    campingInduty: {
      type: String,
      required: true,
    },
    campingId: {
      type: String,
      required: true,
    },
    campingCaravan: {
      type: String,
      required: true,
    },
    campingTrailer: {
      type: String,
      required: true,
    },
    campingPet: {
      type: String,
      required: true,
    },
  })

const bookmarkImage = ref(light_bookmark_outlined)
const caravanImage = ref(light_caravan_off)
const trailerImage = ref(light_trailer_off)
const petImage = ref(light_pet_off)

const toggleBookmark = async () => {
  // TODO: 북마크 추가 및 삭제
  // await supabase.from('bookmarks').insert({
  //   camp_id: campingId,
  // })
}

const getBookmark = async () => {
  try {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*')
      .eq('camp_id', campingId)
      .eq('user_id', userId)

    console.log(data)
    if (error) {
      throw error
    }
    if (data.length > 0) {
      bookmarkImage.value = light_bookmark_filled
    } else {
      bookmarkImage.value = light_bookmark_outlined
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getBookmark()
  if (campingCaravan === 'Y') {
    caravanImage.value = light_caravan_on
  }
  if (campingTrailer === 'Y') {
    trailerImage.value = light_trailer_on
  }
  if (campingPet === '가능' || campingPet === '가능(소형견)') {
    petImage.value = light_pet_on
  }
})
</script>

<style lang="scss" scoped></style>
