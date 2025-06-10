<script setup>
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import editProfileIcon from '../../assets/icons/light/light-edit-profile.svg'

const userInfo = {
  userName: '나는 캠퍼',
  userImg:
    'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
}
</script>
<template>
  <div class="fixed w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2">
    <!-- header -->
    <HeaderSimple title="프로필 편집" />

    <div class="h-[calc(100vh-250px)] flex flex-col items-center justify-center pt-[100px]">
      <div class="relative">
        <img
          :src="userInfo.userImg"
          alt="사용자 임시 이미지"
          class="w-[150px] h-[150px] rounded-full"
        />
        <button class="absolute right-0 bottom-0 w-[45px] h-[45px]">
          <img :src="editProfileIcon" alt="사진 편집" />
        </button>
      </div>
      <p class="pt-[40px] font-bold text-[20px]">{{ userInfo.userName }}</p>

      <input
        type="text"
        placeholder="변경할 닉네임을 입력해주세요"
        class="w-[440px] h-[60px] border border-[var(--primary)] rounded-[5px] mt-[100px] pl-[25px] focus:outline-none"
      />

      <button
        class="w-[440px] h-[60px] bg-[var(--primary)] rounded-[5px] text-[var(--white)] mt-[200px]"
      >
        저장하기
      </button>
    </div>
  </div>
</template>
