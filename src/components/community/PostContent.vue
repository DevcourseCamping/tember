<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

defineProps({
  post: Object,
  imageList: Array,
})
</script>

<template>
  <section v-if="imageList.length" class="w-full mt-4">
    <Swiper :modules="[Pagination]" :pagination="{ clickable: true }" class="w-full h-[480px]">
      <SwiperSlide v-for="(img, idx) in imageList" :key="idx">
        <img :src="img" class="w-full h-full object-cover cursor-pointer" />
      </SwiperSlide>
    </Swiper>
  </section>
  <p class="px-5 mt-6 dark:text-[var(--white)]">{{ post.content }}</p>
</template>
