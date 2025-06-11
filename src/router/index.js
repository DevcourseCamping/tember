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
      path: '/community/post/create',
      name: 'communityPostCreate',
      component: () => import('../views/community/CommunityPostCreate.vue'),
    },
    {
      path: '/community/post/:postId',
      name: 'communityPostDetail',
      component: () => import('../views/community/CommunityPostDetail.vue'),
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/mypage/MyPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/mypage/LogIn.vue'),
    },
    {
    path: '/chatbot',
    name: 'Chatbot',
    component: ()=> import('../views/ChatBot.vue')
  }
  ],
})

export default router
