<template>
  <div
    class="w-full dark:bg-black min-h-screen bg-white border-l border-r border-gray-200 relative z-20 transition-colors duration-300 md:w-[500px] md:mx-auto 2xl:w-[500px] 2xl:mx-auto"
  >
    <template v-if="loading">
      <CampingDetailSkeleton />
    </template>
    <template v-else>
      <CampingDetailImageSection
        :camping-image="campingDetail.campInfo.first_image_url"
        :review="campingDetail.campReview"
      />
      <CampingDetailNameSection
        :camping-name="campingDetail.campInfo.faclt_nm"
        :camping-induty="campingDetail.campInfo.induty"
        :camping-id="campingDetail.campInfo.content_id"
        :camping-caravan="campingDetail.campInfo.carav_acmpny_at"
        :camping-trailer="campingDetail.campInfo.trler_acmpny_at"
        :camping-pet="campingDetail.campInfo.animal_cmg_cl"
      />
      <CampingDetailBtnGroup />
      <CampingDetailIntro :camping-detail="campingDetail.campInfo" />
      <hr class="mx-5 border-b border-b-[#4B3C2F50] dark:border-b-[#dbdbdb50]" />
      <CampingDetailInfo :camping-intro="campingDetail.campInfo.intro" />
      <hr class="mx-5 border-b border-b-[#4B3C2F50] dark:border-b-[#dbdbdb50]" />
      <CampingDetailLocation
        :camping-location="{
          x: campingDetail.campInfo.map_x,
          y: campingDetail.campInfo.map_y,
          add1: campingDetail.campInfo.addr1,
          add2: campingDetail.campInfo.addr2,
        }"
      />
      <hr class="mx-5 border-b border-b-[#4B3C2F50] dark:border-b-[#dbdbdb50]" />
      <CampingDetailReview :camping-review="campingDetail.campReview" :camping-id="campingId" />
    </template>
  </div>
</template>

<script setup>
import CampingDetailImageSection from './components/CampingDetailImageSection.vue'
import CampingDetailNameSection from './components/CampingDetailNameSection.vue'
import CampingDetailBtnGroup from './components/CampingDetailBtnGroup.vue'
import CampingDetailIntro from './components/CampingDetailIntro.vue'
import CampingDetailInfo from './components/CampingDetailInfo.vue'
import CampingDetailLocation from './components/CampingDetailLocation.vue'
import CampingDetailReview from './components/CampingDetailReview.vue'
import CampingDetailSkeleton from './components/CampingDetailSkeleton.vue'

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const campingId = route.params.id
const loading = ref(true)
const campingDetail = ref(null)

const getCampingDetail = async () => {
  try {
    loading.value = true
    const response = await axios.get(
      `https://bszdfvksgtumpbnekvnd.supabase.co/functions/v1/get-campinfo/${campingId}`,
    )
    campingDetail.value = response.data
    console.log(campingDetail.value)
  } catch (error) {
    console.error('캠핑장 정보 조회 실패:', error)
    alert('캠핑장 정보 조회 실패')
    router.push('/')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!campingId) {
    alert('잘못된 접근입니다.')
    router.push('/')
    return
  }

  getCampingDetail()
})
</script>

<style scoped></style>
