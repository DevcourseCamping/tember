<script setup>
import HeaderOther from '@/components/common/HeaderOther.vue'
import { useCommunityStore } from '@/stores/communityStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import comment from '@/assets/icons/dark/dark-comment.svg'
import unlike from '@/assets/icons/dark/dark-like-outline.svg'
import like from '@/assets/icons/dark/dark-like-filled.svg'
import supabase from '@/utils/supabase'
import CommentItem from '@/components/community/CommentItem.vue'

const route = useRoute()
const postId = route.params.postId
const communityStore = useCommunityStore()

const post = ref(null)
const isLiked = ref(false)
const commentInput = ref('')
const loginUserId = ref(null)

console.log('🧸 postId:', postId)

const clickMore = () => {
  console.log('more')
}
const clickClose = () => {
  console.log('close')
}

const clickLike = async () => {
  if (!loginUserId.value || !post.value) return

  if (isLiked.value) {
    await supabase
      .from('likes')
      .delete()
      .eq('post_id', post.value.id)
      .eq('user_id', loginUserId.value)
    post.value.likeCount--
  } else {
    await supabase.from('likes').insert([{ post_id: post.value.id, user_id: loginUserId.value }])
    post.value.likeCount++
  }
  isLiked.value = !isLiked.value
}

const submitComment = async () => {
  if (!commentInput.value.trim()) return
  await communityStore.addComment(post.value.id, commentInput.value.trim())
  const updatedPost = await communityStore.getCommunityPostById(postId)
  post.value = updatedPost
  commentInput.value = ''
}

const editComment = async (editedComment) => {
  if (!editedComment.content.trim()) return

  const { error } = await supabase
    .from('comments')
    .update({ content: editedComment.content })
    .eq('id', editedComment.id)

  if (error) {
    console.error(error)
    return
  }

  post.value = await communityStore.getCommunityPostById(postId)
}

const deleteComment = async (comment) => {
  if (!confirm('댓글을 삭제하시겠어요?')) return
  await communityStore.deleteComment(comment.id)
  post.value = await communityStore.getCommunityPostById(postId)
}

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userId = session?.user?.id
  loginUserId.value = session?.user?.id

  const postData = await communityStore.getCommunityPostById(postId)
  if (postData) {
    post.value = postData
  }
  console.log('🧸 post:', postData)

  if (userId) {
    const { data: like } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single()
    isLiked.value = !!like
  }
})
</script>
<template>
  <div
    v-if="post"
    class="fixed w-full max-w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2"
  >
    <!-- header -->
    <HeaderOther @navClick="clickClose" @menuClick="clickMore" />
    <!-- main -->
    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 80px - 60px)">
      <!-- post header -->
      <section class="my-[30px] px-5 flex items-center justify-between">
        <div class="flex items-center">
          <img :src="post.profiles.avatar_url" class="w-[45px] h-[45px] rounded-full mr-[15px]" />
          <p class="font-bold text-[15px]">{{ post.profiles.username }}</p>
        </div>
        <p class="text-[var(--grey)] text-sm">{{ post.created_at }}</p>
      </section>
      <!-- post image -->
      <section class="w-[500px] h-[480px] overflow-hidden" v-if="post.image">
        <img :src="post.image" class="w-full h-full object-cover" />
      </section>
      <!-- post content -->
      <section class="px-5 mt-[30px] mb-[100px]">
        <p>{{ post.content }}</p>
      </section>

      <section class="px-[30px] mb-[30px]">
        <div class="flex gap-[10px] justify-end mb-[20px]">
          <!-- like -->
          <div
            class="w-20 h-[30px] flex justify-center items-center bg-[var(--primary)] rounded-[5px] cursor-pointer"
            @click="clickLike"
          >
            <img :src="isLiked ? like : unlike" class="w-5 h-5 mr-2" />
            <p class="text-[var(--white)] text-[15px]">{{ post.likeCount }}</p>
          </div>
          <!-- comment count -->
          <div
            class="w-20 h-[30px] flex justify-center items-center bg-[var(--primary)] rounded-[5px]"
          >
            <img :src="comment" class="w-5 h-5 mr-2" />
            <p class="text-[var(--white)] text-sm">{{ post.comments.length }}</p>
          </div>
        </div>
        <!-- comment list -->
        <ul class="flex flex-col gap-[30px]">
          <CommentItem
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
            :loginUserId="loginUserId"
            :onEdit="editComment"
            :onDelete="deleteComment"
          />
        </ul>
      </section>
    </main>
    <!-- comment input -->
    <section
      class="flex items-center justify-center absolute bottom-0 w-full max-w-[500px] h-[60px] bg-[var(--primary)] px-5"
    >
      <div class="flex w-full gap-[10px] justify-center items-center">
        <input
          v-model="commentInput"
          class="bg-[var(--white)] px-6 w-full h-10 rounded-[5px] flex items-center placeholder:font-normal placeholder:text-[var(--grey)] text-[15px] focus:outline-none"
          placeholder="댓글을 입력해주세요"
        />

        <button
          class="bg-[var(--white)] w-[60px] h-10 rounded-[5px] flex items-center justify-center text-[15px]"
          @click="submitComment"
        >
          등록
        </button>
      </div>
    </section>
  </div>
</template>
<style scoped></style>
