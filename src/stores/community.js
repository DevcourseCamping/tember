import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import supabase from '@/utils/supabase'

export const useCommunityStore = defineStore('community', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const page = ref(1)
  const maxLength = ref(10)
  const sorted = ref('created')

  // post list
  const getCommunityPosts = async ({
    page: newPage = 1,
    maxLength: newMaxLength = 10,
    sorted: newSorted = 'created',
  } = {}) => {
    loading.value = true
    error.value = null

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id

      const { data, error: fetchError } = await useFetch('getPosts', {
        page: newPage,
        maxLength: newMaxLength,
        sorted: newSorted,
      })

      if (fetchError) throw fetchError

      const postsWithLikes = await Promise.all(
        data.data.map(async (post) => {
          if (!userId) return { ...post, isLiked: false }

          const { data: likeData } = await supabase
            .from('likes')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', userId)
            .maybeSingle()

          return { ...post, isLiked: !!likeData }
        }),
      )

      posts.value = postsWithLikes
      page.value = data.page
      maxLength.value = data.maxLength
      sorted.value = newSorted
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  // post detail
  const getCommunityPostById = async (postId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) throw new Error('Login is required.')

      const { data: response, error: fetchError } = await useFetch(`getPost/${postId}`, {}, token)

      if (fetchError) throw fetchError

      const { post, likeCount, comments } = response.data

      const commentsData = comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        commentTime: comment.created_at,
        userName: comment.profiles.username,
        userProfile: comment.profiles.avatar_url,
      }))

      return {
        ...post,
        likeCount,
        comments: commentsData,
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }

  // like toggle
  const toggleLike = async (post /* ref 아님: plain object */) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id
      if (!userId) throw new Error('Login is required.')

      if (post.isLiked) {
        await supabase.from('likes').delete().eq('post_id', post.id).eq('user_id', userId)

        post.likeCount -= 1
        post.isLiked = false
      } else {
        await supabase.from('likes').insert([{ post_id: post.id, user_id: userId }])

        post.likeCount += 1
        post.isLiked = true
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    posts,
    loading,
    error,
    page,
    maxLength,
    sorted,
    getCommunityPosts,
    getCommunityPostById,
    toggleLike,
  }
})
