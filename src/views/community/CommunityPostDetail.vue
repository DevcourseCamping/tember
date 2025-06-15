<script setup>
import CommunityHeaderOther from '@/components/community/CommunityHeaderOther.vue'
import { useCommunityStore } from '@/stores/communityStore'

import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import comment from '@/assets/icons/dark/dark-comment.svg'
import unlike from '@/assets/icons/dark/dark-like-outline.svg'
import like from '@/assets/icons/dark/dark-like-filled.svg'
import supabase from '@/utils/supabase'

import CommentItem from '@/components/community/CommentItem.vue'
import router from '@/router'
import PostContent from '@/components/community/PostContent.vue'
import PostEditor from '@/components/community/PostEditor.vue'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import BottomSheet from '@/components/common/BottomSheet.vue'
import formDate from '@/utils/formDate'
import SkeletonPostDetail from '@/components/community/SkeletonPostDetail.vue'

const route = useRoute()
const postId = route.params.postId
const communityStore = useCommunityStore()
const loading = ref(true)

const post = ref(null)
const isLiked = ref(false)
const commentInput = ref('')
const loginUserId = ref(null)

const isEditing = ref(false)
const editedContent = ref('')
const editableImages = ref([])
const editedCategory = ref('default')

const bottomRef = ref(null)

const isMyPost = computed(() => post.value?.user_id === loginUserId.value)

