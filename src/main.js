import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'


import App from './App.vue'
import router from './router'

import  supabase  from '@/utils/supabase.js'

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('✅ 로그인 성공!', session)
    router.push({ name: 'home' })
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
