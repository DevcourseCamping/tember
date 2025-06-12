import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import supabase from '@/utils/supabase.js'

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

app.mount('#app')
