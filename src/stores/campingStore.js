import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './userStore'
import axios from 'axios'

export const useCampingStore = defineStore('camping', () => {
  const campingList = ref([])
  const total = ref(0)

  const fetchCampingList = async (filterRequestBody = null, page = 1, pageSize = 20) => {
    const userStore = useUserStore()
    const user = await userStore.fetchUser()

    const response = await axios.post(
      'https://bszdfvksgtumpbnekvnd.supabase.co/functions/v1/camping',
      {
        ...filterRequestBody,
        page,
        pageSize,
        userId: user.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const newCampingList = response.data.data.map((item) => {
      return {
        camp_sites: item,
      }
    })

    campingList.value = [...campingList.value, ...newCampingList]
    total.value = response.data.total
  }

  return { campingList, total, fetchCampingList }
})
