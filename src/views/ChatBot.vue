<script setup>
import { ref, nextTick } from 'vue'
import close from '@/assets/icons/close-white.svg'
import chatbotWhite from '@/assets/icons/chatbot-white.svg'
import chatbotBrown from '@/assets/icons/chatbot-brown.svg'
import send from '@/assets/icons/light/light-send.svg'
import chatbotBlack from '@/assets/icons/chatbot-black.svg'
import d_send from '@/assets/icons/dark/dark-send.svg'
import { useRouter } from 'vue-router'
;('../assets/icons')

const router = useRouter()

const handleClose = () => {
  router.back()
}

console.log('읽어온 API 키:', import.meta.env.VITE_OPENAI_API_KEY)

const messages = ref([
  {
    id: 1,
    sender: 'bot',
    text: '안녕하세요! TemberBot입니다. \n무엇이 궁금하신가요?',
  },
])
const newMessage = ref('')
const isLoading = ref(false)
const chatContainer = ref(null)

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const sendMessage = async () => {
  const userMessageText = newMessage.value.trim()
  if (userMessageText === '' || isLoading.value) return

  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: userMessageText,
  })

  newMessage.value = ''

  isLoading.value = true
  await nextTick()
  scrollToBottom()

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessageText }],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`API 요청 실패: ${errorData.error.message}`)
    }

    const data = await response.json()
    const botResponseText = data.choices[0].message.content.trim()

    messages.value.push({
      id: data.id,
      sender: 'bot',
      text: botResponseText,
    })
  } catch (error) {
    console.error('OpenAI API 연동 오류:', error)
    messages.value.push({
      id: Date.now() + 1,
      sender: 'bot',
      text: `[에러 발생] ${error.message}`,
    })
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}
</script>

<template>
  <div
    class="mx-auto w-full max-w-[500px] h-screen bg-[var(--white)] dark:bg-[#121212] flex flex-col"
  >
    <header
      class="h-[90px] bg-[--primary] dark:bg-[#1a1a1a] flex items-center px-6 rounded-b-lg flex-shrink-0"
    >
      <img :src="close" class="w-[18px] h-[18px] mr-[30px] cursor-pointer" @click="handleClose" />
      <div class="flex items-center justify-center gap-4">
        <img :src="chatbotWhite" class="w-10 h-10 block dark:hidden" />
        <img :src="chatbotBlack" class="w-10 h-10 hidden dark:block" />
        <p
          class="font-['PostNoBillsJaffna'] font-extrabold text-white flex items-center h-10 text-xl"
        >
          TemberBot
        </p>
      </div>
    </header>

    <main
      ref="chatContainer"
      class="flex-1 overflow-y-auto px-[30px] py-14 flex flex-col gap-y-7 scrollbar-hide"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex items-start space-x-2"
        :class="{ 'justify-end': message.sender === 'user' }"
      >
        <template v-if="message.sender === 'bot'">
          <img :src="chatbotBrown" class="w-10 h-10 block dark:hidden" />
          <img :src="chatbotBlack" class="w-10 h-10 hidden dark:block" />
          <div class="flex flex-col -mt-2">
            <p
              class="font-['PostNoBillsJaffna'] font-extrabold text-[--primary] dark:text-white flex items-center h-10 text-lg"
            >
              TemberBot
            </p>
            <div
              class="inline-block rounded-tr-lg rounded-br-lg rounded-bl-lg rounded-tl-none bg-[#F2F2F2] dark:bg-[#444444] dark:text-white rounded-xl px-6 py-4 text-sm max-w-xs break-words whitespace-pre-line"
            >
              {{ message.text }}
            </div>
          </div>
        </template>

        <template v-if="message.sender === 'user'">
          <div
            class="rounded-tr-none rounded-tl-lg rounded-br-lg rounded-bl-lg bg-[var(--primary)] dark:bg-[#B8D0D485] text-white rounded-xl px-6 py-4 max-w-[70%] text-sm"
          >
            {{ message.text }}
          </div>
        </template>
      </div>

      <div v-if="isLoading" class="flex items-start space-x-2">
        <img :src="chatbotBrown" class="w-10 h-10 block dark:hidden" />
        <img :src="chatbotBlack" class="w-10 h-10 hidden dark:block" />
        <div class="flex flex-col -mt-2">
          <p
            class="font-['PostNoBillsJaffna'] font-extrabold text-[--primary] dark:text-white flex items-center h-10 text-lg"
          >
            TemberBot
          </p>
          <div
            class="inline-block w-max rounded-tr-lg rounded-br-lg rounded-bl-lg rounded-tl-none bg-[#F2F2F2] dark:bg-[#444444] dark:text-white rounded-xl px-6 py-4 text-sm"
          >
            답변을 생각 중이에요...
          </div>
        </div>
      </div>
    </main>

    <footer
      class="flex items-center px-4 py-3 border-t border-[var(--primary)] dark:border-[#1a1a1a] dark:bg-[#1a1a1a] flex-shrink-0 h-[80px]"
    >
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="메시지 입력"
        class="flex-1 h-[45px] w-[400px] px-6 text-sm rounded-[5px] border border-[var(--primary-30)] dark:border-[#3a3a3a] dark:text-white dark:bg-[#3a3a3a] dark:border-[#ffffff30] placeholder:text-[var(--grey)] dark:placeholder:text-[#ffffff50] focus:outline-none"
      />
      <button
        @click="sendMessage"
        class="ml-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition"
      >
        <img :src="send" class="w-6 h-6 block dark:hidden" />
        <img :src="d_send" class="w-6 h-6 hidden dark:block" />
      </button>
    </footer>
  </div>
</template>

<style scoped></style>
