<script setup>
import HeaderSearchMain from '@/components/common/HeaderSearchMain.vue'
import { ref } from 'vue'

const cardWidth = 300

const popularSlideCoord = ref(-cardWidth)
const popularTransition = ref(true)
const popularItems = ref([1, 2, 3])
function movePopularRight() {
  popularSlideCoord.value -= cardWidth
  popularTransition.value = true
  setTimeout(() => {
    popularItems.value.push(popularItems.value.shift())
    popularTransition.value = false
    popularSlideCoord.value = -cardWidth
  }, 300)
}
function movePopularLeft() {
  popularSlideCoord.value += cardWidth
  popularTransition.value = true
  setTimeout(() => {
    popularItems.value.unshift(popularItems.value.pop())
    popularTransition.value = false
    popularSlideCoord.value = -cardWidth
  }, 300)
}

const communitySlideCoord = ref(-cardWidth)
const communityTransition = ref(true)
const communityItems = ref([1, 2, 3])
function moveCommunityRight() {
  communitySlideCoord.value -= cardWidth
  communityTransition.value = true
  setTimeout(() => {
    communityItems.value.push(communityItems.value.shift())
    communityTransition.value = false
    communitySlideCoord.value = -cardWidth
  }, 300)
}
function moveCommunityLeft() {
  communitySlideCoord.value += cardWidth
  communityTransition.value = true
  setTimeout(() => {
    communityItems.value.unshift(communityItems.value.pop())
    communityTransition.value = false
    communitySlideCoord.value = -cardWidth
  }, 300)
}
</script>

