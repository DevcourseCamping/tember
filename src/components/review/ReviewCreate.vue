<script setup>
import { ref } from 'vue'
import { useReviewStore } from '@/stores/reviewStore'
import filledStarIcon from '@/assets/icons/star-filled.svg'
import outlineStarIcon from '@/assets/icons/star-outline.svg'

const props = defineProps({
  campId: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['done'])

const rating = ref(0)
const selected = ref(null)
const reviewContent = ref('')
const isClicked = ref(false)

const reviewStore = useReviewStore()

const labels = ['아쉬워요', '보통이에요', '최고에요']

const setRating = (index) => {
  rating.value = rating.value === index + 1 ? index : index + 1
}

const submitReview = async () => {
  if (!rating.value || selected.value === null || !reviewContent.value.trim()) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  const success = await reviewStore.createReview({
    campId: props.campId,
    content: reviewContent.value.trim(),
    rating: rating.value,
    cleanliness: selected.value + 1,
  })

  if (success) {
    alert('리뷰가 등록되었습니다.')
    emit('done')
  } else {
    alert(reviewStore.error || '리뷰 등록에 실패했습니다.')
  }
}
</script>

<template>
  <main class="overflow-y-auto scrollbar-hide" style="height: calc(80vh - 60px)">
    <!-- rating -->
    <div class="flex flex-col items-center justify-center pt-[30px]">
      <p class="font-bold text-[18px]">만족하셨나요?</p>
    </div>

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
      <hr class="w-[440px] border-[var(--primary-20)]" />
    </div>

    <!-- cleanliness -->
    <div class="flex flex-col items-center justify-center pt-[50px]">
      <p class="font-bold text-[18px]">청결도는 어땠나요?</p>
    </div>

    <div class="flex flex-col items-center pt-[40px]">
      <div class="flex items-center justify-center">
        <div v-for="(_, index) in labels" :key="index" class="flex items-center">
          <div
            class="w-[50px] h-[50px] rounded-full border transition-colors cursor-pointer"
            :style="selected === index ? 'background-color: var(--primary)' : ''"
            @click="selected = index"
          ></div>
          <div
            v-if="index < labels.length - 1"
            class="h-[1px] w-[62px] bg-[var(--primary-30)] border border-dotted"
          ></div>
        </div>
      </div>
      <div class="flex justify-center gap-[55px] pt-[25px]">
        <p
          v-for="(label, index) in labels"
          :key="index"
          class="text-[15px] font-semibold transition-colors"
          :class="selected === index ? 'text-[var(--black)]' : 'text-[var(--grey)]'"
        >
          {{ label }}
        </p>
      </div>
    </div>

    <div class="flex items-center justify-center pt-[50px]">
      <hr class="w-[440px] border-[var(--primary-20)]" />
    </div>

    <!-- content -->
    <div class="flex flex-col items-center justify-center pt-[50px]">
      <p class="font-bold text-[18px]">한 줄 리뷰 작성해주세요.</p>
    </div>

    <div class="flex items-center justify-center pt-[40px]">
      <textarea
        v-model="reviewContent"
        maxlength="50"
        class="w-[430px] h-[173px] border border-[var(--primary-30)] rounded-[5px] focus:outline-none p-[25px] text-[15px] placeholder:text-[var(--grey)] resize-none"
        placeholder="한 줄 리뷰를 작성해주세요. (50자 이내)"
      ></textarea>
    </div>
  </main>

  <!-- submit button -->
  <button
    class="absolute bottom-0 w-full h-[60px] bg-[var(--primary)] flex justify-center items-center text-[18px] text-[var(--white)]"
    @click="submitReview"
  >
    등록하기
  </button>
</template>
