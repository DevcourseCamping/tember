<template>
  <div id="basic-info" class="w-full relative">
    <div class="m-[10px] p-[20px] flex flex-col gap-2">
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">환경</span>
        <span class="text-[#222222] dark:text-white">{{ campingDetail.lct_cl || '-' }}</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">사업주체</span>
        <span class="text-[#222222] dark:text-white">{{ campingDetail.faclt_div_nm || '-' }}</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">운영기간</span>
        <span class="text-[#222222] dark:text-white">{{ campingDetail.oper_pd_cl || '-' }}</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">운영일</span>
        <span class="text-[#222222] dark:text-white">{{ campingDetail.oper_de_cl || '-' }}</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">예약 방법</span>
        <span class="text-[#222222] dark:text-white">{{ campingDetail.resve_cl || '-' }}</span>
      </div>
      <div class="flex items-center justify-start gap-12">
        <span class="text-[#A8AEB2] w-[65px]">화로대</span>
        <span class="text-[#222222] dark:text-white">{{ campingDetail.brazier_cl || '-' }}</span>
      </div>
    </div>
  </div>
  <hr class="mx-5 border-b border-b-[#4B3C2F50]" />
  <div class="w-full relative">
    <div class="m-[10px] p-[20px]">
      <span class="text-[#222222] dark:text-white text-md font-bold">부대시설</span>
      <div class="grid gap-3 grid-cols-4 mt-[30px] w-full overflow-x-auto flex-nowrap">
        <div
          class="flex justify-center items-center flex-col w-[80px] gap-2"
          v-for="item in sbrsCl"
          :key="item.name"
        >
          <img :src="item.image" alt="" />
          <span class="text-[#222222] dark:text-white text-[14px] text-center">{{
            item.name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import light_amenity_electric from '../../../assets/icons/light/amenity/light-amenity-electric.svg'
import dark_amenity_electric from '../../../assets/icons/dark/amenity/dark-amenity-electric.svg'
import light_amenity_pool from '../../../assets/icons/light/amenity/light-amenity-pool.svg'
import dark_amenity_pool from '../../../assets/icons/dark/amenity/dark-amenity-pool.svg'

import light_amenity_playground from '../../../assets/icons/light/amenity/light-amenity-playground.svg'
import dark_amenity_playground from '../../../assets/icons/dark/amenity/dark-amenity-playground.svg'
import light_amenity_trampoline from '../../../assets/icons/light/amenity/light-amenity-trampoline.svg'
import dark_amenity_trampoline from '../../../assets/icons/dark/amenity/dark-amenity-trampoline.svg'

import light_amenity_gym from '../../../assets/icons/light/amenity/light-amenity-gym.svg'
import dark_amenity_gym from '../../../assets/icons/dark/amenity/dark-amenity-gym.svg'

import light_amenity_wifi from '../../../assets/icons/light/amenity/light-amenity-wifi.svg'
import dark_amenity_wifi from '../../../assets/icons/dark/amenity/dark-amenity-wifi.svg'

import light_amenity_firewood from '../../../assets/icons/light/amenity/light-amenity-firewood.svg'
import dark_amenity_firewood from '../../../assets/icons/dark/amenity/dark-amenity-firewood.svg'

import light_amenity_hot_water from '../../../assets/icons/light/amenity/light-amenity-hot-water.svg'
import dark_amenity_hot_water from '../../../assets/icons/dark/amenity/dark-amenity-hot-water.svg'

import light_amenity_trail from '../../../assets/icons/light/amenity/light-amenity-trail.svg'
import dark_amenity_trail from '../../../assets/icons/dark/amenity/dark-amenity-trail.svg'

import light_amenity_store from '../../../assets/icons/light/amenity/light-amenity-store.svg'
import dark_amenity_store from '../../../assets/icons/dark/amenity/dark-amenity-store.svg'

import light_amenity_dump_station from '../../../assets/icons/light/amenity/light-amenity-dump-station.svg'
import dark_amenity_dump_station from '../../../assets/icons/dark/amenity/dark-amenity-dump-station.svg'

import light_amenity_filed from '../../../assets/icons/light/amenity/light-amenity-filed.svg'
import dark_amenity_filed from '../../../assets/icons/dark/amenity/dark-amenity-filed.svg'

import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()

import { onMounted, ref } from 'vue'

const { campingDetail } = defineProps({
  campingDetail: {
    type: Object,
    required: true,
  },
})

const sbrsCl = ref([])

const getSbrsCl = () => {
  // 전기,무선인터넷,장작판매,온수,트렘폴린,물놀이장,놀이터,산책로,운동장,운동시설,마트.편의점,덤프스테이션
  if (campingDetail.sbrs_cl) {
    const sbrsClList = campingDetail.sbrs_cl.split(',')
    sbrsCl.value = sbrsClList.map((item) => {
      switch (item) {
        case '전기':
          return {
            image: themeStore.isDark ? dark_amenity_electric : light_amenity_electric,
            name: '전기',
          }
        case '무선인터넷':
          return {
            image: themeStore.isDark ? dark_amenity_wifi : light_amenity_wifi,
            name: '무선인터넷',
          }
        case '장작판매':
          return {
            image: themeStore.isDark ? dark_amenity_firewood : light_amenity_firewood,
            name: '장작판매',
          }
        case '온수':
          return {
            image: themeStore.isDark ? dark_amenity_hot_water : light_amenity_hot_water,
            name: '온수',
          }
        case '트렘폴린':
          return {
            image: themeStore.isDark ? dark_amenity_trampoline : light_amenity_trampoline,
            name: '트렘폴린',
          }
        case '물놀이장':
          return {
            image: themeStore.isDark ? dark_amenity_pool : light_amenity_pool,
            name: '물놀이장',
          }
        case '놀이터':
          return {
            image: themeStore.isDark ? dark_amenity_playground : light_amenity_playground,
            name: '놀이터',
          }
        case '산책로':
          return {
            image: themeStore.isDark ? dark_amenity_trail : light_amenity_trail,
            name: '산책로',
          }
        case '운동장':
          return {
            image: themeStore.isDark ? dark_amenity_filed : light_amenity_filed,
            name: '운동장',
          }
        case '운동시설':
          return {
            image: themeStore.isDark ? dark_amenity_gym : light_amenity_gym,
            name: '운동시설',
          }
        case '마트.편의점':
          return {
            image: themeStore.isDark ? dark_amenity_store : light_amenity_store,
            name: '마트.편의점',
          }
        case '덤프스테이션':
          return {
            image: themeStore.isDark ? dark_amenity_dump_station : light_amenity_dump_station,
            name: '덤프스테이션',
          }
        default:
          return {
            image: '',
            name: '',
          }
      }
    })
  }
}

onMounted(() => {
  getSbrsCl()
})
</script>

<style scoped></style>
