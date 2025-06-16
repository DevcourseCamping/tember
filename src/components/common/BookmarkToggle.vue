<template>
  <img
    :src="isBookmarked ? filledBookmarkIcon : outlineBookmarkIcon"
    alt="북마크"
    class="pr-[15px]"
    @click="toggleBookmark($event)"
  />
</template>

<script setup>
import { ref } from 'vue'
import supabase from '@/utils/supabase'
import filledBookmarkIcon from '../../assets/icons/light/light-bookmark-filled.svg'
import outlineBookmarkIcon from '../../assets/icons/light/light-bookmark-outline.svg'
import { useUserStore } from '@/stores/userStore'

const profile = useUserStore()

const props = defineProps({
  campingId: {
    type: String,
  },
  isBookmark: {
    type: Boolean,
  },
})

const isBookmarked = ref(props.isBookmark)
const bookmarkImage = ref(props.isBookmark ? filledBookmarkIcon : outlineBookmarkIcon)
const toggleBookmark = async (e) => {
  e.preventDefault()
  try {
    const user = await profile.fetchUser()
    if (!user || !user.id) {
      isBookmarked.value = false
      return
    }
    if (isBookmarked.value) {
      // 북마크 삭제
      const { error } = await supabase
        .from('bookmark')
        .delete()
        .eq('camp_id', props.campingId)
        .eq('user_id', user.id)

      if (error) throw error
      alert('북마크가 삭제되었습니다.')
      bookmarkImage.value = outlineBookmarkIcon
      isBookmarked.value = false
    } else {
      // 북마크 추가
      const { error } = await supabase
        .from('bookmark')
        .insert([{ camp_id: props.campingId, user_id: user.id }])
        .select()
      if (error) throw error

      alert('북마크가 추가되었습니다.')
      bookmarkImage.value = filledBookmarkIcon
      isBookmarked.value = true
    }
  } catch (error) {
    console.log(error)
    alert('북마크 추가 또는 삭제에 실패했습니다.')
  }
}
</script>

<style scoped></style>
