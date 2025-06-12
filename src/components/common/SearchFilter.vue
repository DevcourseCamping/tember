<script setup>
import axios from 'axios'
import FilterTag from './FilterTag.vue'
import close from '@/assets/icons/close-brown.svg'
import { computed, ref } from 'vue'

const doList = [
  '서울특별시',
  '대전광역시',
  '대구광역시',
  '부산광역시',
  '광주광역시',
  '울산광역시',
  '인천광역시',
  '세종특별시',
  '경기도',
  '강원도',
  '경상남도',
  '경상북도',
  '전라남도',
  '전라북도',
  '충청남도',
  '충청북도',
  '제주도',
]

const sigunguMap = {
  강원도: [
    '강릉시',
    '고성군',
    '동해시',
    '삼척시',
    '속초시',
    '양구군',
    '양양군',
    '영월군',
    '원주시',
    '인제군',
    '정선군',
    '철원군',
    '춘천시',
    '태백시',
    '평창군',
    '홍천군',
    '화천군',
    '횡성군',
  ],
  경기도: [
    '가평군',
    '고양시',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시',
    '수원시',
    '시흥시',
    '안산시',
    '안성시',
    '안양시',
    '양주시',
    '양평군',
    '여주시',
    '연천군',
    '오산시',
    '용인시',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시',
  ],
  경상남도: [
    '거제시',
    '거창군',
    '고성군',
    '김해시',
    '남해군',
    '밀양시',
    '사천시',
    '산청군',
    '양산시',
    '의령군',
    '진주시',
    '창녕군',
    '창원시',
    '통영시',
    '하동군',
    '함안군',
    '함양군',
    '합천군',
  ],
  경상북도: [
    '경산시',
    '경주시',
    '고령군',
    '구미시',
    '군위군',
    '김천시',
    '문경시',
    '봉화군',
    '상주시',
    '성주군',
    '안동시',
    '영덕군',
    '영양군',
    '영주시',
    '영천시',
    '예천군',
    '울릉군',
    '울진군',
    '의성군',
    '청도군',
    '청송군',
    '칠곡군',
    '포항시',
  ],
  광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  대구광역시: ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
  대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
  부산광역시: [
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
  ],
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  세종특별자치시: ['세종특별자치시'],
  울산광역시: ['남구', '동구', '북구', '울주군', '중구'],
  인천광역시: [
    '강화군',
    '계양구',
    '남동구',
    '동구',
    '미추홀구',
    '부평구',
    '서구',
    '연수구',
    '옹진군',
    '중구',
  ],
  전라남도: [
    '강진군',
    '고흥군',
    '곡성군',
    '광양시',
    '구례군',
    '나주시',
    '담양군',
    '목포시',
    '무안군',
    '보성군',
    '순천시',
    '신안군',
    '여수시',
    '영광군',
    '영암군',
    '완도군',
    '장성군',
    '장흥군',
    '진도군',
    '함평군',
    '해남군',
    '화순군',
  ],
  전라북도: [
    '고창군',
    '군산시',
    '김제시',
    '남원시',
    '무주군',
    '부안군',
    '순창군',
    '완주군',
    '익산시',
    '임실군',
    '장수군',
    '전주시',
    '정읍시',
    '진안군',
  ],
  제주특별자치도: ['서귀포시', '제주시'],
  충청남도: [
    '계룡시',
    '공주시',
    '금산군',
    '논산시',
    '당진시',
    '보령시',
    '부여군',
    '서산시',
    '서천군',
    '아산시',
    '예산군',
    '천안시',
    '청양군',
    '태안군',
    '홍성군',
  ],
  충청북도: [
    '괴산군',
    '단양군',
    '보은군',
    '영동군',
    '옥천군',
    '음성군',
    '제천시',
    '증평군',
    '진천군',
    '청주시',
    '충주시',
  ],
}

const selectedDo = ref('강원도')
const sigunguList = computed(() => sigunguMap[selectedDo.value] || [])

const selectedSigunguList = ref([])

const toggleSigungu = (sigungu) => {
  const idx = selectedSigunguList.value.indexOf(sigungu)
  if (idx > -1) {
    selectedSigunguList.value.splice(idx, 1)
  } else {
    selectedSigunguList.value.push(sigungu)
  }
}

const selectAllSigungu = () => {
  const allSelected = sigunguList.value.every((sigungu) =>
    selectedSigunguList.value.includes(sigungu),
  )

  if (allSelected) {
    selectedSigunguList.value = selectedSigunguList.value.filter(
      (sigungu) => !sigunguList.value.includes(sigungu),
    )
  } else {
    const newList = new Set([...selectedSigunguList.value, ...sigunguList.value])
    selectedSigunguList.value = [...newList]
  }
  console.log('선택 리스트:', selectedSigunguList.value)
}

