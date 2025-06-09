<script setup>
import { ref } from 'vue'

const clickTab = ref('follower')

const followList = {
  userName: '캠핑 초보',
  followers: [
    {
      userName: '브라운',
      userProfile: 'https://i.pinimg.com/736x/29/94/93/299493fdceb2a8caa17d374811a86fb4.jpg',
      following: false,
    },
    {
      userName: '베어리스타',
      userProfile:
        'https://before-images-item.croketglobal.net/item/thumbnail/9bfc330b78f8a531b0719e4f852ed956.webp',
      following: true,
    },

    {
      userName: '눙눙',
      userProfile: 'https://cdn.thescoop.co.kr/news/photo/201909/36463_47941_5146.jpg',
      following: false,
    },
    {
      userName: '반곰흐',
      userProfile:
        'https://contents.sixshop.com/uploadedFiles/160014/default/image_1639124408718.jpg',
      following: true,
    },
  ],
  followingUsers: [
    {
      userName: '베어리스타',
      userProfile:
        'https://before-images-item.croketglobal.net/item/thumbnail/9bfc330b78f8a531b0719e4f852ed956.webp',
      following: true,
    },
    {
      userName: '반곰흐',
      userProfile:
        'https://contents.sixshop.com/uploadedFiles/160014/default/image_1639124408718.jpg',
      following: true,
    },
  ],
}
</script>
<template>
  <div class="flex justify-between px-[95px] pt-4 text-[15px] font-bold">
    <button
      @click="clickTab = 'follower'"
      :class="clickTab === 'follower' ? 'text-[var(--primary)]' : 'text-[var(--primary-30)]'"
    >
      <span>10</span>
      <span>팔로워</span>
    </button>
    <button
      @click="clickTab = 'following'"
      :class="clickTab === 'following' ? 'text-[var(--primary)]' : 'text-[var(--primary-30)]'"
    >
      <span>10</span>
      <span>팔로잉</span>
    </button>
  </div>
  <hr class="mt-[10px] border border-[var(--primary-20)]" />

  <div class="h-[calc(100vh-80px)] overflow-y-auto px-[50px] py-[30px]">
    <section v-if="clickTab === 'follower'">
      <ul>
        <li v-for="follower in followList.followers" :key="follower.userName">
          <div class="flex items-center justify-between pb-5">
            <div class="flex items-center">
              <img
                :src="follower.userProfile"
                alt=""
                class="w-[50px] h-[50px] rounded-full mr-[15px]"
              />
              <p v-text="follower.userName" class="text-[15px] font-bold"></p>
            </div>
            <button
              v-if="follower.following === true"
              class="w-20 h-[30px] text-[13px] border border-[var(--primary)] rounded-[5px]"
            >
              언팔로우
            </button>
            <button
              v-else
              class="w-20 h-[30px] text-[13px] bg-[var(--primary)] rounded-[5px] text-[var(--white)]"
            >
              맞팔로우
            </button>
          </div>
        </li>
      </ul>
    </section>
    <section v-if="clickTab === 'following'">
      <ul>
        <li v-for="followingUser in followList.followingUsers" :key="followingUser.userName">
          <div class="flex items-center justify-between pb-5">
            <div class="flex items-center">
              <img
                :src="followingUser.userProfile"
                alt=""
                class="w-[50px] h-[50px] rounded-full mr-[15px]"
              />
              <p v-text="followingUser.userName" class="text-[15px] font-bold"></p>
            </div>
            <button class="w-20 h-[30px] text-[13px] border border-[var(--primary)] rounded-[5px]">
              언팔로우
            </button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<style scoped></style>
