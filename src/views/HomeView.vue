<script setup>
import HeaderSearchMain from '@/components/common/HeaderSearchMain.vue'
import NavBar from '@/components/common/NavBar.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
</script>

<template>
  <div class="fixed w-full max-w-[500px] h-screen bg-[--white] left-1/2 -translate-x-1/2">
    <HeaderSearchMain class="min-h-[168px]" />
    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 168px - 60px)">
      <section class="bg-[#FFFFFF] pt-[39px] pb-[39px]"></section>
      <section class="bg-[#F2F2F2] overflow-hidden relative pt-[72px] pb-[72px] z-0">
        <h2 class="font-bold text-[17px] ml-[20px] mt-[-52px] mb-[20px] text-[#4A4A4A]">Popular</h2>
        <Swiper
          :slides-per-view="'auto'"
          :space-between="30"
          :centered-slides="true"
          :initial-slide="1"
          grab-cursor
          free-mode
          class="px-[35px]"
        >
          <SwiperSlide
            v-for="item in [1, 2, 3]"
            :key="`popular-${item}`"
            class="!w-[300px] flex flex-col gap-6 flex-shrink-0"
          >
            <div
              class="w-[300px] h-[136px] bg-white rounded-[5px] shadow flex overflow-hidden mb-[30px]"
            >
              <img
                src="https://cdn.pixabay.com/photo/2021/12/20/08/07/camping-6882479_1280.jpg"
                alt="캠핑장 사진"
                class="w-[100px] h-full object-cover"
              />
              <div class="flex flex-col justify-between p-2 flex-1">
                <div>
                  <h3 class="text-[15px] font-semibold text-[#222222] mt-[16px]">휘게포레스트</h3>
                  <p class="text-[13px] text-[#A8AEB2] mt-[8px]">강원 평창군 용평면</p>
                </div>
                <div class="w-full h-[1px] bg-[#4B3C2F] mt-[12px] mb-[4px]"></div>
                <div class="flex justify-end items-center gap-[10px] mt-[10px] mb-[6px]">
                  <img
                    src="../assets/icons/light/light-caravan-off.svg"
                    class="w-[20px] h-[20px]"
                  />
                  <img src="../assets/icons/light/light-trailer-on.svg" class="w-[20px] h-[20px]" />
                  <img src="../assets/icons/light/light-pet-on.svg" class="w-[20px] h-[20px]" />
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
                  <h3 class="text-[15px] font-semibold text-[#222222] mt-[16px]">휘게포레스트</h3>
                  <p class="text-[13px] text-[#A8AEB2] mt-[8px]">강원 평창군 용평면</p>
                </div>
                <div class="w-full h-[1px] bg-[#4B3C2F] mt-[12px] mb-[4px]"></div>
                <div class="flex justify-end items-center gap-[10px] mt-[10px] mb-[6px]">
                  <img
                    src="../assets/icons/light/light-caravan-off.svg"
                    class="w-[20px] h-[20px]"
                  />
                  <img src="../assets/icons/light/light-trailer-on.svg" class="w-[20px] h-[20px]" />
                  <img src="../assets/icons/light/light-pet-on.svg" class="w-[20px] h-[20px]" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
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
              <p class="text-[15px] text-[#A8AEB2] mt-[10px]">
                내 집처럼 편안하게 캠핑을 즐겨보세요
              </p>
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

      <section class="bg-[#F2F2F2] overflow-hidden relative pt-[72px] pb-[72px] z-0">
        <h2 class="font-bold text-[17px] ml-[20px] mt-[-52px] mb-[20px] text-[#4A4A4A]">
          Community
        </h2>

        <Swiper
          :slides-per-view="'auto'"
          :space-between="30"
          :centered-slides="true"
          :initial-slide="1"
          grab-cursor
          free-mode
          class="px-[35px]"
        >
          <SwiperSlide
            v-for="item in [1, 2, 3]"
            :key="`popular-${item}`"
            class="!w-[300px] flex flex-col gap-6 flex-shrink-0"
          >
            <div
              class="w-[300px] h-[142px] bg-white rounded-[5px] shadow flex overflow-hidden mb-[30px]"
            >
              <img
                src="https://cdn.pixabay.com/photo/2021/12/20/08/07/camping-6882479_1280.jpg"
                alt="캠핑장 사진"
                class="w-[100px] h-full object-cover"
              />
              <div class="flex flex-col justify-between p-[15px] flex-1">
                <p class="text-[14px] text-[#A8AEB2] mt-[10px]">
                  서울 근교 캠핑장 가보신 곳 중에서 추천할만한 캠핑장 있나요?
                </p>
                <div class="w-full h-[1px] bg-[#4B3C2F] mt-[10px] mb-[5px]"></div>
                <div class="flex justify-end items-center gap-[5px]">
                  <img
                    src="../assets/icons/light/light-like-outline.svg"
                    class="w-[20px] h-[20px]"
                  />
                  <p class="text-[14px] mr-[10px]">8</p>
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
              <div class="flex flex-col justify-between p-[15px] flex-1">
                <p class="text-[14px] text-[#A8AEB2] mt-[10px]">
                  서울 근교 캠핑장 가보신 곳 중에서 추천할만한 캠핑장 있나요?
                </p>
                <div class="w-full h-[1px] bg-[#4B3C2F] mt-[10px] mb-[5px]"></div>
                <div class="flex justify-end items-center gap-[5px]">
                  <img
                    src="../assets/icons/light/light-like-outline.svg"
                    class="w-[20px] h-[20px]"
                  />
                  <p class="text-[14px] mr-[10px]">8</p>
                  <img src="../assets/icons/light/light-comment.svg" class="w-[20px] h-[20px]" />
                  <p class="text-[14px]">10</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section class="bg-[#FFFFFF] pt-[72px] pb-[160px]">
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
          <NavBar />
        </div>
      </section>
    </main>
  </div>
</template>
<style scoped></style>
