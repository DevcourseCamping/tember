<script setup>
import close from '@/assets/icons/close-white.svg'
const props = defineProps({
  type: {
    type: String, // post, review, my, sort
    required: true,
  },
})
const emit = defineEmits(['close', 'select'])
</script>
<template>
  <section class="flex flex-col absolute bottom-0 w-full bg-[var(--primary)] rounded-t-[15px]">
    <header class="flex justify-between pt-6 pb-4 px-[30px] items-center">
      <p class="text-lg text-[var(--icon-text)] font-bold">작업 선택</p>
      <button @click="emit('close')">
        <img :src="close" class="w-[18px] h-[18px] cursor-pointer" />
      </button>
    </header>
    <!-- post -->
    <div v-if="props.type === 'post'" class="w-full flex flex-col px-5">
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] border-b border-[var(--white-20)] flex items-center cursor-pointer"
        @click="emit('select', 'edit')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">게시글 수정</p>
      </div>
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] flex items-center cursor-pointer"
        @click="emit('select', 'delete')"
      >
        <p class="ml-[25px] text-[var(--red)] text-base">게시글 삭제</p>
      </div>
    </div>
    <!-- review -->
    <div v-else-if="props.type === 'review'" class="w-full flex flex-col px-5">
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] border-b border-[var(--white-20)] flex items-center cursor-pointer"
        @click="emit('select', 'edit')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">리뷰 수정</p>
      </div>
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] flex items-center cursor-pointer"
        @click="emit('select', 'delete')"
      >
        <p class="ml-[25px] text-[var(--red)] text-base">리뷰 삭제</p>
      </div>
    </div>
    <!-- comment -->
    <div v-else-if="props.type === 'comment'" class="w-full flex flex-col px-5">
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] border-b border-[var(--white-20)] flex items-center cursor-pointer"
        @click="emit('select', 'edit')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">댓글 수정</p>
      </div>
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] flex items-center cursor-pointer"
        @click="emit('select', 'delete')"
      >
        <p class="ml-[25px] text-[var(--red)] text-base">댓글 삭제</p>
      </div>
    </div>
    <!-- my -->
    <div v-else-if="props.type === 'my'" class="w-full flex flex-col px-5">
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] border-b border-[var(--white-20)] flex items-center cursor-pointer"
        @click="emit('select', 'edit')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">프로필 수정</p>
      </div>
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] flex items-center cursor-pointer border-b border-[var(--white-20)]"
        @click="emit('select', 'dark')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">다크모드</p>
      </div>
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] flex items-center cursor-pointer"
        @click="emit('select', 'logout')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">로그아웃</p>
      </div>
    </div>
    <!-- sort -->
    <div v-else-if="props.type === 'sort'" class="w-full flex flex-col px-5">
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] border-b border-[var(--white-20)] flex items-center cursor-pointer"
        @click="emit('select', 'latest')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">최신순</p>
      </div>
      <div
        class="bg-[var(--primary)] w-[460px] h-[55px] flex items-center cursor-pointer"
        @click="emit('select', 'popular')"
      >
        <p class="ml-[25px] text-[var(--icon-text)] text-base">인기순</p>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
