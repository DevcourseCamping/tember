<script setup>
import FilterTag from './FilterTag.vue'
</script>
<template>
  <div class="w-[500px] h-[1700px] bg-[#f8f8f8] mx-auto flex flex-col">
    <div class="relative w-full mb-4 flex justify-center">
      <h1 class="text-center text-[18px] pt-[20px] text-[#222222]">검색</h1>

      <button
        class="absolute top-[24px] left-[30px] w-[20px] h-[20px] flex items-center justify-center"
      >
        <img
          src="@/assets/icons/light/light-search-filter-close.svg"
          alt="닫기"
          class="w-[20px] h-[20px]"
        />
      </button>
    </div>

    <div class="w-[440px] mx-auto bg-white rounded-md p-4 flex flex-col gap-6 overflow-y-hidden">
      <div class="relative bg-white rounded-md p-[20px] border border-[#E0E0E0] flex-shrink-0">
        <section class="flex flex-col gap-[15px]">
          <h2 class="text-[15px] text-[#222222]">지역</h2>

          <div class="flex rounded-md overflow-hidden h-[230px]">
            <div class="w-[90px] overflow-y-auto flex flex-col gap-[10px] pt-[17px]">
              <div
                class="h-[30px] text-[14px] text-center cursor-pointer bg-[#--primary] text-white rounded-[5px]"
              >
                강원도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                경기도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                경상남도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                경상북도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                광주광역시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                대구광역시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                대전광역시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                부산광역시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                서울특별시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                세종특별시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                울산광역시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                인천광역시
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                전라남도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                전라북도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                제주도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                충청남도
              </div>
              <div class="h-[30px] text-[14px] text-center text-[#222222] cursor-pointer">
                충청북도
              </div>
            </div>

            <div class="flex-1 min-w-0 flex flex-col gap-[15px] p-[15px]">
              <button
                class="w-[245px] h-[30px] text-[14px] border border-[#--primary] rounded-[5px] text-[#--primary] mx-auto mr-[20px]"
              >
                전체 선택
              </button>
              <div class="flex-1 overflow-y-auto pr-[5px]">
                <div class="grid grid-cols-3 gap-[15px]">
                  <FilterTag label="강릉시" />
                  <FilterTag label="고성군" />
                  <FilterTag label="동해시" />
                  <FilterTag label="삼척시" />
                  <FilterTag label="속초시" />
                  <FilterTag label="양구군" />
                  <FilterTag label="양양군" />
                  <FilterTag label="영월군" />
                  <FilterTag label="원주시" />
                  <FilterTag label="인제군" />
                  <FilterTag label="정선군" />
                  <FilterTag label="철원군" />
                  <FilterTag label="춘천시" />
                  <FilterTag label="태백시" />
                  <FilterTag label="평창군" />
                  <FilterTag label="홍천군" />
                  <FilterTag label="화천군" />
                  <FilterTag label="횡성군" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="flex justify-center mt-[20px]">
          <button class="w-[380px] h-[45px] rounded-[5px] bg-[#--primary] text-[13px] text-white">
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
          <img
            src="@/assets/icons/light/light-search-filter-close.svg"
            alt="닫기"
            class="w-[16px] h-[16px]"
          />
        </button>

        <div class="flex items-center gap-2 mb-[30px]">
          <span class="text-[15px] text-[#222222]">필터</span>
          <button class="text-[13px] text-[#--grey]">초기화</button>
        </div>

        <section class="overflow-y-auto h-full pr-[4px] pb-[80px] flex flex-col gap-[25px]">
          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">숙소 유형</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="일반 야영장" />
              <FilterTag label="자동차야영장" />
              <FilterTag label="글램핑" />
              <FilterTag label="카라반" />
              <FilterTag label="펜션" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">운영 기간</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="봄" />
              <FilterTag label="여름" />
              <FilterTag label="가을" />
              <FilterTag label="겨울" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">운영일</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="평일" />
              <FilterTag label="평일+주말" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">입지 구분</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="산" />
              <FilterTag label="강" />
              <FilterTag label="계곡" />
              <FilterTag label="호수" />
              <FilterTag label="숲" />
              <FilterTag label="섬" />
              <FilterTag label="도심" />
              <FilterTag label="해변" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">부대시설</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="전기" />
              <FilterTag label="무선인터넷" />
              <FilterTag label="장작판매" />
              <FilterTag label="트램폴린" />
              <FilterTag label="온수" />
              <FilterTag label="물놀이장" />
              <FilterTag label="놀이터" />
              <FilterTag label="산책로" />
              <FilterTag label="운동장" />
              <FilterTag label="운동시설" />
              <FilterTag label="마트, 편의점" />
              <FilterTag label="덤프스테이션" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">주변시설</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="계곡 물놀이" />
              <FilterTag label="강/물놀이" />
              <FilterTag label="낚시" />
              <FilterTag label="농어촌체험시설" />
              <FilterTag label="청소년체험시설" />
              <FilterTag label="산책로" />
              <FilterTag label="운동장" />
              <FilterTag label="해수욕" />
              <FilterTag label="수상레저" />
              <FilterTag label="수영장" />
              <FilterTag label="어린이 놀이시설" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">테마환경</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="낚시" />
              <FilterTag label="여름 물놀이" />
              <FilterTag label="봄꽃여행" />
              <FilterTag label="가을단풍명소" />
              <FilterTag label="일출명소" />
              <FilterTag label="일몰명소" />
              <FilterTag label="겨울눈꽃명소" />
              <FilterTag label="엑티비티" />
              <FilterTag label="항공레저" />
              <FilterTag label="걷기길" />
              <FilterTag label="수상레저" />
              <FilterTag label="스키" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">트레일러 가능</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="개인 트레일러 가능" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">카라반 가능</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="개인 카라반 가능" />
            </div>
          </div>

          <div>
            <h3 class="text-[15px] text-[#--grey] font-bold mb-[10px]">반려동물</h3>
            <div class="flex flex-wrap gap-[10px]">
              <FilterTag label="반려동물 가능" />
              <FilterTag label="소형견 가능" />
            </div>
          </div>
        </section>

        <div class="mt-[16px] flex justify-center">
          <button class="w-full h-[45px] rounded-[5px] text-[13px] text-white bg-[#3A2B1F]">
            필터 적용하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
