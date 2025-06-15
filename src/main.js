import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import 'swiper/css'
import 'swiper/css/pagination'

import App from './App.vue'
import router from './router'

import supabase from '@/utils/supabase.js'
import ThemeIcon from '@/components/common/ThemeIcon.vue'

const html = document.documentElement
const saved = localStorage.getItem('theme') || 'light'
html.classList.add(saved)

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    const currentPath = router.currentRoute.value.path
    if (currentPath === '/login') {
      console.log('✅ 로그인 성공!', session)
      router.push({ name: 'home' })
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('ThemeIcon', ThemeIcon)
app.mount('#app')

export function toggleDarkMode() {
  const isDark = html.classList.contains('dark')
  html.classList.toggle('dark', !isDark)
  html.classList.toggle('light', isDark)
  localStorage.setItem('theme', isDark ? 'light' : 'dark')
}