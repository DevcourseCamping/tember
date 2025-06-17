<script setup>
import { ref, watch } from 'vue'
import more from '@/assets/icons/light/light-more.svg'
import d_more from '@/assets/icons/dark/dark-more.svg'
import formDate from '@/utils/formDate.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  comment: Object,
  loginUserId: String,
  onEdit: Function,
  onDelete: Function,
})

const isEditing = ref(false)
const editedContent = ref(props.comment.content)

watch(
  () => props.comment.editing,
  (val) => {
    if (val) {
      isEditing.value = true
      editedContent.value = props.comment.content
    }
  },
)

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

const goToUserProfile = (userId) => {
  router.push({ name: 'user-profile', params: { id: userId } })
}
</script>

<template>
  <li class="rounded-[5px] w-full border p-4 border-[var(--primary-30)] dark:border-[#ffffff30]">
    <div class="flex items-center mb-5 justify-between">
      <div class="flex items-center cursor-pointer" @click="goToUserProfile(comment.userId)">
        <img :src="comment.userProfile" class="w-10 h-10 rounded-full mr-[15px]" />
        <div>
          <p class="font-bold text-[14px] mb-[5px] dark:text-white">{{ comment.userName }}</p>
          <p class="text-[var(--grey)] text-[13px] dark:text-[#ffffff50]">
            {{ formDate(comment.commentTime) }}
          </p>
        </div>
      </div>
      <template v-if="comment.userId === loginUserId">
        <div class="flex gap-2">
          <div
            v-if="!isEditing"
            class="w-[20px] h-[20px] cursor-pointer"
            @click="$emit('openMenu', comment)"
          >
            <img :src="more" class="block dark:hidden" />
            <img :src="d_more" class="hidden dark:block" />
          </div>
          <template v-if="isEditing">
            <button @click="saveEdit" class="text-sm text-[var(--primary)] dark:text-white">
              저장
            </button>
            <button
              @click="cancelEdit"
              class="text-sm text-[var(--black-70)] ml-2 dark:text-[#ffffff50]"
            >
              취소
            </button>
          </template>
        </div>
      </template>
    </div>
    <div>
      <p v-if="!isEditing" class="text-[15px] dark:text-white">{{ comment.content }}</p>
      <textarea
        v-else
        v-model="editedContent"
        class="w-full h-[70px] border border-[var(--primary-30)] dark:border-[#3A3A3A30] dark:bg-[#3A3A3A] px-2 py-1 text-sm rounded scrollbar-hide focus:outline-none resize-none text-[15px] dark:text-white dark:placeholder:text-white"
        :placeholder="comment.content"
      />
    </div>
  </li>
</template>
