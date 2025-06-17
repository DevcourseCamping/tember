<script setup>
import HeaderSearchMain from '@/components/common/HeaderSearchMain.vue'
import NavBar from '@/components/common/NavBar.vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import { computed, nextTick, onMounted, ref } from 'vue'
import SearchFilter from '@/components/searchfilter/SearchFilter.vue'
import { useCommunityStore } from '@/stores/communityStore'
import { storeToRefs } from 'pinia'
import supabase from '@/utils/supabase'
import lightCaravanOn from '@/assets/icons/light/light-caravan-on.svg'
import lightCaravanOff from '@/assets/icons/light/light-caravan-off.svg'
import darkCaravanOn from '@/assets/icons/dark/dark-caravan-on.svg'
import darkCaravanOff from '@/assets/icons/dark/dark-caravan-off.svg'
import lightTrailerOn from '@/assets/icons/light/light-trailer-on.svg'
import lightTrailerOff from '@/assets/icons/light/light-trailer-off.svg'
import darkTrailerOn from '@/assets/icons/dark/dark-trailer-on.svg'
import darkTrailerOff from '@/assets/icons/dark/dark-trailer-off.svg'
import lightPetOn from '@/assets/icons/light/light-pet-on.svg'
import lightPetOff from '@/assets/icons/light/light-pet-off.svg'
import darkPetOn from '@/assets/icons/dark/dark-pet-on.svg'
import darkPetOff from '@/assets/icons/dark/dark-pet-off.svg'
import lightLike from '@/assets/icons/light/light-like-outline.svg'
import darkLike from '@/assets/icons/dark/dark-like-outline.svg'
import lightComment from '@/assets/icons/light/light-comment.svg'
import darkComment from '@/assets/icons/dark/dark-comment.svg'
import fillstar from '@/assets/icons/star-filled.svg'
import emptystar from '@/assets/icons/star-outline.svg'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()

const isFilterModalOpen = ref(false)

const handleFilterClick = () => {
  isFilterModalOpen.value = true
}
const handleFilterClose = () => {
  isFilterModalOpen.value = false
}
const handleCategoryClick = (category) => {
  if (category === 'chatbot') {
    router.push('/chatbot')
  } else {
    router.push({ path: '/search', query: { category } })
  }
}

const popularCamping = ref([])

const fetchPopularCamping = async () => {
  try {
    const res = await fetch('https://bszdfvksgtumpbnekvnd.supabase.co/functions/v1/popular-camping')
    const data = await res.json()
    console.log('캠핑장 응답값:', data)
    popularCamping.value = data.campingData

    nextTick(() => {
      checkAllImagesLoaded()
    })
  } catch (e) {
    console.error('로딩 실패', e)
  }
}

const groupedPopular = computed(() => {
  const sorted = [...popularCamping.value].sort((a, b) => {
    const ratingA = a.avg_rating ?? -1
    const ratingB = b.avg_rating ?? -1
    return ratingB - ratingA
  })

  const result = []
  for (let i = 0; i < sorted.length; i += 2) {
    result.push(sorted.slice(i, i + 2))
  }
  return result
})

const communityStore = useCommunityStore()
const { posts } = storeToRefs(communityStore)

const allImagesLoaded = ref(false)
const checkAllImagesLoaded = () => {
  const images = document.querySelectorAll('.popular-slide-img')
  let loadedCount = 0

  images.forEach((img) => {
    if (img.complete) {
      loadedCount++
    } else {
      img.addEventListener('load', () => {
        loadedCount++
        if (loadedCount === images.length) {
          allImagesLoaded.value = true
        }
      })
    }
  })
  if (loadedCount === images.length) {
    allImagesLoaded.value = true
  }
}

onMounted(() => {
  fetchPopularCamping()
  communityStore.getCommunityImagePosts({ maxLength: 8 })
  fetchLatestReviews()
})

const groupedPosts = computed(() => {
  const result = []
  for (let i = 0; i < posts.value.length; i += 2) {
    result.push(posts.value.slice(i, i + 2))
  }
  return result
})

const goToDetail = (postId) => {
  router.push(`/community/${postId}`)
}

const goToCampingDetail = (id) => {
  router.push(`/camping/${id}`)
}

const latestReviews = ref([])
const fetchLatestReviews = async () => {
  const { data, error } = await supabase
    .from('camp_reviews')
    .select(
      `
      id,
      content,
      star_rating,
      created_at,
      profiles(username),
      camps:camp_id(id, content_id, faclt_nm)
    `,
    )
    .order('star_rating', { ascending: false })
    .limit(8)

  if (error) {
    console.error('리뷰 가져오기 실패:', error)
    return
  }

  latestReviews.value = data
}

