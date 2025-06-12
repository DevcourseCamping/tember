<script setup>
import HeaderOther from '@/components/common/HeaderOther.vue'
import { useCommunityStore } from '@/stores/communityStore'
import { onMounted, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import comment from '@/assets/icons/dark/dark-comment.svg'
import unlike from '@/assets/icons/dark/dark-like-outline.svg'
import like from '@/assets/icons/dark/dark-like-filled.svg'
import supabase from '@/utils/supabase'
// import CommentItem from '@/components/community/CommentItem.vue'
import BottomSheet from '@/components/common/BottomSheet.vue'
import more from '@/assets/icons/light/light-more.svg'

const route = useRoute()
const router=useRouter()
const postId = route.params.postId
const communityStore = useCommunityStore()

const post = ref(null)
const isLiked = ref(false)
const commentInput = ref('')
const loginUserId = ref(null)

const isBottomOpen = ref(false)
const clickMore = () => {
  isBottomOpen.value = true
  console.log('more')
}
const clickClose = () => {
  isBottomOpen.value = false
  console.log('close')
}

const handleSelect = (key) => {
  isBottomOpen.value = false
  if (key === 'edit') {
    router.push({ name: 'communityPostCreate', params: { postId } })
  }
  if (key === 'delete') {
    communityStore.deletePost(postId).then(() => {
      router.push({ name: 'communityList' })
    })
  }
}

const isCommentSheetOpen = ref(false)
// const openCommentMenu = () => { isCommentSheetOpen.value = true }
// const closeCommentMenu = () => { isCommentSheetOpen.value = false }

console.log('🧸 postId:', postId)

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

// const editComment = async (editedComment) => {
//   if (!editedComment.content.trim()) return

//   const { error } = await supabase
//     .from('comments')
//     .update({ content: editedComment.content })
//     .eq('id', editedComment.id)

//   if (error) {
//     console.error(error)
//     return
//   }

//   post.value = await communityStore.getCommunityPostById(postId)
// }

// const deleteComment = async (comment) => {
//   if (!confirm('댓글을 삭제하시겠어요?')) return
//   await communityStore.deleteComment(comment.id)
//   post.value = await communityStore.getCommunityPostById(postId)
// }

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
    <HeaderOther nav-type="back"
      menu-type="setting"
      @navClick="() => router.back()"
      @menuClick="clickMore" />
    <!-- 바텀시트 -->
    <Teleport to="body">
      <div
        v-if="isBottomOpen"
        class="fixed bottom-0 left-1/2 transform -translate-x-1/2
               w-full max-w-[500px] z-50"
      >
        <BottomSheet
          type="post"
          @close="clickClose"
          @select="handleSelect"
        />
      </div>
    </Teleport>
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
          <!-- <CommentItem
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
            :loginUserId="loginUserId"
            :onEdit="editComment"
            :onDelete="deleteComment"
          /> -->
          <li
        v-for="c in post.comments"
        :key="c.id"
        class="rounded-[5px] w-full border p-4 border-[var(--primary-30)]"
      >
        <div class="flex items-center mb-5 justify-between">
          <div class="flex items-center">
            <img :src="c.userProfile" class="w-10 h-10 rounded-full mr-[15px]" />
            <div>
              <p class="font-bold text-[14px] mb-[5px]">{{ c.userName }}</p>
              <p class="text-[var(--grey)] text-[13px]">{{ c.commentTime }}</p>
            </div>
          </div>

          <template v-if="c.userId === loginUserId">
           <div class="w-5 h-5 cursor-pointer" @click="isCommentSheetOpen = true">
             <img :src="more" alt="메뉴" />
           </div>
          </template>
        </div>

        <div>
          <p v-if="!isEditing" class="text-[15px]">{{ c.content }}</p>
          <textarea
            v-else
            v-model="editedContent"
            class="w-full h-[70px] border border-[var(--primary-30)]
                   px-2 py-1 text-sm rounded scrollbar-hide
                   focus:outline-none resize-none text-[15px]"
            :placeholder="c.content"
          />
        </div>
      </li>
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
    <Teleport to="body">
      <div
        v-if="isCommentSheetOpen"
        class="fixed bottom-0 left-1/2 transform -translate-x-1/2
               w-full max-w-[500px] z-50"
      >
        <BottomSheet
          type="comment"
          @close="isCommentSheetOpen = false"
          @select="key => {
            isCommentSheetOpen = false
            if (key === 'edit') {
              startEdit()
            }
            if (key === 'delete') {
              props.onDelete(c)
            }
          }"
        />
      </div>
    </Teleport>
  </div>
</template>
<style scoped></style>