const selectedInduty = ref([])
const selectedOperPdCl = ref([])
const selectedOperDeCl = ref([])
const selectedLctCl = ref([])
const selectedTrler = ref([])
const selectedCaravan = ref([])
const selectedAnimal = ref([])
const selectedSbrsCl = ref([])
const selectedPosblFcltyCl = ref([])
const selectedThema = ref([])

const doNm = ref('')
const keyword = ref('')
const campList = ref([])

const applyFilter = async () => {
  doNm.value = selectedDo.value

  const filters = {}

  if (selectedInduty.value.length) filters.induty = selectedInduty.value
  if (selectedOperPdCl.value.length) filters.operPdCl = selectedOperPdCl.value
  if (selectedOperDeCl.value.length) filters.operDeCl = selectedOperDeCl.value
  if (selectedLctCl.value.length) filters.lctCl = selectedLctCl.value
  if (selectedTrler.value.length) filters.trlerAcmpnyAt = selectedTrler.value
  if (selectedCaravan.value.length) filters.caravAcmpnyAt = selectedCaravan.value
  if (selectedAnimal.value.length) filters.animalCmgCl = selectedAnimal.value
  if (selectedSbrsCl.value.length) filters.sbrsCl = selectedSbrsCl.value
  if (selectedPosblFcltyCl.value.length) filters.posblFcltyCl = selectedPosblFcltyCl.value
  if (selectedThema.value.length) filters.themaEnvrnCl = selectedThema.value

  const requestBody = {
    filters,
    doNm: selectedDo.value,
    sigunguNm: selectedSigunguList.value,
    keyword: keyword.value,
    page: 1,
    pageSize: 10,
  }

  try {
    const response = await axios.post(
      'https://bszdfvksgtumpbnekvnd.supabase.co/functions/v1/camping',
      requestBody,
    )

    const camps = response.data.data
    campList.value = camps

    camps.forEach((camp, index) => {
      console.log(`캠핑장 ${index + 1}`)
      console.log('ex', camp)
    })
    console.log('필터링 결과:', campList.value)
  } catch (error) {
    console.error('조회 실패:', error)
  }
}
</script>
<template>
  <div class="max-w-[500px] h-[1700px] bg-[#f8f8f8] mx-auto flex flex-col">
    <div class="relative w-full mb-4 flex justify-center">
      <h1 class="text-center text-[18px] pt-[20px] text-[#222222]">검색</h1>

      <button
        @click="$emit('close')"
        class="absolute top-[24px] left-[30px] w-[20px] h-[20px] flex items-center justify-center"
      >
        <img :src="close" alt="닫기" class="w-[20px] h-[20px]" />
      </button>
    </div>

    <div class="w-[440px] mx-auto bg-white rounded-md p-4 flex flex-col gap-6 overflow-y-hidden">
      <div class="relative bg-white rounded-md p-[20px] border border-[#E0E0E0] flex-shrink-0">
        <section class="flex flex-col gap-[15px]">
          <h2 class="text-[15px] text-[#222222]">지역</h2>

          <div class="flex rounded-md overflow-hidden h-[230px]">
            <div class="w-[90px] overflow-y-auto flex flex-col gap-[10px] pt-[17px]">
              <div
                v-for="doItem in doList"
                :key="doItem"
                class="h-[30px] text-[14px] text-center cursor-pointer rounded-[5px]"
                :class="selectedDo === doItem ? 'bg-[#4B3C2F] text-white' : 'text-[#222222]'"
                @click="selectedDo = doItem"
              >
                {{ doItem }}
              </div>
            </div>

            <div class="flex-1 min-w-0 flex flex-col gap-[15px] p-[15px]">
              <button
                @click="selectAllSigungu"
                :class="
                  sigunguList.every((s) => selectedSigunguList.includes(s))
                    ? 'bg-[#4B3C2F] text-white'
                    : 'bg-white text-[#333]'
                "
                class="w-full border p-2 rounded text-sm"
              >
                전체 선택
              </button>

              <div class="flex-1 overflow-y-auto pr-[5px]">
                <div class="grid grid-cols-3 gap-[15px]">
                  <FilterTag
                    v-for="sigungu in sigunguList"
                    :key="sigungu"
                    :label="sigungu"
                    :modelValue="selectedSigunguList.includes(sigungu)"
                    @update:modelValue="() => toggleSigungu(sigungu)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="flex justify-center mt-[20px]">
          <button
            class="w-[380px] h-[45px] rounded-[5px] bg-[#4B3C2F] text-[13px] text-white"
            @click="applyFilter"
          >
            선택하기
          </button>
        </section>
      </div>

      <div
        class="relative bg-white rounded-md p-[20px] border border-[#E0E0E0] max-h-[1206px] flex flex-col"
      >
        <button
          class="absolute top-[20px] right-[30px] w-[16px] h-[16px] flex items-center justify-center"
        >
          <img :src="close" alt="닫기" class="w-[16px] h-[16px]" />
        </button>

        <div class="flex items-center gap-2 mb-[30px]">
          <span class="text-[15px] text-[#222222]">필터</span>
          <button class="text-[13px] text-[#A8AEB2]">초기화</button>
        </div>

        <section class="overflow-y-auto h-full pr-[4px] pb-[80px] flex flex-col gap-[25px]">
          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">숙소 유형</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in ['일반야영장', '자동차야영장', '글램핑', '카라반', '캠프닉']"
                :key="label"
                :label="label"
                :modelValue="selectedInduty.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedInduty.indexOf(label)
                    i > -1 ? selectedInduty.splice(i, 1) : selectedInduty.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">운영 기간</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in ['봄', '여름', '가을', '겨울']"
                :key="label"
                :label="label"
                :modelValue="selectedOperPdCl.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedOperPdCl.indexOf(label)
                    i > -1 ? selectedOperPdCl.splice(i, 1) : selectedOperPdCl.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">운영일</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in ['평일', '평일+주말']"
                :key="label"
                :label="label"
                :modelValue="selectedOperDeCl.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedOperDeCl.indexOf(label)
                    i > -1 ? selectedOperDeCl.splice(i, 1) : selectedOperDeCl.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">입지 구분</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in ['산', '강', '계곡', '호수', '숲', '섬', '도심', '해변']"
                :key="label"
                :label="label"
                :modelValue="selectedLctCl.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedLctCl.indexOf(label)
                    i > -1 ? selectedLctCl.splice(i, 1) : selectedLctCl.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">부대시설</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in [
                  '전기',
                  '무선인터넷',
                  '장작판매',
                  '트렘폴린',
                  '온수',
                  '물놀이장',
                  '놀이터',
                  '산책로',
                  '운동장',
                  '운동시설',
                  '마트, 편의점',
                  '덤프스테이션',
                ]"
                :key="label"
                :label="label"
                :modelValue="selectedSbrsCl.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedSbrsCl.indexOf(label)
                    i > -1 ? selectedSbrsCl.splice(i, 1) : selectedSbrsCl.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">주변시설</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in [
                  '계곡 물놀이',
                  '강/물놀이',
                  '낚시',
                  '농어촌체험시설',
                  '청소년체험시설',
                  '산책로',
                  '운동장',
                  '해수욕',
                  '수상레저',
                  '수영장',
                  '어린이놀이시설',
                ]"
                :key="label"
                :label="label"
                :modelValue="selectedPosblFcltyCl.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedPosblFcltyCl.indexOf(label)
                    i > -1 ? selectedPosblFcltyCl.splice(i, 1) : selectedPosblFcltyCl.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">테마환경</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in [
                  '낚시',
                  '여름물놀이',
                  '봄꽃여행',
                  '가을단풍명소',
                  '일출명소',
                  '일몰명소',
                  '겨울눈꽃명소',
                  '액티비티',
                  '항공레저',
                  '걷기길',
                  '수상레저',
                  '스키',
                ]"
                :key="label"
                :label="label"
                :modelValue="selectedThema.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedThema.indexOf(label)
                    i > -1 ? selectedThema.splice(i, 1) : selectedThema.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">트레일러 가능</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in ['개인 트레일러 가능']"
                :key="label"
                :label="label"
                :modelValue="selectedTrler.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedTrler.indexOf(label)
                    i > -1 ? selectedTrler.splice(i, 1) : selectedTrler.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">카라반 가능</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in ['개인 카라반 가능']"
                :key="label"
                :label="label"
                :modelValue="selectedCaravan.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedCaravan.indexOf(label)
                    i > -1 ? selectedCaravan.splice(i, 1) : selectedCaravan.push(label)
                  }
                "
              />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#A8AEB2] font-bold mb-[10px]">반려동물</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag
                v-for="label in ['반려동물 가능', '소형견 가능']"
                :key="label"
                :label="label"
                :modelValue="selectedAnimal.includes(label)"
                @update:modelValue="
                  () => {
                    const i = selectedAnimal.indexOf(label)
                    i > -1 ? selectedAnimal.splice(i, 1) : selectedAnimal.push(label)
                  }
                "
              />
            </div>
          </div>
        </section>

        <div class="mt-[16px] flex justify-center">
          <button
            class="w-full h-[45px] rounded-[5px] text-[13px] text-white bg-[#3A2B1F]"
            @click="applyFilter"
          >
            필터 적용하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
