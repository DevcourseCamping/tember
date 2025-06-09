<script setup>
const userInfo = {
  username: '나는 캠퍼',
  userImg:
    'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
  followers: 10,
  following: 8,
}
</script>
<template>
  <div class="flex items-center text-[#222222] pt-[35px] pl-[35px]">
    <img :src="userInfo.userImg" alt="사용자 임시 이미지" class="w-[90px] h-[90px] rounded-full" />

    <div class="pl-[45px]">
      <p class="text-[18px] font-bold">{{ userInfo.username }}</p>
      <div class="flex gap-[60px] text-4 pt-[10px]">
        <p>
          팔로워 <span class="font-semibold pl-[10px]">{{ userInfo.followers }}</span>
        </p>
        <p>
          팔로잉 <span class="font-semibold pl-[10px]">{{ userInfo.following }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
