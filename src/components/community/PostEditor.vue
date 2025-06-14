<script setup>
import { ref, watch } from 'vue'
import ImageUploader from './ImageUploader.vue'

const props = defineProps({
  modelValueContent: String,
  modelValueImages: Array,
  modelValueCategory: String,
})

const emit = defineEmits([
  'update:modelValueContent',
  'update:modelValueImages',
  'update:modelValueCategory',
  'save',
  'cancel',
])

const localContent = ref(props.modelValueContent)
const localImages = ref([...props.modelValueImages])
const localCategory = ref(props.modelValueCategory)

watch(
  () => props.modelValueContent,
  (val) => {
    localContent.value = val
  },
)
watch(
  () => props.modelValueImages,
  (val) => {
    localImages.value = [...val]
  },
)
watch(
  () => props.modelValueCategory,
  (val) => {
    localCategory.value = val
  },
)

const selectCategory = (category) => {
  localCategory.value = category
  emit('update:modelValueCategory', category)
}

const handleSave = () => {
  emit('update:modelValueContent', localContent.value)
  emit('update:modelValueImages', localImages.value)
  emit('update:modelValueCategory', localCategory.value)
  emit('save')
}
</script>

<template>
  <section class="px-5 mt-6">
    <!-- image uploader -->
    <ImageUploader v-model="localImages" :max="10" class="mb-4" />

    <!-- category -->
    <p class="text-base mt-8">카테고리 선택</p>
    <div class="flex space-x-4 mt-4">
      <div
        :class="[
          'w-[70px] h-[35px] text-sm border rounded flex justify-center items-center cursor-pointer',
          localCategory === 'default'
            ? 'bg-[var(--primary)] text-[var(--white)] border-[var(--primary)]'
            : 'border-[var(--primary)] text-[var(--primary)]',
        ]"
        @click="selectCategory('default')"
      >
        일반
      </div>
      <div
        :class="[
          'w-[90px] h-[35px] text-sm border rounded flex justify-center items-center cursor-pointer',
          localCategory === 'pet'
            ? 'bg-[var(--primary)] text-[var(--white)] border-[var(--primary)]'
            : 'border-[var(--primary)] text-[var(--primary)]',
        ]"
        @click="selectCategory('pet')"
      >
        반려동물
      </div>
    </div>

    <!-- content -->
    <textarea
      v-model="localContent"
      class="w-full h-80 border border-[var(--primary-30)] p-3 rounded resize-none focus:outline-none mt-8"
      placeholder="게시글 내용을 입력하세요"
    />

    <!-- save / cancel -->
    <div class="flex justify-end gap-3 mt-4">
      <button
        class="w-20 h-[35px] rounded text-[var(--white)] bg-[var(--primary)] text-sm"
        @click="handleSave"
      >
        저장
      </button>
      <button
        class="w-20 h-[35px] rounded border border-[var(--primary-30)] text-sm"
        @click="$emit('cancel')"
      >
        취소
      </button>
    </div>
  </section>
</template>
