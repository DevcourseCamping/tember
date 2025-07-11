import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/camping/CampingList.vue'),
    },
    {
      path: '/community',
      name: 'communityList',
      component: () => import('../views/community/CommunityPostList.vue'),
    },
    {
      path: '/community/post-create',
      name: 'communityPostCreate',
      component: () => import('../views/community/CommunityPostCreate.vue'),
    },
    {
      path: '/community/:postId',
      name: 'communityPostDetail',
      component: () => import('../views/community/CommunityPostDetail.vue'),
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/mypage/MyPage.vue'),
    },
    {
      path: '/mypage/edit',
      name: 'edit',
      component: () => import('../views/mypage/EditProfilePage.vue'),
    },
    {
      path: '/user/:id',
      name: 'user-profile',
      component: () => import('../views/mypage/MyPage.vue'),
    },
    {
      path: '/mypage/follow',
      name: 'follow',
      component: () => import('../views/mypage/FollowPage.vue'),
    },
    {
      path: '/user/follow/:id',
      name: 'user-follow',
      component: () => import('../views/mypage/FollowPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/mypage/LogIn.vue'),
    },
    {
      path: '/camping/:id',
      name: 'campingDetail',
      component: () => import('../views/camping/CampingDetail.vue'),
    },
    {
      path: '/chatbot',
      name: 'Chatbot',
      component: () => import('../views/ChatBot.vue'),
    },
    {
      path: '/camping/:id/review/create',
      name: 'campReviewCreate',
      component: () => import('../views/review/ReviewPage.vue'),
    },
    {
      path: '/camping/:id/review/edit/:reviewId',
      name: 'campReviewEdit',
      component: () => import('../views/review/ReviewPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    }
  ],
})

export default router
