<script setup>
import filledStarIcon from '../../assets/icons/star-filled.svg'
import outlineStarIcon from '../../assets/icons/star-outline.svg'

const reviews = [
  {
    userName: '나는 캠퍼',
    date: '2025.06.07',
    userImg:
      'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
    content:
      '샤워실과 화장실이 깨끗하게 관리되어 쾌적하게 이용했습니다. 주변 환경도 조용하고 아름다워서 편안한 캠핑을 즐길 수 있었습니다. 다만, 개수대 이용 시 음식물 쓰레기 처리 시설이 좀 부족한 것 같다는 생각이 들었습니다. 전체적으로 만족스러운 캠핑이었지만, 다음에는 개수대 이용 시 음식물 쓰레기 처리에 신경을 써주시면 좋겠습니다.',
    cleanlines: '보통이에요',
    rating: 4,
    isMine: true,
  },
  {
    userName: '나는 캠퍼',
    date: '2025.06.06',
    userImg:
      'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
    content:
      '캠핑장 분위기가 너무 좋았어요! 자연 속에서 힐링 제대로 했습니다. 시설도 깨끗하고 관리도 잘 되어 있어서 편안하게 쉴 수 있었습니다.',
    cleanlines: '깨끗해요',
    rating: 5,
    isMine: true,
  },
  {
    userName: '나는 캠퍼',
    date: '2025.06.05',
    userImg:
      'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
    content:
      '캠핑장 분위기가 너무 좋았어요! 자연 속에서 힐링 제대로 했습니다. 시설도 깨끗하고 관리도 잘 되어 있어서 편안하게 쉴 수 있었습니다.',
    cleanlines: '깨끗해요',
    rating: 5,
    isMine: true,
  },
]
</script>
<template>
  <div class="p-[30px] flex flex-col gap-[30px]">
    <div
      v-for="(review, index) in reviews"
      :key="index"
      class="border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
      @mouseenter="hoverMoreIndex = index"
    >
      <div class="flex items-center justify-between pl-[15px] pt-[15px]">
        <div class="flex items-center">
          <img
            :src="review.userImg"
            alt="임시 사용자 이미지"
            class="w-[52px] h-[52px] rounded-full mr-[15px]"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[15px] font-semibold">{{ review.userName }}</p>
            <p class="text-[13px] text-[var(--grey)]">{{ review.date }}</p>
          </div>
        </div>
      </div>
      <div class="pt-[25px] pl-5 pr-5 text-[15px]">
        <p class="break-words">
          {{ review.content }}
        </p>
      </div>
      <div class="pt-[30px] pl-5 pr-5 flex gap-[27px] items-center">
        <p class="font-bold text-[14px]">만족도</p>
        <div class="flex gap-[3px] items-center">
          <img
            v-for="n in 5"
            :key="n"
            :src="n <= review.rating ? filledStarIcon : outlineStarIcon"
            alt="별"
            class="w-4 h-4"
          />
        </div>
      </div>
      <div class="pt-[13px] pl-5 pr-5 pb-5 flex gap-[27px]">
        <p class="font-bold text-[14px]">청결도</p>
        <p class="text-[14px]">{{ review.cleanlines }}</p>
      </div>
    </div>
  </div>
</template>
