<template>
  <div class="w-full h-[400px] relative">
    <div class="w-full h-full">
      <img
        :src="
          props.campingImage ||
          'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        "
        alt=""
        class="w-full h-full object-cover rounded-b-[20px]"
      />
    </div>
    <div class="absolute top-[20px] left-[20px] z-10">
      <img
        :src="themeStore.isDark ? dark_back_button : light_back_button"
        alt=""
        class="w-[60px] h-[60px] cursor-pointer"
        @click="handleClickBackButton"
      />
    </div>
    <div
      class="absolute bottom-0 right-0 z-10 bg-[#4B3C2F] dark:bg-[#2A2A2A] w-[100px] h-[40px] flex items-center justify-center gap-2 rounded-br-[20px] rounded-tl-[20px]"
    >
      <span class="text-white text-[14px]">{{ reviewStar }}</span>
      <img :src="star_filled" alt="" class="w-[20px] h-[20px]" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import light_back_button from '../../../assets/icons/light/light-back-button.svg'
import dark_back_button from '../../../assets/icons/dark/dark-back-button.svg'
import star_filled from '../../../assets/icons/star-filled.svg'
import { useThemeStore } from '@/stores/theme'
import { useRoute } from 'vue-router'

const route = useRoute()
const mode = route.query.mode

const themeStore = useThemeStore()

const router = useRouter()

const handleClickBackButton = () => {
  if (mode === 'bookmark') {
    router.push('/mypage')
  } else {
    router.push('/search')
  }
}

const props = defineProps({
  campingImage: {
    type: String,
    required: true,
  },
  review: {
    type: Object,
    required: true,
  },
})

const reviewStar = computed(() => {
  if (props.review.length === 0) {
    return '미평가'
  }

  const totalStar = props.review.reduce((acc, cur) => acc + (cur.star_rating ?? 0), 0)
  const averageStar = props.review.length > 0 ? totalStar / props.review.length : 0

  return averageStar === 0 ? '미평가' : averageStar.toFixed(1)
})
</script>

<style lang="scss" scoped></style>
