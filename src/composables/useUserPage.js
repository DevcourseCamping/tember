import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useUserPage() {
  const route = useRoute()
  const profile = useUserStore()

  const routeUserId = computed(() => route.params.id)
  const isMyPage = computed(() => !routeUserId.value || routeUserId.value === profile.user?.id)
  const targetUserId = computed(() => routeUserId.value || profile.user?.id)

  return { routeUserId, isMyPage, targetUserId }
}
