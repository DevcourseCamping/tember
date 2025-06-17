<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import imgDelete from '@/assets/icons/light/light-delete.svg'
import image from '@/assets/icons/light/light-image.svg'
import d_imgDelete from '@/assets/icons/dark/dark-delete.svg'
import d_image from '@/assets/icons/dark/dark-image.svg'
;('../../assets/icons/dark/dark-delete.svg')

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  max: {
    type: Number,
    default: 10,
  },
})

const fileInput = ref(null)
const emit = defineEmits(['update:modelValue'])

const handleUpload = (e) => {
  const files = Array.from(e.target.files).slice(0, props.max - props.modelValue.length)

  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const newList = [...props.modelValue, { file, preview: event.target.result }]
      emit('update:modelValue', newList)
    }
    reader.readAsDataURL(file)
  })
}

const deleteImage = (index) => {
  const newList = [...props.modelValue]
  newList.splice(index, 1)
  emit('update:modelValue', newList)
}
</script>

<template>
  <div class="w-full max-w-[500px] flex gap-3 items-start scrollbar-hide overflow-visible">
    <!-- image upload button -->
    <div
      class="w-[100px] h-[100px] my-[5px] border border-[var(--primary-30)] dark:border-[#3a3a3a] dark:bg-[#3a3a3a] rounded flex flex-col justify-center items-center cursor-pointer mr-1 shrink-0"
      @click="fileInput?.click()"
    >
      <img :src="image" class="w-6 h-6 mb-1 block dark:hidden" />
      <img :src="d_image" class="w-6 h-6 mb-1 hidden dark:block" />
      <p class="text-sm text-[var(--primary)] dark:text-white">
        {{ modelValue.length }} / {{ max }}
      </p>
    </div>
    <!-- image list -->
    <div class="w-full max-w-[325px] flex relative overflow-hidden">
      <Swiper :slides-per-view="'auto'" :space-between="5" class="flex flex-grow">
        <swiper-slide
          v-for="(img, i) in modelValue"
          :key="i"
          class="!w-[110px] !h-[110px] flex-shrink-0 relative"
        >
          <div class="relative mt-[5px] mr-2">
            <img
              :src="img.preview"
              class="w-[100px] h-[100px] object-cover rounded-[5px] cursor-pointer"
            />
            <img
              :src="imgDelete"
              class="w-[25px] h-[25px] absolute -top-[5px] -right-[5px] z-10 cursor-pointer block dark:hidden"
              @click.stop="deleteImage(i)"
            />
            <img
              :src="d_imgDelete"
              class="w-[25px] h-[25px] absolute -top-[5px] -right-[5px] z-10 cursor-pointer hidden dark:block"
              @click.stop="deleteImage(i)"
            />
          </div>
        </swiper-slide>
      </Swiper>
    </div>

    <input type="file" ref="fileInput" class="hidden" multiple @change="handleUpload" />
  </div>
</template>
