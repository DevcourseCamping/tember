import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/utils/supabase'

export const useReviewStore = defineStore('review', () => {
  const isSubmitting = ref(false)
  const error = ref(null)

  const createReview = async ({ campId, content, rating, cleanliness }) => {
    isSubmitting.value = true
    error.value = null

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id

      if (!userId) throw new Error('Login is required.')

      const { error: insertError } = await supabase.from('camp_reviews').insert([
        {
          camp_id: campId,
          user_id: userId,
          content,
          star_rating: rating,
          cleanliness,
        },
      ])

      if (insertError) throw insertError

      return true
    } catch (e) {
      console.error('리뷰 등록 실패:', e)
      error.value = e.message
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isSubmitting,
    error,
    createReview,
  }
})
