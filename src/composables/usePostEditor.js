import { ref } from 'vue'
import { useCommunityStore } from '@/stores/communityStore'

export function usePostEditor(post) {
  const communityStore = useCommunityStore()

  const isEditing = ref(false)
  const editedContent = ref('')
  const editableImages = ref([])
  const editedCategory = ref('default')

  const startEdit = () => {
    isEditing.value = true
    editedContent.value = post.value.content
    editedCategory.value = post.value.category || 'default'

    try {
      const parsed = JSON.parse(post.value.image || '[]')
      editableImages.value = parsed.map((url) => ({ file: null, preview: url }))
    } catch {
      editableImages.value = []
    }
  }

  const cancelEdit = () => {
    isEditing.value = false
  }

  const updateContent = (val) => {
    editedContent.value = val
  }

  const updateImages = (val) => {
    editableImages.value = val
  }

  const updateCategory = (val) => {
    editedCategory.value = val
  }

  const saveEdit = async () => {
    if (!editedContent.value.trim()) {
      console.warn('본문 없음')
      return false
    }

    const success = await communityStore.updatePost({
      postId: post.value.id,
      content: editedContent.value,
      category: editedCategory.value,
      images: editableImages.value,
    })

    if (success) {
      alert('게시글이 수정되었습니다.')
      isEditing.value = false
      post.value = await communityStore.getCommunityPostById(post.value.id)
    } else {
      alert('게시글 수정에 실패했습니다.')
    }

    return success
  }

  return {
    isEditing,
    editedContent,
    editableImages,
    editedCategory,
    startEdit,
    cancelEdit,
    updateContent,
    updateImages,
    updateCategory,
    saveEdit,
  }
}
