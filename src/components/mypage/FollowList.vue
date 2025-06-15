<script setup>
import { useFollowStore } from '@/stores/followStore'
import { useUserStore } from '@/stores/userStore'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const profile = useUserStore()
const follow = useFollowStore()
const myId = computed(() => profile.user?.id)

const clickTab = ref(route.query.tab === 'following' ? 'following' : 'follower')

const props = defineProps({
  followers: {
    type: Array,
    default: () => [],
  },
  followings: {
    type: Array,
    default: () => [],
  },
})
</script>
<template>
  <div class="relative">
    <div class="flex justify-between px-[95px] pt-4 text-[15px]">
      <button
        @click="clickTab = 'follower'"
        :class="clickTab === 'follower' ? 'text-[var(--primary)] ' : 'text-[var(--primary-30)]'"
      >
        <span class="mr-3 font-semibold">팔로워</span>
        <span class="font-bold">{{ followers.length }}</span>
      </button>
      <button
        @click="clickTab = 'following'"
        :class="clickTab === 'following' ? 'text-[var(--primary)]' : 'text-[var(--primary-30)]'"
      >
        <span class="mr-3 font-semibold">팔로잉</span>
        <span class="font-bold">{{ followings.length }}</span>
      </button>
    </div>
    <div
      v-if="clickTab === 'follower'"
      class="absolute left-[0px] bottom-0 w-[250px] border-t-[2px] border-[var(--primary)]"
    ></div>
    <div
      v-if="clickTab === 'following'"
      class="absolute right-[0px] bottom-0 w-[250px] border-t-[2px] border-[var(--primary)]"
    ></div>

    <hr class="mt-[10px] border border-[var(--primary-20)]" />
  </div>

  <div class="h-[calc(100vh-80px)] overflow-y-auto px-[50px] py-[30px]">
    <section v-if="clickTab === 'follower'">
      <div
        v-if="clickTab === 'follower' && followers.length === 0"
        class="flex items-center justify-center text-[14px] text-[var(--grey)] h-[calc(100vh-250px)]"
      >
        아직 나를 팔로우한 캠퍼가 없습니다.
      </div>
      <div v-else>
        <ul>
          <li v-for="follower in followers" :key="follower.follower_id">
            <div class="flex items-center justify-between pb-5">
              <div class="flex items-center">
                <img
                  :src="follower.profiles.image || follower.profiles.avatar_url"
                  alt=""
                  class="w-[50px] h-[50px] rounded-full mr-[15px]"
                />
                <p v-text="follower.profiles.username" class="text-[15px] font-bold"></p>
              </div>
              <button
                v-if="!follower.isFollow && follower.follower_id !== myId"
                class="w-20 h-[30px] text-[13px] bg-[var(--primary)] rounded-[5px] text-[var(--white)]"
                @click="
                  async () => {
                    await follow.followUser(myId, follower.follower_id, 'followers')
                    follower.isFollow = true
                  }
                "
              >
                맞팔로우
              </button>
              <button
                v-else-if="follower.isFollow && follower.follower_id !== myId"
                class="w-20 h-[30px] text-[13px] bg-[var(--primary)] rounded-[5px] text-[var(--white)] flex items-center justify-center"
                @click="
                  async () => {
                    await follow.unfollowUser(myId, follower.follower_id, 'followers')
                    follower.isFollow = false
                  }
                "
              >
                팔로우 취소
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section v-if="clickTab === 'following'">
      <div
        v-if="clickTab === 'following' && followings.length === 0"
        class="flex items-center justify-center text-[14px] text-[var(--grey)] h-[calc(100vh-250px)]"
      >
        마음에 드는 캠퍼를 팔로우해보세요.
      </div>
      <div v-else>
        <ul>
          <li v-for="following in followings" :key="following.following_id">
            <div class="flex items-center justify-between pb-5">
              <div class="flex items-center">
                <img
                  :src="following.profiles.image || following.profiles.avatar_url"
                  alt=""
                  class="w-[50px] h-[50px] rounded-full mr-[15px]"
                />
                <p v-text="following.profiles.username" class="text-[15px] font-bold"></p>
              </div>
              <button
                v-if="following.following_id !== myId"
                class="w-20 h-[30px] text-[13px] border border-[var(--primary)] rounded-[5px]"
                @click="follow.unfollowUser(myId, following.following_id, 'followings')"
              >
                팔로우 취소
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<style scoped></style>
