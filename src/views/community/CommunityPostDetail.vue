<script setup>
import HeaderSimple from '@/components/common/HeaderSimple.vue'

const post = {
  user: {
    userName: '나는캠퍼',
    profileImg: 'https://i.pinimg.com/736x/29/94/93/299493fdceb2a8caa17d374811a86fb4.jpg',
  },
  postTime: '5일 전',
  postImg: 'https://i.pinimg.com/736x/e4/36/7a/e4367a74743851857625c527f6db1341.jpg',
  like: {
    isLiked: true,
    likeCount: 12,
  },
  postContent: '불멍불멍불멍~~~~~',
  comments: [
    {
      userName: '나는캠퍼',
      userProfile: 'https://i.pinimg.com/736x/29/94/93/299493fdceb2a8caa17d374811a86fb4.jpg',
      commentTime: '2일 전',
      content: '내가 단 댓글',
    },
    {
      userName: '캠핑초보',
      userProfile: 'https://i.pinimg.com/736x/70/b2/fd/70b2fda39f0cef00562f0c7581000994.jpg',
      commentTime: '1일 전',
      content: '와 너무 예쁘네요!',
    },
    {
      userName: '캠핑가고싶다',
      userProfile: 'https://i.pinimg.com/736x/12/27/1a/12271ab0f8ddd03c02031614abf6d3f6.jpg',
      commentTime: '8시간 전',
      content: `와 너무 예쁘네요!\n불멍하기에도 좋고 풍경도 너무 예쁘네요 ㅎㅎ\n저도 가보고싶습니다~`,
    },
    {
      userName: '안녕',
      userProfile: 'https://i.pinimg.com/736x/82/57/08/8257081f34bc00d539fbd2095a8b0bba.jpg',
      commentTime: '2시간 전',
      content: '저도 가보고 싶어요!',
    },
  ],
}
const clickMore = () => {
  console.log('more')
}
const clickClose = () => {
  console.log('close')
}
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSimple @navClick="clickClose" @menuClick="clickMore" />
    <!-- main -->
    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 80px - 60px)">
      <!-- post -->
      <section class="my-[30px] px-5 flex items-center justify-between">
        <div class="flex items-center">
          <img :src="post.user.profileImg" class="w-[45px] h-[45px] rounded-full mr-[15px]" />
          <p v-text="post.user.userName" class="font-bold text-[15px]"></p>
        </div>
        <p v-text="post.postTime" class="text-[var(--grey)] text-sm"></p>
      </section>
      <section class="w-[500px] h-[480px] overflow-hidden">
        <img :src="post.postImg" class="w-full h-full object-cover" />
      </section>
      <section class="px-5 mt-[30px] mb-[100px]">
        <p v-text="post.postContent"></p>
      </section>
      <!-- comment -->
      <section class="px-5 mb-[30px]">
        <div class="flex items-center mb-[30px]">
          <p class="text-[20px] font-bold mr-[10px]">댓글</p>
          <p v-text="post.comments.length" class="text-[18px] text-[var(--grey)]"></p>
        </div>
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
                  <p v-text="comment.userName" class="font-bold text-[15px] mb-[5px]"></p>
                  <p v-text="comment.commentTime" class="text-[var(--grey)] text-[13px]"></p>
                </div>
              </div>
              <img
                v-if="comment.userName === post.user.userName"
                src="@/assets/icons/light/light-more.svg"
                class="w-[20px] h-[20px] cursor-pointer"
              />
            </div>
            <p v-html="comment.content.replace(/\n/g, '<br>')"></p>
          </li>
        </ul>
      </section>
    </main>
    <!-- comment input section -->
    <section
      class="flex items-center justify-center absolute bottom-0 w-full h-[60px] bg-[var(--primary)]"
    >
      <input
        class="bg-[var(--white)] w-[390px] h-10 rounded-[5px] mr-[10px] flex items-center px-4 placeholder:font-normal placeholder:text-[var(--grey)] text-[15px]"
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
