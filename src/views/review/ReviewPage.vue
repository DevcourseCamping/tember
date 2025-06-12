<script setup>
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import filledStarIcon from '../../assets/icons/star-filled.svg'
import outlineStarIcon from '../../assets/icons/star-outline.svg'
import { ref } from 'vue'

const selected = ref(null)
const labels = ['아쉬워요', '보통이에요', '최고에요']

const rating = ref(0)
const isClicked = ref(false)

const setRating = (index) => {
  if (rating.value === index + 1) {
    rating.value = index
  } else {
    rating.value = index + 1
  }
}
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-white left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSimple title="리뷰쓰기" />

    <div class="flex flex-col items-center justify-center pt-20">
      <p class="font-bold text-[18px]">만족하셨나요?</p>
    </div>

    <!-- 만족도, 별점 -->
    <div class="flex items-center justify-center gap-[10px] pt-[40px]">
      <img
        v-for="n in 5"
        :key="n"
        :src="n <= rating ? filledStarIcon : outlineStarIcon"
        alt="별점"
        class="w-[40px] h-[40px] cursor-pointer"
        @mousedown="
          () => {
            isClicked = true
            setRating(n - 1)
          }
        "
      />
    </div>

    <div class="flex items-center justify-center pt-[50px]">
      <hr class="w-[440px] border-[#--primary]/20" />
    </div>

    <div class="flex flex-col items-center justify-center pt-[50px]">
      <p class="font-bold text-[18px]">청결도는 어땠나요?</p>
    </div>

    <!-- 청결도, 원 -->
    <div class="flex flex-col items-center pt-[40px]">
      <div class="flex items-center justify-center">
        <div v-for="(_, index) in labels" :key="index" class="flex items-center">
          <!-- 원 -->
          <div
            class="w-[50px] h-[50px] rounded-full border border-[#--primary]/30 transition-colors cursor-pointer"
            :class="selected === index ? 'bg-[#--primary]' : 'bg-transparent'"
            @click="selected = index"
          ></div>

          <!-- 선 -->
          <div
            v-if="index < labels.length - 1"
            class="h-[1px] w-[62px] bg-[#--primary]/30 border border-dotted"
          ></div>
        </div>
      </div>
      <div class="flex justify-center gap-[55px] pt-[25px]">
        <p
          v-for="(label, index) in labels"
          class="text-[15px] font-semibold transition-colors"
          :class="selected === index ? 'text-[#222222]' : 'text-[#--grey]'"
        >
          {{ label }}
        </p>
      </div>
    </div>

    <div class="flex items-center justify-center pt-[50px]">
      <hr class="w-[440px] border-[#--primary]/20" />
    </div>

    <div class="flex flex-col items-center justify-center pt-[50px]">
      <p class="font-bold text-[18px]">한 줄 리뷰 작성해주세요.</p>
    </div>

    <div class="flex items-center justify-center pt-[40px]">
      <textarea
        maxlength="50"
        class="w-[440px] h-[173px] border border-[#--primary]/30 rounded-[5px] focus:outline-none p-[25px] text-[15px] placeholder:text-[#--grey]"
        placeholder="한 줄 리뷰를 작성해주세요. (50자 이내)"
      ></textarea>
    </div>

    <!-- footer -->
    <button
      class="absolute bottom-0 w-full h-[60px] bg-[#--primary] flex justify-center items-center text-[18px] text-[#FFFFFF]"
    >
      등록하기
    </button>
  </div>
</template>
