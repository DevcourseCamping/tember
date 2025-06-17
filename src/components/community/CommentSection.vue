<script setup>
import { ref, nextTick, watch } from 'vue'
import CommentItem from '@/components/community/CommentItem.vue'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import BottomSheet from '@/components/common/BottomSheet.vue'

const { post, loginUserId } = defineProps({
  post: Object,
  loginUserId: String,
})
const emit = defineEmits(['addComment', 'editComment', 'deleteComment'])

const commentInput = ref('')
const isSubmitting = ref(false)

const isCommentSheetOpen = ref(false)
const selectedComment = ref(null)
const bottomRef = ref(null)
const prevCommentCount = ref(post?.comments?.length || 0)

watch(
  () => post?.comments?.length,
  async (newLength, oldLength) => {
    if (newLength > oldLength) {
      await nextTick()
      bottomRef.value?.scrollIntoView({ behavior: 'smooth' })
    }
    prevCommentCount.value = newLength
  },
)

const openCommentMenu = (comment) => {
  selectedComment.value = comment
  isCommentSheetOpen.value = true
}
const closeCommentMenu = () => {
  selectedComment.value = null
  isCommentSheetOpen.value = false
}

// create
const submitComment = async () => {
  if (isSubmitting.value || !commentInput.value.trim()) return
  isSubmitting.value = true
  emit('addComment', commentInput.value.trim())
  commentInput.value = ''
  isSubmitting.value = false
}

// select edit, delete
const handleCommentSelect = async (key) => {
  if (!selectedComment.value) return

  if (key === 'edit') {
    emit('editComment', { ...selectedComment.value, editTrigger: true })
  } else if (key === 'delete') {
    emit('deleteComment', selectedComment.value)
  }

  closeCommentMenu()
}
</script>

<template>
  <section class="mx-5 mb-[30px]">
    <!-- 댓글 리스트 -->
    <ul class="flex flex-col gap-4">
      <CommentItem
        v-for="comment in post.comments"
        :key="comment.id"
        :comment="comment"
        :loginUserId="loginUserId"
        :onEdit="(c) => emit('editComment', c)"
        :onDelete="(c) => emit('deleteComment', c)"
        @openMenu="openCommentMenu"
      />
      <div ref="bottomRef" />
    </ul>

    <!-- 바텀시트 -->
    <BottomSheetWrapper v-if="selectedComment" :show="isCommentSheetOpen" @close="closeCommentMenu">
      <BottomSheet type="comment" @close="closeCommentMenu" @select="handleCommentSelect" />
    </BottomSheetWrapper>
  </section>

  <!-- 댓글 입력창 -->
  <section
    class="fixed bottom-0 flex items-center w-full max-w-[500px] h-[60px] bg-[var(--primary)] dark:bg-[#181818] px-5"
  >
    <input
      v-model="commentInput"
      class="bg-[var(--white)] dark:bg-[#3A3A3A] px-4 py-2 w-full rounded text-sm focus:outline-none"
      placeholder="댓글을 입력해주세요"
      @keyup.enter="submitComment"
    />
    <button
      class="w-[60px] h-10 ml-2 text-[var(--primary)] dark:text-[#ffffff] bg-[var(--white)] dark:bg-[#3A3A3A] px-3 py-2 rounded text-[15px]"
      @click="submitComment"
    >
      등록
    </button>
  </section>
</template>
