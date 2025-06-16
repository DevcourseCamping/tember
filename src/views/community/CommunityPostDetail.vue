<script setup>
import { usePostDetail } from '@/composables/usePostDetail'
import { usePostEditor } from '@/composables/usePostEditor'

import PostContent from '@/components/community/PostContent.vue'
import PostEditor from '@/components/community/PostEditor.vue'
import CommunityHeaderOther from '@/components/community/CommunityHeaderOther.vue'
import CommentSection from '@/components/community/CommentSection.vue'
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper.vue'
import BottomSheet from '@/components/common/BottomSheet.vue'

import formDate from '@/utils/formDate'
import comment from '@/assets/icons/dark/dark-comment.svg'
import like from '@/assets/icons/dark/dark-like-filled.svg'
import unlike from '@/assets/icons/dark/dark-like-outline.svg'

let startEditFn = () => {}
const {
  post,
  isLiked,
  isMyPost,
  loginUserId,
  imageList,
  clickLike,
  submitComment,
  editComment,
  deleteComment,
  handleSelect,
  clickBack,
  clickSetting,
  isBottomOpen,
  goToUserProfile,
} = usePostDetail(() => startEditFn())
const {
  isEditing,
  editedContent,
  editableImages,
  editedCategory,
  startEdit,
  cancelEdit,
  updateContent,
  updateImages,
  updateCategory,
  saveEdit,
} = usePostEditor(post)
startEditFn = startEdit
</script>

<template>
  <div v-if="post" class="w-full max-w-[500px] h-screen bg-[var(--white)] mx-auto">
    <!-- Header -->
    <CommunityHeaderOther
      :is-my-post="isMyPost && !isEditing"
      :menu-type="'more'"
      @navClick="clickBack"
      @menuClick="clickSetting"
    />

    <!-- BottomSheet for post options -->
    <BottomSheetWrapper v-show="isBottomOpen" :show="isBottomOpen" @close="clickSetting">
      <BottomSheet type="post" @close="clickSetting" @select="handleSelect" />
    </BottomSheetWrapper>

    <!-- Main content -->
    <main class="overflow-y-auto scrollbar-hide pb-[30px]" style="height: calc(100vh - 60px)">
      <!-- User info -->
      <section class="my-6 px-5 flex items-center justify-between">
        <div class="flex items-center cursor-pointer" @click="goToUserProfile(post.user_id)">
          <img
            :src="post.profiles.image || post.profiles.avatar_url"
            class="w-10 h-10 rounded-full mr-3"
          />
          <p class="font-bold">{{ post.profiles.username }}</p>
        </div>
        <p class="text-sm text-[var(--grey)]">{{ formDate(post.created_at) }}</p>
      </section>

      <!-- Editor or Content -->
      <PostEditor
        v-if="isEditing"
        :model-value-content="editedContent"
        :model-value-images="editableImages"
        :model-value-category="editedCategory"
        @update:modelValueContent="updateContent"
        @update:modelValueImages="updateImages"
        @update:modelValueCategory="updateCategory"
        @cancel="cancelEdit"
        @save="saveEdit"
      />
      <PostContent v-else :post="post" :image-list="imageList" />

      <!-- Like / Comment summary -->
      <template v-if="!isEditing">
        <section class="mx-[30px] mt-[30px] mb-[20px]">
          <div class="flex gap-3 justify-end mb-3">
            <div
              class="flex items-center gap-2 bg-[var(--primary)] px-3.5 py-1 rounded cursor-pointer"
              @click="clickLike"
            >
              <img :src="isLiked ? like : unlike" class="w-5 h-5" />
              <span class="text-[var(--white)] text-sm">{{ post.likeCount }}</span>
            </div>
            <div class="flex items-center gap-2 bg-[var(--primary)] px-3.5 py-1 rounded">
              <img :src="comment" class="w-5 h-5" />
              <span class="text-[var(--white)] text-sm">{{ post.comments.length }}</span>
            </div>
          </div>
        </section>

        <!-- Comments Section -->
        <CommentSection
          ref="commentSectionRef"
          :post="post"
          :loginUserId="loginUserId"
          @addComment="submitComment"
          @editComment="editComment"
          @deleteComment="deleteComment"
        />
      </template>
    </main>
  </div>
</template>

<style scoped></style>
