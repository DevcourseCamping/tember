<script setup>
import HeaderOther from '@/components/common/HeaderOther.vue'
import { useCommunityStore } from '@/stores/community'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import comment from '@/assets/icons/dark/dark-comment.svg'
import more from '@/assets/icons/light/light-more.svg'
import unlike from '@/assets/icons/dark/dark-like-outline.svg'
import like from '@/assets/icons/dark/dark-like-filled.svg'
import supabase from '@/utils/supabase'

const route = useRoute()
const postId = route.params.postId

console.log('🧸 postId:', postId)

const communityStore = useCommunityStore()
const post = ref(null)

const clickMore = () => {
  console.log('more')
}
const clickClose = () => {
  console.log('close')
}

const isLiked = ref(false)
const clickLike = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userId = session?.user?.id
  if (!userId || !post.value) return

  if (isLiked.value) {
    // unlike
    await supabase.from('likes').delete().eq('post_id', post.value.id).eq('user_id', userId)
    console.log('🧸 unliked!')
    post.value.likeCount--
  } else {
    // like
    await supabase.from('likes').insert([
      {
        post_id: post.value.id,
        user_id: userId,
      },
    ])
    console.log('🧸 liked!')
    post.value.likeCount++
  }
  isLiked.value = !isLiked.value
}

onMounted(async () => {
  const postData = await communityStore.getCommunityPostById(postId)
  if (postData) {
    post.value = postData
  }
  console.log('🧸 postData:', postData)

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userId = session?.user?.id

  if (userId) {
    const { data: likes } = await supabase
      .from('likes')
      .select()
      .eq('post_id', postId)
      .eq('user_id', userId)

    isLiked.value = likes.length > 0
  }
})

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userId = session?.user?.id

  if (userId) {
    const { data: likes } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single()

    isLiked.value = !!likes
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

      <!-- like / comment summary -->
      <section class="px-5 mb-[30px]">
        <div class="flex gap-[10px] justify-end">
          <!-- like -->
          <div
            class="w-20 h-[30px] flex justify-center items-center mb-[30px] bg-[var(--primary)] rounded-[5px] cursor-pointer"
            @click="clickLike"
          >
            <img :src="isLiked ? like : unlike" class="w-5 h-5 mr-2" />
            <p class="text-[var(--white)] text-base">{{ post.likeCount }}</p>
          </div>
          <!-- comment count -->
          <div
            class="w-20 h-[30px] flex justify-center items-center mb-[30px] bg-[var(--primary)] rounded-[5px]"
          >
            <img :src="comment" class="w-5 h-5 mr-2" />
            <p class="text-[var(--white)] text-base">{{ post.comments.length }}</p>
          </div>
        </div>
        <!-- comment list -->
        <ul class="flex flex-col gap-[30px]">
          <li
            v-for="(comment, index) in post.comments"
            :key="index"
            class="rounded-[5px] w-full border p-4 border-[var(--primary-30)]"
          >
            <div class="flex items-center mb-5 justify-between">
              <div class="flex items-center">
                <img :src="comment.userProfile" class="w-[50px] h-[50px] rounded-full mr-[15px]" />
                <div>
                  <p class="font-bold text-[15px] mb-[5px]">{{ comment.userName }}</p>
                  <p class="text-[var(--grey)] text-[13px]">{{ comment.commentTime }}</p>
                </div>
              </div>
              <img
                v-if="comment.userName === post.profiles.username"
                :src="more"
                class="w-[20px] h-[20px] cursor-pointer"
              />
            </div>
            <p>{{ comment.content }}</p>
          </li>
        </ul>
      </section>
    </main>
    <!-- comment input -->
    <section
      class="flex items-center justify-center absolute bottom-0 w-full h-[60px] bg-[var(--primary)]"
    >
      <input
        class="bg-[var(--white)] w-[390px] h-10 rounded-[5px] mr-[10px] flex items-center px-4 placeholder:font-normal placeholder:text-[var(--grey)] text-[15px] focus:outline-none"
        placeholder="댓글을 입력해주세요"
      />

      <button
        class="bg-[var(--white)] w-[60px] h-10 rounded-[5px] flex items-center justify-center text-[15px]"
      >
        등록
      </button>
    </section>
  </div>
</template>
<style scoped></style>
