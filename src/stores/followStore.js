import supabase from '@/utils/supabase'
import { defineStore } from 'pinia'

export const useFollowStore = defineStore('followStore', {
  state: () => ({
    followers: [],
    followings: [],
    isFollowing: false,
  }),

  actions: {
    async followUser(myId, userId, list = 'followers') {
      const { data: exist } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', myId)
        .eq('following_id', userId)

      if (exist && exist.length > 0) {
        this.isFollowing = true
        return
      }
      const { error } = await supabase.from('follows').insert([
        {
          follower_id: myId,
          following_id: userId,
        },
      ])
      if (!error) this.isFollowing = true

      await this.fetchFollowing(myId)

      if (list === 'followers') {
        await this.fetchFollowers(myId)
      }
    },

    async unfollowUser(myId, userId, list = 'followings') {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', myId)
        .eq('following_id', userId)

      if (error) return
      this.isFollowing = false

      if (list === 'followings') {
        this.followings = this.followings.filter((item) => item.following_id !== userId)
        const target = this.followers.find((item) => item.follower_id === userId)
        if (target) target.isFollow = false
      } else if (list === 'followers') {
        const target = this.followers.find((item) => item.follower_id === userId)
        if (target) target.isFollow = false
      }

      await this.fetchFollowing(myId)
    },

    async fetchFollowers(userId) {
      const { data, error } = await supabase
        .from('follows')
        .select('follower_id, profiles: follower_id(*)')
        .eq('following_id', userId)

      if (error) return

      const MyFollowing = this.followings.map((item) => item.following_id)
      this.followers = data.map((item) => ({
        ...item,
        isFollow: MyFollowing.includes(item.follower_id),
      }))
    },

    async fetchFollowing(userId) {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id, profiles: following_id(*)')
        .eq('follower_id', userId)

      if (!error) this.followings = data
    },

    async fetchIsFollowing(myId, userId) {
      const { data } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', myId)
        .eq('following_id', userId)

      this.isFollowing = data.length > 0
    },
  },
})