const imageList = computed(() => {
  try {
    const parsed = JSON.parse(post.value?.image || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
})

const startEdit = () => {
  isEditing.value = true
  editedContent.value = post.value.content
  editedCategory.value = post.value.category || 'default'

  try {
    const parsed = JSON.parse(post.value.image || '[]')
    editableImages.value = parsed.map((url) => ({ file: null, preview: url }))
  } catch {
    editableImages.value = []
  }
}

const updateContent = (val) => {
  editedContent.value = val
}
const updateImages = (val) => {
  editableImages.value = val
}
const modelValueCategory = (val) => {
  editedCategory.value = val
}

const saveEdit = async () => {
  if (!editedContent.value.trim()) {
    console.warn('본문 없음')
    return
  }
  const success = await communityStore.updatePost({
    postId: post.value.id,
    content: editedContent.value,
    category: editedCategory.value,
    images: editableImages.value,
  })
  if (success) {
    alert('게시글 수정 완료')
    isEditing.value = false
    post.value = await communityStore.getCommunityPostById(post.value.id)
  } else {
    alert('게시글 수정 실패')
  }
}

const deletePost = async () => {
  if (!confirm('게시글을 삭제하시겠어요?')) return
  const success = await communityStore.deletePost(post.value.id)
  if (success) {
    alert('게시글 삭제 완료')
    router.push({ name: 'community' })
  } else {
    alert('게시글 삭제 실패')
  }
}

const handleSubmitComment = async () => {
  const updated = await communityStore.submitComment(postId, commentInput.value, commentInput)
  if (updated) {
    post.value = updated
    await nextTick()
    bottomRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
}

const editComment = async (editedComment) => {
  if (editedComment.editTrigger) {
    const target = post.value.comments.find((c) => c.id === editedComment.id)
    if (target) {
      target.editing = true
    }
    return
  }

  if (!editedComment.content.trim()) return

  await communityStore.updateComment(editedComment.id, editedComment.content)
  post.value = await communityStore.getCommunityPostById(postId)
}

const deleteComment = async (comment) => {
  if (!confirm('댓글을 삭제하시겠어요?')) return
  await communityStore.deleteComment(comment.id)
  post.value = await communityStore.getCommunityPostById(postId)
}

const clickLike = async () => {
  if (!post.value) return
  const result = await communityStore.toggleLikeById(post.value.id)
  if (result === null) return

  isLiked.value = result.liked
  post.value.likeCount += result.liked ? 1 : -1
}

onMounted(async () => {
  loading.value = true

  const {
    data: { session },
  } = await supabase.auth.getSession()
  loginUserId.value = session?.user?.id

  post.value = await communityStore.getCommunityPostById(postId)

  if (loginUserId.value) {
    const { data: like } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', loginUserId.value)
      .maybeSingle()
    isLiked.value = !!like
  }

  loading.value = false
})
const isBottomOpen = ref(false)
const clickBack = () => {
  router.back()
}
const clickSetting = () => {
  isBottomOpen.value = !isBottomOpen.value
}

const handleSelect = async (key) => {
  isBottomOpen.value = false
  if (key === 'edit') {
    startEdit()
  } else if (key === 'delete') {
    deletePost()
  }
}
const isCommentSheetOpen = ref(false)
const selectedComment = ref(null)

const openCommentMenu = (comment) => {
  selectedComment.value = comment
  isCommentSheetOpen.value = true
}

const closeCommentMenu = () => {
  isCommentSheetOpen.value = false
  selectedComment.value = null
}

const handleCommentSelect = (key) => {
  if (!selectedComment.value) return

  if (key === 'edit') {
    editComment({ ...selectedComment.value, editTrigger: true })
  } else if (key === 'delete') {
    deleteComment(selectedComment.value)
  }

  closeCommentMenu()
}

const goToUserProfile = (userId) => {
  router.push({ name: 'user-profile', params: { id: userId } })
}
</script>
<template>
  <div class="fixed w-full max-w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <CommunityHeaderOther :is-my-post="isMyPost" @navClick="clickBack" @menuClick="clickSetting" />
    <!-- main -->
    <main class="overflow-y-auto scrollbar-hide pb-[30px]" style="height: calc(100vh - 60px)">
      <SkeletonPostDetail v-if="loading" />
      <template v-else>
        <section class="my-6 px-5 flex items-center justify-between">
          <div class="flex items-center">
            <img
              :src="post.profiles.image || post.profiles.avatar_url"
              class="w-10 h-10 rounded-full mr-3"
            />
            <p class="font-bold">{{ post.profiles.username }}</p>
          </div>
          <p class="text-sm text-[var(--grey)]">{{ formDate(post.created_at) }}</p>
        </section>
        <PostEditor
          v-if="isEditing"
          :model-value-content="editedContent"
          :model-value-images="editableImages"
          :model-value-category="editedCategory"
          @update:modelValueContent="updateContent"
          @update:modelValueImages="updateImages"
          @update:modelValueCategory="modelValueCategory"
          @cancel="isEditing = false"
          @save="saveEdit"
        />
        <PostContent v-else :post="post" :image-list="imageList" />

        <!-- like / comment -->
        <template v-if="!isEditing">
          <!-- summary -->
          <section class="mx-[30px] mt-[30px] mb-[20px]">
            <div class="flex gap-3 justify-end mb-3">
              <div
                class="flex items-center gap-2 bg-[var(--primary)] px-3.5 py-1 rounded-[5px] cursor-pointer"
                @click="clickLike"
              >
                <img :src="isLiked ? like : unlike" class="w-5 h-5" />
                <span class="text-[var(--white)] text-sm">{{ post.likeCount }}</span>
              </div>
              <div class="flex items-center gap-2 bg-[var(--primary)] px-3.5 py-1 rounded-[5px]">
                <img :src="comment" class="w-5 h-5" />
                <span class="text-[var(--white)] text-sm">{{ post.comments.length }}</span>
              </div>
            </div>
          </section>

          <!-- comments -->
          <section class="mx-5 mb-[50px]">
            <ul class="flex flex-col gap-4">
              <CommentItem
                v-for="comment in post.comments"
                :key="comment.id"
                :comment="comment"
                :loginUserId="loginUserId"
                :onEdit="editComment"
                :onDelete="deleteComment"
                @openMenu="openCommentMenu"
              />
              <div ref="bottomRef" />
            </ul>
          </section>
        </template>
      </template>
    </main>
    <!-- comment input -->
    <section
      class="fixed bottom-0 flex items-center w-full max-w-[500px] h-[60px] bg-[var(--primary)] px-5"
    >
      <input
        v-model="commentInput"
        class="bg-[var(--white)] px-4 py-2 w-full rounded text-sm focus:outline-none"
        placeholder="댓글을 입력해주세요"
        @keyup.enter="handleSubmitComment"
      />
      <button
        class="w-[60px] h-10 ml-2 text-[var(--primary)] bg-[var(--white)] px-3 py-2 rounded text-[15px]"
        @click="handleSubmitComment"
      >
        등록
      </button>
    </section>
    <!-- header bottom sheet -->
    <BottomSheetWrapper v-show="isBottomOpen" :show="isBottomOpen" @close="!isBottomOpen">
      <BottomSheet type="post" @close="clickSetting" @select="handleSelect" />
    </BottomSheetWrapper>
    <!-- comment bottom sheet -->
    <BottomSheetWrapper v-if="selectedComment" :show="isCommentSheetOpen" @close="closeCommentMenu">
      <BottomSheet type="comment" @close="closeCommentMenu" @select="handleCommentSelect" />
    </BottomSheetWrapper>
  </div>
</template>
<style scoped></style>