<template>
  <div class="max-w-[500px] mx-auto bg-[--white] min-h-screen">
    <HeaderSearchMain class="mb-[78px]" />
    <section class="w-[500px] bg-[#F2F2F2] overflow-hidden relative pt-[72px] pb-[72px]">
      <h2 class="font-bold text-[17px] ml-[20px] mt-[-52px] mb-[20px] text-[#4A4A4A]">Popular</h2>

      <div class="flex justify-between px-4 mb-2">
        <button @click="movePopularLeft">◀️</button>
        <button @click="movePopularRight">▶️</button>
      </div>

      <div class="overflow-hidden px-[35px]">
        <div
          class="flex gap-[30px]"
          :class="{ 'transition-all duration-300 ease-in-out': popularTransition }"
          :style="{ transform: `translate3d(${popularSlideCoord}px, 0, 0)` }"
        >
          <div
            v-for="item in popularItems"
            :key="'popular-' + item"
            class="flex flex-col gap-6 w-[300px] flex-shrink-0"
          >
            <div class="w-[300px] h-[136px] bg-white rounded-[5px] shadow flex overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2021/12/20/08/07/camping-6882479_1280.jpg"
                alt="캠핑장 사진"
                class="w-[100px] h-full object-cover"
              />
              <div class="flex flex-col justify-between p-2 flex-1">
                <div>
                  <h3 class="text-[12px] font-semibold text-[#222222] mt-[16px]">휘게포레스트</h3>
                  <p class="text-[10px] text-[#A8AEB2] mt-[8px]">강원 평창군 용평면</p>
                </div>
                <div class="w-full h-[1px] bg-[#4B3C2F] my-1"></div>
                <div class="flex justify-end items-center gap-[10px] mt-[10px] mb-[14px]">
                  <img
                    src="../assets/icons/light/light-caravan-off.svg"
                    class="w-[16px] h-[16px]"
                  />
                  <img src="../assets/icons/light/light-trailer-on.svg" class="w-[16px] h-[16px]" />
                  <img src="../assets/icons/light/light-pet-on.svg" class="w-[16px] h-[16px]" />
                </div>
              </div>
            </div>

            <div class="w-[300px] h-[136px] bg-white rounded-[5px] shadow flex overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2021/12/20/08/07/camping-6882479_1280.jpg"
                alt="캠핑장 사진"
                class="w-[100px] h-full object-cover"
              />
              <div class="flex flex-col justify-between p-2 flex-1">
                <div>
                  <h3 class="text-[12px] font-semibold text-[#222222] mt-[16px]">휘게포레스트</h3>
                  <p class="text-[10px] text-[#A8AEB2] mt-[8px]">강원 평창군 용평면</p>
                </div>
                <div class="w-full h-[1px] bg-[#4B3C2F] my-1"></div>
                <div class="flex justify-end items-center gap-[10px] mt-[10px] mb-[14px]">
                  <img
                    src="../assets/icons/light/light-caravan-off.svg"
                    class="w-[16px] h-[16px]"
                  />
                  <img src="../assets/icons/light/light-trailer-on.svg" class="w-[16px] h-[16px]" />
                  <img src="../assets/icons/light/light-pet-on.svg" class="w-[16px] h-[16px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#FFFFFF] pt-[72px] pb-[72px]">
      <ul class="flex flex-col gap-[40px]">
        <li class="flex items-start">
          <img
            src="../assets/icons/light/light-caravan-on.svg"
            alt="개인 카라반"
            class="w-[30px] h-[30px] ml-[42px] mr-[20px] flex-shrink-0"
          />
          <div>
            <p class="text-[18px] font-bold text-[#222222]">개인 카라반 동반</p>
            <p class="text-[15px] text-[#A8AEB2] mt-[10px]">내 집처럼 편안하게 캠핑을 즐겨보세요</p>
          </div>
        </li>

        <li class="flex items-start">
          <img
            src="../assets/icons/light/light-trailer-on.svg"
            alt="트레일러"
            class="w-[30px] h-[30px] ml-[42px] mr-[20px] flex-shrink-0"
          />
          <div>
            <p class="text-[18px] font-bold text-[#222222]">개인 트레일러 동반</p>
            <p class="text-[15px] text-[#A8AEB2] mt-[10px]">
              트레일러와 함께 어디든 자유롭게 떠나요
            </p>
          </div>
        </li>

        <li class="flex items-start">
          <img
            src="../assets/icons/light/light-pet-on.svg"
            alt="반려동물"
            class="w-[30px] h-[30px] ml-[42px] mr-[20px] flex-shrink-0"
          />
          <div>
            <p class="text-[18px] font-bold text-[#222222]">반려 동물 동반</p>
            <p class="text-[15px] text-[#A8AEB2] mt-[10px]">
              사랑하는 반려동물과 함께하는 특별한 추억을 만들어보세요
            </p>
          </div>
        </li>
      </ul>
    </section>

    <section class="w-[500px] bg-[#F2F2F2] overflow-hidden relative pt-[72px] pb-[72px]">
      <h2 class="font-bold text-[17px] ml-[20px] mt-[-52px] mb-[20px] text-[#4A4A4A]">Community</h2>

      <div class="flex justify-between px-4 mb-2">
        <button @click="moveCommunityLeft">◀️</button>
        <button @click="moveCommunityRight">▶️</button>
      </div>

      <div class="overflow-hidden px-[35px]">
        <div
          class="flex gap-[30px]"
          :class="{ 'transition-all duration-300 ease-in-out': communityTransition }"
          :style="{ transform: `translate3d(${communitySlideCoord}px, 0, 0)` }"
        >
          <div
            v-for="item in communityItems"
            :key="'community-' + item"
            class="flex flex-col gap-6 w-[300px] flex-shrink-0"
          >
            <div class="w-[300px] h-[142px] bg-white rounded-[5px] shadow flex overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2021/12/20/08/07/camping-6882479_1280.jpg"
                alt="캠핑장 사진"
                class="w-[100px] h-full object-cover"
              />
              <div class="flex flex-col justify-between p-2 flex-1">
                <p class="text-[14px] text-[#A8AEB2] mt-[10px]">
                  서울 근교 캠핑장 가보신 곳 중에서 추천할만한 캠핑장 있나요?
                </p>
                <div class="w-full h-[1px] bg-[#4B3C2F] mt-[10px]"></div>
                <div class="flex justify-end items-center gap-[10px] mb-[10px]">
                  <img
                    src="../assets/icons/light/light-like-outline.svg"
                    class="w-[20px] h-[20px]"
                  />
                  <p class="text-[14px]">8</p>
                  <img src="../assets/icons/light/light-comment.svg" class="w-[20px] h-[20px]" />
                  <p class="text-[14px]">10</p>
                </div>
              </div>
            </div>

            <div class="w-[300px] h-[142px] bg-white rounded-[5px] shadow flex overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2021/12/20/08/07/camping-6882479_1280.jpg"
                alt="캠핑장 사진"
                class="w-[100px] h-full object-cover"
              />
              <div class="flex flex-col justify-between p-2 flex-1">
                <p class="text-[14px] text-[#A8AEB2] mt-[10px]">
                  서울 근교 캠핑장 가보신 곳 중에서 추천할만한 캠핑장 있나요?
                </p>
                <div class="w-full h-[1px] bg-[#4B3C2F] mt-[10px]"></div>
                <div class="flex justify-end items-center gap-[10px] mb-[10px]">
                  <img
                    src="../assets/icons/light/light-like-outline.svg"
                    class="w-[20px] h-[20px]"
                  />
                  <p class="text-[14px]">8</p>
                  <img src="../assets/icons/light/light-comment.svg" class="w-[20px] h-[20px]" />
                  <p class="text-[14px]">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#FFFFFF] py-[72px]">
      <h2 class="text-center font-bold text-[17px] text-[#4A4A4A] mb-8">Review</h2>

      <div class="max-w-[500px] mx-auto px-4 flex justify-center">
        <div class="w-[300px] bg-white rounded-[5px] shadow p-4 text-center">
          <h3 class="font-bold text-[15px] text-[#222222] mb-2">가평 블루래빗 캠핑장</h3>
          <p class="text-[14px] text-[#4A4A4A] mb-2 line-clamp-2">
            캠핑장 다녀왔는데 시설도 깨끗하고 사장님도 친절하고 좋았고 추천합니다!
          </p>
          <p class="text-[13px] text-[#A8AEB2] mb-2">작성자 1</p>
          <div class="text-[#FFD700] text-[18px]">★★★★★</div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped></style>
