<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import image from '@/assets/icons/light/light-image.svg'
import imgDelete from '@/assets/icons/light/light-delete.svg'
import HeaderSimple from '@/components/common/HeaderSimple.vue'

const post = {
  images: [
    {
      name: 'img1',
      src: 'https://i.pinimg.com/736x/9e/90/3d/9e903de9c0588d6dfaf2ef6c51d5da83.jpg',
    },
    {
      name: 'img2',
      src: 'https://i.pinimg.com/736x/39/42/98/39429865b08fedb79eec1c6098ee00e8.jpg',
    },
    {
      name: 'img3',
      src: 'https://i.pinimg.com/736x/84/44/93/844493e718a09667289e97823548e959.jpg',
    },
    {
      name: 'img4',
      src: 'https://i.pinimg.com/736x/44/fd/6a/44fd6ac381d828d6ff06ed16639760e0.jpg',
    },
    {
      name: 'img5',
      src: 'https://i.pinimg.com/736x/e0/ce/9e/e0ce9e930de758ce682d11d468efc630.jpg',
    },
  ],
  category: 'general', // general, pets
}
</script>
<template>
  <main class="fixed w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSimple title="글쓰기" />
    <!-- main -->
    <form class="overflow-y-auto" style="height: calc(100vh - 80px - 80px)">
      <!-- image upload -->
      <section class="flex px-[30px] py-[10px] space-x-[15px]">
        <div
          class="w-[100px] h-[100px] border border-[var(--primary-30)] rounded-[5px] flex-shrink-0 mt-[5px] flex flex-col justify-center items-center cursor-pointer"
        >
          <img :src="image" class="w-[26px] h-[26px] mb-[6px]" />
          <p class="text-sm text-[var(--primary)]">{{ post.images.length }} / 10</p>
        </div>
        <div class="w-[325px] flex relative overflow-hidden">
          <swiper :slides-per-view="'auto'" :space-between="15" class="flex flex-grow">
            <swiper-slide
              v-for="img in post.images"
              :key="img.name"
              class="!w-[100px] !h-[110px] flex-shrink-0 !flex flex-col justify-center items-center relative"
            >
              <div class="relative w-[100px] h-[100px]">
                <img :src="img.src" class="w-full h-full object-cover rounded-[5px]" />
                <img
                  :src="imgDelete"
                  class="w-[25px] h-[25px] absolute -top-[5px] -right-[5px] z-10 cursor-pointer"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </section>
      <!-- category -->
      <section class="px-[30px]">
        <p class="text-lg mt-8">카테고리 선택</p>
        <div class="flex space-x-[15px] mt-4">
          <div
            class="w-[70px] h-[35px] text-sm border border-[var(--primary)] rounded-[5px] flex justify-center items-center cursor-pointer"
          >
            일반
          </div>
          <div
            class="w-20 h-[35px] text-sm border border-[var(--primary)] rounded-[5px] bg-[var(--primary)] text-[var(--white)] flex justify-center items-center cursor-pointer"
          >
            반려동물
          </div>
        </div>
      </section>
      <!-- editor -->
      <section class="flex justify-center mt-[35px]">
        <textarea
          name="content"
          class="w-[440px] h-[400px] border border-[rgba(75,60,47,0.3) rounded-[5px] resize-none p-5 placeholder:font-normal placeholder:text-[var(--grey)] text-base"
          placeholder="이곳에 글을 작성해주세요"
        ></textarea>
      </section>
    </form>
    <!-- footer  -->
    <div
      class="absolute bottom-0 w-full h-20 bg-[var(--primary)] cursor-pointer flex justify-center items-center text-[var(--white)] text-xl"
    >
      작성완료
    </div>
  </main>
</template>
<style scoped></style>
