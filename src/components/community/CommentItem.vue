<script setup>
import { ref } from 'vue'
// import more from '@/assets/icons/light/light-more.svg'

const props = defineProps({
  comment: Object,
  loginUserId: String,
  onEdit: Function,
  onDelete: Function,
})

const isEditing = ref(false)
const editedContent = ref(props.comment.content)

// const openCommentMenu = (comment) => {
//   console.log('Open Bottom Sheet', comment)
// }

const startEdit = () => {
  isEditing.value = true
  editedContent.value = props.comment.content
}

const saveEdit = () => {
  if (editedContent.value.trim()) {
    props.onEdit({ ...props.comment, content: editedContent.value })
    isEditing.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
  editedContent.value = props.comment.content
}
</script>

<template>
  <li class="rounded-[5px] w-full border p-4 border-[var(--primary-30)]">
    <div class="flex items-center mb-5 justify-between">
      <div class="flex items-center">
        <img :src="comment.userProfile" class="w-10 h-10 rounded-full mr-[15px]" />
        <div>
          <p class="font-bold text-[14px] mb-[5px]">{{ comment.userName }}</p>
          <p class="text-[var(--grey)] text-[13px]">{{ comment.commentTime }}</p>
        </div>
      </div>
      <template v-if="comment.userId === loginUserId">
        <div class="flex gap-2">
          <!-- bottom sheet 완성되면 마무리 -->
          <!-- <div class="w-[20px] h-[20px] cursor-pointer" @click="openCommentMenu(comment)">
            <img :src="more" />
          </div> -->

          <!-- 임시 -->
          <button v-if="!isEditing" @click="startEdit">
            <img src="../../assets/icons/light/light-setting.svg" alt="수정" />
          </button>
          <button v-if="!isEditing" @click="onDelete(comment)">
            <img src="../../assets/icons/light/light-delete.svg" alt="삭제" />
          </button>
          <!-- 여기까지 -->

          <template v-if="isEditing">
            <button @click="saveEdit" class="text-sm text-[var(--blue)]">저장</button>
            <button @click="cancelEdit" class="text-sm text-[var(--black-70)]">취소</button>
          </template>
        </div>
      </template>
    </div>
    <div>
      <p v-if="!isEditing" class="text-[15px]">{{ comment.content }}</p>
      <textarea
        v-else
        v-model="editedContent"
        class="w-full h-[70px] border px-2 py-1 text-sm rounded scrollbar-hide focus:outline-none resize-none text-[15px]"
        :placeholder="comment.content"
      />
    </div>
  </li>
</template>
