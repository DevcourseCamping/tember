import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCommunityStore } from '@/stores/communityStore'
import supabase from '@/utils/supabase'
import router from '@/router'

export function usePostDetail(startEdit) {
  const route = useRoute()
  const postId = route.params.postId
  const communityStore = useCommunityStore()

  const post = ref(null)
  const isLiked = ref(false)
  const loginUserId = ref(null)

  const isMyPost = computed(() => post.value?.user_id === loginUserId.value)

  const imageList = computed(() => {
    try {
      const parsed = JSON.parse(post.value?.image || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const getPost = async () => {
    post.value = await communityStore.getCommunityPostById(postId)
  }

  const submitComment = async (content) => {
    if (!content?.trim()) return
    await communityStore.addComment(post.value.id, content)
    await getPost()
  }

  const editComment = async (editedComment) => {
    if (editedComment.editTrigger) {
      const target = post.value.comments.find((c) => c.id === editedComment.id)
      if (target) target.editing = true
      return
    }

    if (!editedComment.content.trim()) return
    await communityStore.updateComment(editedComment.id, editedComment.content)
    await getPost()
  }

  const deleteComment = async (comment) => {
    if (!confirm('댓글을 삭제하시겠어요?')) return
    await communityStore.deleteComment(comment.id)
    await getPost()
  }

  const clickLike = async () => {
    const result = await communityStore.toggleLikeById(post.value.id)
    if (!result) return
    isLiked.value = result.liked
    post.value.likeCount += result.liked ? 1 : -1
  }

  onMounted(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    loginUserId.value = session?.user?.id
    await getPost()

    if (loginUserId.value) {
      const { data: like } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', loginUserId.value)
        .maybeSingle()
      isLiked.value = !!like
    }
  })

  const isBottomOpen = ref(false)

  const clickBack = () => {
    router.back()
  }

  const clickSetting = () => {
    isBottomOpen.value = !isBottomOpen.value
  }

  const handleSelect = async (key) => {
    isBottomOpen.value = false
    if (key === 'edit') {
      startEdit()
    } else if (key === 'delete') {
      const confirmed = confirm('게시글을 삭제하시겠어요?')
      if (!confirmed) return
      const success = await communityStore.deletePost(post.value.id)
      if (success) {
        alert('게시글이 삭제되었습니다.')
        router.push({ name: 'communityList' })
      } else {
        alert('게시글 삭제에 실패했습니다.')
      }
    }
  }

  const goToUserProfile = (userId) => {
    router.push({ name: 'user-profile', params: { id: userId } })
  }

  return {
    post,
    isLiked,
    loginUserId,
    isMyPost,
    imageList,
    submitComment,
    editComment,
    deleteComment,
    clickLike,
    isBottomOpen,
    clickBack,
    clickSetting,
    handleSelect,
    goToUserProfile,
  }
}