const themeStore = useThemeStore()
</script>

<template>
  <div class="mx-auto w-full max-w-[500px] h-screen bg-[--white] dark:bg-[#1C1C1C]">
    <HeaderSearchMain
      @filterClick="handleFilterClick"
      @categoryClick="handleCategoryClick"
      class="min-h-[168px]"
    />
    <div v-if="isFilterModalOpen" class="fixed inset-0 z-50 overflow-y-auto scrollbar-hide">
      <SearchFilter @close="handleFilterClose" />
    </div>

    <main class="overflow-y-auto scrollbar-hide" style="height: calc(100vh - 168px - 60px)">
      <section class="bg-[#FFFFFF] pt-[39px] pb-[39px] dark:bg-[#121212]"></section>
      <section
        class="bg-[#F2F2F2] overflow-hidden relative pt-[72px] pb-[72px] z-0 dark:bg-[#1C1C1C]"
      >
        <h2
          class="font-bold text-[17px] ml-[20px] mt-[-52px] mb-[20px] text-[#4A4A4A] dark:text-[#EDE8E4]"
        >
          Popular
        </h2>
        <Swiper
          v-if="allImagesLoaded"
          :slides-per-view="'auto'"
          :space-between="30"
          :centered-slides="true"
          :loop="true"
          :initial-slide="0"
          grab-cursor
          class="px-[30px]"
        >
          <SwiperSlide
            v-for="(group, idx) in groupedPopular"
            :key="`popular-${idx}`"
            class="!w-[300px] h-[136px] flex-shrink-0 cursor-pointer"
          >
            <div class="flex flex-col gap-[30px]">
              <div
                v-for="camp in group"
                :key="camp.content_id"
                @click="goToCampingDetail(camp.content_id)"
                class="w-[300px] h-[136px] bg-white rounded-[5px] shadow flex overflow-hidden dark:bg-[#2A2A2A]"
              >
                <img
                  :src="
                    camp.first_image_url ||
                    'https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?w=900&auto=format&fit=crop'
                  "
                  alt="캠핑장 이미지"
                  class="w-[110px] h-full object-cover rounded-[5px]"
                />

                <div class="flex flex-col justify-between p-[10px] flex-1">
                  <div>
                    <p
                      class="text-[15px] font-bold text-[--black] leading-tight line-clamp-1 mt-[10px] dark:text-[--white]"
                    >
                      {{ camp.faclt_nm }}
                    </p>
                    <p class="text-[13px] text-[--grey] mt-[10px]">
                      {{ camp.do_nm }} {{ camp.sigungu_nm }}
                    </p>
                  </div>

                  <div class="w-full h-[1px] bg-[--primary] mt-[15px] dark:bg-[--white-30]"></div>
                  <div class="flex justify-end items-center gap-[10px]">
                    <img
                      :src="
                        camp.carav_acmpny_at === 'Y'
                          ? themeStore.isDark
                            ? darkCaravanOn
                            : lightCaravanOn
                          : themeStore.isDark
                            ? darkCaravanOff
                            : lightCaravanOff
                      "
                      class="w-[20px] h-[20px]"
                    />

                    <img
                      :src="
                        camp.trler_acmpny_at === 'Y'
                          ? themeStore.isDark
                            ? darkTrailerOn
                            : lightTrailerOn
                          : themeStore.isDark
                            ? darkTrailerOff
                            : lightTrailerOff
                      "
                      class="w-[20px] h-[20px]"
                    />

                    <img
                      :src="
                        camp.animal_cmg_cl.includes('가능')
                          ? themeStore.isDark
                            ? darkPetOn
                            : lightPetOn
                          : themeStore.isDark
                            ? darkPetOff
                            : lightPetOff
                      "
                      class="w-[20px] h-[20px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section class="bg-[--white] pt-[72px] pb-[72px] dark:bg-[#121212]">
        <ul class="flex flex-col gap-[40px]">
          <li class="flex items-start">
            <img
              :src="darkCaravanOn"
              alt="개인 카라반"
              class="w-[30px] h-[30px] ml-[42px] mr-[20px] flex-shrink-0"
            />
            <div>
              <p class="text-[18px] font-bold text-[#222222] dark:text-[--white]">
                개인 카라반 동반
              </p>
              <p class="text-[15px] text-[--grey] mt-[10px]">
                내 집처럼 편안하게 캠핑을 즐겨보세요
              </p>
            </div>
          </li>

          <li class="flex items-start">
            <img
              :src="darkTrailerOn"
              alt="트레일러"
              class="w-[30px] h-[30px] ml-[42px] mr-[20px] flex-shrink-0"
            />
            <div>
              <p class="text-[18px] font-bold text-[#222222] dark:text-[--white]">
                개인 트레일러 동반
              </p>
              <p class="text-[15px] text-[--grey] mt-[10px]">
                트레일러와 함께 어디든 자유롭게 떠나요
              </p>
            </div>
          </li>

          <li class="flex items-start">
            <img
              :src="darkPetOn"
              alt="반려동물"
              class="w-[30px] h-[30px] ml-[42px] mr-[20px] flex-shrink-0"
            />
            <div>
              <p class="text-[18px] font-bold text-[#222222] dark:text-[--white]">반려 동물 동반</p>
              <p class="text-[15px] text-[--grey] mt-[10px]">
                사랑하는 반려동물과 함께하는 특별한 추억을 만들어보세요
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section
        class="bg-[#F2F2F2] overflow-hidden relative pt-[72px] pb-[72px] z-0 dark:bg-[#1C1C1C]"
      >
        <h2
          class="font-bold text-[17px] ml-[20px] mt-[-52px] mb-[20px] text-[#4A4A4A] dark:text-[#EDE8E4]"
        >
          Community
        </h2>

        <Swiper
          :slides-per-view="'auto'"
          :space-between="30"
          :centered-slides="true"
          :loop="true"
          :initial-slide="2"
          grab-cursor
          class="px-[30px]"
        >
          <SwiperSlide
            v-for="(group, idx) in groupedPosts"
            :key="`group-${idx}`"
            class="!w-[300px] flex flex-col gap-[30px] flex-shrink-0"
          >
            <div class="flex flex-col gap-[30px]">
              <div
                v-for="post in group"
                :key="post.id"
                @click="goToDetail(post.id)"
                class="w-[300px] h-[142px] bg-white rounded-[5px] shadow flex overflow-hidden dark:bg-[#2A2A2A]"
              >
                <img
                  v-if="
                    post.image &&
                    JSON.parse(post.image).length > 0 &&
                    JSON.parse(post.image)[0] !== ''
                  "
                  :src="JSON.parse(post.image)[0]"
                  alt="커뮤니티 이미지"
                  class="w-[110px] h-full object-cover rounded-[5px]"
                />
                <div class="flex flex-col justify-between p-[15px] flex-1">
                  <p
                    class="text-[14px] text-[--black] leading-[1.4] line-clamp-3 min-h-[60px] dark:text-[--white]"
                  >
                    {{ post.content }}
                  </p>

                  <div
                    class="pt-[10px] border-t border-[--primary] mt-auto dark:border-[--white-30]"
                  >
                    <div
                      class="flex justify-end items-center gap-[5px] text-[14px] dark:text-[--white]"
                    >
                      <img
                        :src="themeStore.isDark ? darkLike : lightLike"
                        class="w-[20px] h-[20px]"
                      />
                      <p class="mr-[5px]">{{ post.likeCount }}</p>

                      <img
                        :src="themeStore.isDark ? darkComment : lightComment"
                        class="w-[20px] h-[20px]"
                      />
                      <p>{{ post.commentCount }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section class="bg-[#FFFFFF] pt-[72px] pb-[160px] z-0 dark:bg-[#121212]">
        <h2 class="text-center font-bold text-[20px] text-[#4A4A4A] mb-[50px] dark:text-[#EDE8E4]">
          Review
        </h2>
        <div class="flex justify-center">
          <div class="w-full max-w-[500px]">
            <Swiper
              :slides-per-view="'auto'"
              :space-between="5"
              :centered-slides="true"
              :loop="true"
              :initial-slide="2"
              grab-cursor
              class="px-[30px]"
            >
              <SwiperSlide
                v-for="review in latestReviews"
                :key="review.id"
                class="!w-[257px] cursor-pointer"
                @click="goToCampingDetail(review.camps.content_id)"
              >
                <div class="bg-white p-4 text-center dark:bg-[#121212]">
                  <h3 class="font-bold text-[15px] text-[#222222] mb-[10px] dark:text-[--white]">
                    {{ review.camps.faclt_nm }}
                  </h3>
                  <p class="text-[15px] text-[#4A4A4A] mb-[10px] line-clamp-2">
                    {{ review.content }}
                  </p>
                  <p class="text-[13px] text-[--grey] mb-2 dark:text-[--white]">
                    {{ review.profiles.username }}
                  </p>
                  <div class="flex justify-center gap-[4px]">
                    <img
                      v-for="n in 5"
                      :key="n"
                      :src="n <= review.star_rating ? fillstar : emptystar"
                      alt="별점"
                      class="w-[18px] h-[18px]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <NavBar class="z-10" />
      </section>
    </main>
  </div>
</template>
<style scoped></style>
