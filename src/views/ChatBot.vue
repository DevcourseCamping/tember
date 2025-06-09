<script setup>
import close from '@/assets/icons/close-white.svg'
import chatbotWhite from '@/assets/icons/chatbot-white.svg'
import chatbotBrown from '@/assets/icons/chatbot-brown.svg'
import send from '@/assets/icons/light/light-send.svg'
import temberbot from '@/assets/icons/light/TemberBot.svg'
import temberbotbrown from '@/assets/icons/light/TemberBotbrown.svg'
</script>

<template>
  <div class="w-[500px] h-screen bg-[var(--white)] mx-auto flex flex-col">
    <header class="h-[80px] bg-[--primary] flex items-center px-6 rounded-b-2xl flex-shrink-0">
      <img :src="close" class="w-5 h-5 mr-6 cursor-pointer" />
      <div class="flex items-center gap-4">
        <img :src="chatbotWhite" class="w-10 h-10" />
        <img :src="temberbot" class="" />
      </div>
      <div class="flex-1"></div>
    </header>

    <main class="flex-1 overflow-y-auto px-8 py-14 flex flex-col gap-y-7">
      <div class="flex items-start space-x-2">
        <img :src="chatbotBrown" class="w-10 h-10" />
        <div class="flex flex-col">
            <img :src="temberbotbrown" class="w-16 h-auto mb-1" />
            <div
          class="inline-block
         w-max
         bg-gray-100 text-gray-800 rounded-xl 
         px-6 py-4 text-sm"
        >
          무엇을 도와드릴까요?
        </div>
        </div>
      </div>

      <div class="flex items-start justify-end space-x-2">
        <div
          class="rounded-tr-none rounded-tl-lg rounded-br-lg rounded-bl-lg
          bg-[var(--primary)] text-white rounded-xl px-6 py-4 max-w-[70%] text-sm"
        >
          흙이 너무 질퍽한데 어떻게 해야돼?
        </div>
      </div>

      <div class="flex items-start space-x-2">
        <img :src="chatbotBrown" class="w-10 h-10" />
        <div class="flex flex-col">
            <img :src="temberbotbrown" class="w-16 h-auto mb-1" />
            <div
          class="inline-block
         w-max
         bg-gray-100 text-gray-800 rounded-xl 
         px-6 py-4 text-sm"
        >
          자리를 옮기시면 어떨까요?
        </div>
        </div>
      </div>

      <div class="flex items-start justify-end space-x-2">
        <div
          class="rounded-tr-none rounded-tl-lg rounded-br-lg rounded-bl-lg
          bg-[var(--primary)] text-white rounded-xl px-6 py-4 max-w-[70%] text-sm"
        >
          그건 불가능해.
        </div>
      </div>
    </main>

    <footer
      class="flex items-center px-4 py-3 border-t border-[var(--primary)] flex-shrink-0"
    >
      <input
        v-model="message"
        type="text"
        placeholder="메시지 입력"
        class="flex-1 h-10 px-6 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
      />
      <button class="ml-3 p-2 rounded-full hover:bg-gray-100 transition">
        <img :src="send" class="w-6 h-6" />
      </button>
    </footer>
  </div>
</template>

<style scoped>
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.1);
  border-radius: 3px;
}
</style>
