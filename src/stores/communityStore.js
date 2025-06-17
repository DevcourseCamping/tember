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
        userProfile: comment.profiles.image || comment.profiles.avatar_url,
        userId: comment.user_id,
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
  const toggleLike = async (post) => {
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

  const toggleLikeById = async (postId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id
      if (!userId) throw new Error('로그인이 필요합니다.')

      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .maybeSingle()

      if (existingLike) {
        await supabase.from('likes').delete().eq('id', existingLike.id)
        return { liked: false }
      } else {
        await supabase.from('likes').insert([{ post_id: postId, user_id: userId }])
        return { liked: true }
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }

  // add comment
  const addComment = async (postId, content) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id
      if (!userId) throw new Error('Login is required.')

      const { error } = await supabase.from('comments').insert([
        {
          post_id: postId,
          user_id: userId,
          content,
        },
      ])

      if (error) throw error
    } catch (e) {
      console.error(e)
    }
  }

  // submit comment
  const submitComment = async (postId, content, commentInputRef) => {
    try {
      if (!content?.trim()) return

      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id
      if (!userId) throw new Error('Login is required.')

      await addComment(postId, content.trim())

      if (commentInputRef) commentInputRef.value = ''

      const updatedPost = await getCommunityPostById(postId)

      return updatedPost
    } catch (e) {
      console.error(e)
      return null
    }
  }

  // update comment
  const updateComment = async (commentId, newContent) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ content: newContent })
        .eq('id', commentId)

      if (error) throw error
    } catch (e) {
      console.error(e)
    }
  }

  // delete comment
  const deleteComment = async (commentId) => {
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId)
      if (error) throw error
    } catch (e) {
      console.error(e)
    }
  }

  // create post
  const createPost = async ({ content, category, images }) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id
      const token = session?.access_token

      if (!userId || !token) throw new Error('로그인이 필요합니다.')

      const formData = new FormData()
      images.forEach((img) => {
        formData.append('image', img.file)
      })

      formData.append('content', content)
      formData.append('category', category)
      formData.append('userId', userId)

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`)
      }

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/post-create`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error(errorText)
        throw new Error('게시글 등록 실패')
      }

      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  // update post
  const updatePost = async ({ postId, content, category, images }) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const userId = session?.user?.id
      const token = session?.access_token

      if (!userId || !token) throw new Error('로그인이 필요합니다.')
      if (!userId || !token) {
        throw new Error('로그인이 필요합니다.')
      }

      const formData = new FormData()

      const keepImages = images.filter((img) => !img.file).map((img) => img.preview)

      images
        .filter((img) => img.file)
        .forEach((img) => {
          formData.append('image', img.file)
        })

      formData.append('content', content)
      formData.append('category', category)
      formData.append('userId', userId)
      formData.append('postId', postId)
      formData.append('keepImages', JSON.stringify(keepImages))

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/post-update`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('게시글 수정 실패')

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const deletePost = async (postId) => {
    try {
      // delete likes
      await supabase.from('likes').delete().eq('post_id', postId)
      // delete comments
      await supabase.from('comments').delete().eq('post_id', postId)
      // delete post
      await supabase.from('posts').delete().eq('id', postId)

      return true
    } catch (e) {
      console.error(e)
      return false
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
    toggleLikeById,
    addComment,
    submitComment,
    updateComment,
    deleteComment,
    createPost,
    updatePost,
    deletePost,
  }
})
