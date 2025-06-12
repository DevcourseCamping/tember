<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import 'swiper/css'
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import ImageUploader from '../../components/community/ImageUploader.vue'
import { useCommunityStore } from '@/stores/communityStore'

const communityStore = useCommunityStore()

const router = useRouter()
const content = ref('')
const category = ref('default')
const editableImages = ref([])

const submitPost = async () => {
  const success = await communityStore.createPost({
    content: content.value,
    category: category.value,
    images: editableImages.value,
  })

  if (success) {
    alert('게시글 등록 완료')
    router.push('/community')
  } else {
    alert('게시글 등록 실패')
  }
}
</script>
<template>
  <main class="fixed w-full max-w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSimple title="글쓰기" />
    <!-- main -->
    <form class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 80px - 80px)">
      <!-- category -->
      <section class="px-[30px]">
        <!-- image upload -->
        <ImageUploader v-model="editableImages" :max="10" />
        <p class="text-lg mt-8">카테고리 선택</p>
        <div class="flex space-x-[15px] mt-4">
          <div
            :class="[
              'w-[70px] h-[35px] text-sm border rounded-[5px] flex justify-center items-center cursor-pointer',
              category === 'default'
                ? 'bg-[var(--primary)] text-[var(--white)] border-[var(--primary)]'
                : 'border-[var(--primary)]',
            ]"
            @click="category = 'default'"
          >
            일반
          </div>
          <div
            :class="[
              'w-20 h-[35px] text-sm border rounded-[5px] flex justify-center items-center cursor-pointer',
              category === 'pet'
                ? 'bg-[var(--primary)] text-[var(--white)] border-[var(--primary)]'
                : 'border-[var(--primary)]',
            ]"
            @click="category = 'pet'"
          >
            반려동물
          </div>
        </div>
      </section>
      <!-- editor -->
      <section class="flex justify-center my-[35px]">
        <textarea
          v-model="content"
          name="content"
          class="w-[440px] h-[400px] border border-[var(--primary-30)] rounded-[5px] resize-none p-5 placeholder:font-normal placeholder:text-[var(--grey)] text-base focus:outline-none"
          placeholder="이곳에 글을 작성해주세요"
        ></textarea>
      </section>
    </form>

    <!-- footer  -->
    <div
      class="absolute bottom-0 w-full h-[60px] bg-[var(--primary)] cursor-pointer flex justify-center items-center text-[var(--white)] text-lg"
      @click="submitPost"
    >
      작성완료
    </div>
  </main>
</template>
