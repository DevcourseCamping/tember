import supabase from '@/utils/supabase'
import axios from 'axios'

const userApi = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL + '/functions/v1',
})

export function useUserApi() {
  const getUser = async (user_id) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error || !session) throw new Error('no 세션')

    const token = session.access_token

    const res = await userApi.get(`/profile/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const {
      data: { user, followerCount, followingCount },
    } = res.data

    return {
      user,
      followingCount,
      followerCount,
    }
  }

  const updateUser = async (formData) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error || !session) throw new Error('no 세션')

    const token = session.access_token

    const res = await userApi.patch(`/update-profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  }

  const getPost = async (user_id) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error || !session) throw new Error('no 세션')

    const token = session.access_token

    const res = await userApi.get(`/get-user-posts/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  }

  const getBookmark = async (user_id) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error || !session) throw new Error('no 세션')

    const token = session.access_token

    const res = await userApi.get(`/get-bookmark/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data.bookmark
  }

  const getReview = async (content_id) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error || !session) throw new Error('no 세션')
    const token = session.access_token

    const res = await userApi.get(`/get-campinfo/${content_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  }

  return { getUser, updateUser, getPost, getBookmark, getReview }
}
