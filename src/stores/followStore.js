import supabase from '@/utils/supabase'
import { defineStore } from 'pinia'

export const useFollowStore = defineStore('followStore', {
  state: () => ({
    followers: [],
    followings: [],
    isFollowing: false,
  }),

  actions: {
    async followUser(myId, userId) {
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
    },

    async unfollowUser(myId, userId) {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', myId)
        .eq('following_id', userId)

      if (!error) this.isFollowing = false
    },

    async fetchFollowers(userId) {
      const { data, error } = await supabase
        .from('follows')
        .select('follower_id, profiles(*)')
        .eq('following_id', userId)

      if (!error) this.followers = data
    },

    async fetchFollowing(userId) {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id, profiles(*)')
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
