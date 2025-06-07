<script setup></script>
<template>
  <!-- 프로필 전체 -->
  <div class="flex items-center text-[#222222] mt-[30px] pl-[35px] border border-red-500">
    <!-- 이미지 -->
    <img
      src="https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D"
      alt="사용자 임시 이미지"
      class="w-[80px] h-[80px] rounded-full object-cover shrink-0"
    />

    <!-- 사용자 이름, 팔로워&팔로잉 -->
    <div class="ml-[45px]">
      <p class="text-[18px] font-bold">나는 캠퍼나는 캠퍼나는 캠퍼</p>
      <!-- 팔로워, 팔로잉 -->
      <div class="flex text-[15px] gap-[60px] mt-[10px]">
        <p>팔로워 <span class="font-semibold">10</span></p>
        <p>팔로잉 <span class="font-semibold">10</span></p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
