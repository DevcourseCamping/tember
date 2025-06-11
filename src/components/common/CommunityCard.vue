<script setup>
import commentIcon from '../../assets/icons/light/light-comment.svg'
import filledLikeIcon from '../../assets/icons/light/light-like-filled.svg'
import outlineLikeIcon from '../../assets/icons/light/light-like-outline.svg'

const posts = [
  {
    userName: '나는 캠퍼',
    date: '53분 전',
    userImg:
      'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
    postImg:
      'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
    content:
      '조용하고 아늑해서 푹 쉬다 갑니다. 반려견과 함께 즐기기 딱 좋은 곳이에요. 캠핑장 관리가 잘 되어 있어 기분 좋았어요. 밤하늘의 별이 정말 아름다웠습니다. 시설이 깔끔하고 쾌적해서 만족했어요. 자연 속 힐링 제대로 하고 왔습니다. 아이들과 오기에도 좋은 캠핑장이에요. 첫 캠핑이었는데 너무 만족스러웠어요. 다시 오고 싶은 캠핑장이에요. 최고!',
    category: '반려동물',
    isLiked: true,
    isMine: true,
  },
  {
    userName: '나는 캠퍼',
    date: '1시간 전',
    userImg:
      'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D',
    content: '불멍하세요!',
    category: '일반',
    isLiked: false,
    isMine: true,
  },
]
</script>
<template>
  <div class="p-[30px] flex flex-col gap-[30px]">
    <div
      v-for="(post, index) in posts"
      :key="index"
      class="border border-[var(--primary-30)] rounded-[5px] cursor-pointer"
    >
      <div class="flex items-center justify-between pl-[15px] pt-[15px]">
        <div class="flex items-center">
          <img
            :src="post.userImg"
            alt="임시 사용자 이미지"
            class="w-[52px] h-[52px] rounded-full mr-[15px]"
          />
          <div class="flex flex-col justify-center">
            <p class="text-[15px] font-semibold">{{ post.userName }}</p>
            <p class="text-[13px] text-[var(--grey)]">{{ post.date }}</p>
          </div>
        </div>
      </div>
      <div>
        <img
          v-if="post.postImg"
          :src="post.postImg"
          alt="임시 게시글 이미지"
          class="w-[440px] h-[400px] pt-[15px]"
        />
      </div>
      <div class="pt-5 pl-5 pr-5 text-[15px]">
        <p class="break-words">
          {{ post.content }}
        </p>
      </div>
      <div class="flex items-center justify-between pl-[20px] pr-[20px] pt-[30px] pb-[10px]">
        <div
          class="w-20 h-[30px] bg-[var(--primary)] text-[var(--white)] text-[12px] rounded-[5px] flex items-center justify-center"
        >
          {{ post.category }}
        </div>
        <div class="flex gap-[3px] text-[15px]">
          <img :src="post.isLiked ? filledLikeIcon : outlineLikeIcon" alt="좋아요 아이콘" />
          <p>10</p>
          <img :src="commentIcon" alt="댓글 아이콘" class="pl-[10px]" />
          <p>10</p>
        </div>
      </div>
    </div>
  </div>
</template>
