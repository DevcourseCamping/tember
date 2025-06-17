import { useUserApi } from '@/composables/useUserApi'
import supabase from '@/utils/supabase'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
  }),

  getters: {
    user_id: (state) => state.user?.id,
  },

  actions: {
    async fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error || !user) {
        this.user = null
        return user
      }

      const { getUser } = useUserApi()
      const data = await getUser(user.id)

      this.user = {
        ...data.user,
        followingCount: data.followingCount,
        followerCount: data.followerCount,
      }
      return this.user
    },

    updateUser(userData) {
      this.user = {
        ...this.user,
        ...userData,
      }
    },
  },
})
