<script setup>
import HeaderSimple from '@/components/common/HeaderSimple.vue'
import editProfileIcon from '../../assets/icons/light/light-edit-profile.svg'
import darkEditProfileIcon from '../../assets/icons/dark/dark-edit-profile.svg'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { useUserApi } from '@/composables/useUserApi'

const router = useRouter()
const profile = useUserStore()
const username = ref('')
const fileInput = ref(null)
const previewImg = ref(null)
const selectedImg = ref(null)
const isLoading = ref(true)
const isSaving = ref(false)

onMounted(async () => {
  isLoading.value = true

  await profile.fetchUser()
  isLoading.value = false
})

const clickImg = () => {
  fileInput.value?.click()
}

const handleImage = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  selectedImg.value = file
  previewImg.value = URL.createObjectURL(file)
}

const save = async () => {
  isSaving.value = true
  const formData = new FormData()
  formData.append('username', username.value)
  formData.append('userId', profile.user.id)
  if (selectedImg.value) {
    formData.append('image', selectedImg.value)
  }

  try {
    const { updateUser } = useUserApi()

    const savedUser = await updateUser(formData)
    profile.updateUser({
      ...(savedUser.username && { username: savedUser.username }),
      avatar_url: savedUser.image,
    })
  } catch (error) {
    console.error(error)
  }

  isSaving.value = false
  router.push({ name: 'mypage' })
}

const clickClose = () => {
  router.push({ name: 'mypage' })
}
</script>
<template>
  <div
    class="fixed w-full max-w-[500px] h-screen bg-[var(--white)] left-1/2 -translate-x-1/2 dark:bg-[#121212]"
  >
    <!-- header -->
    <HeaderSimple title="프로필 편집" type="close" @click="clickClose" />

    <div class="h-auto flex flex-col items-center justify-center pt-[100px]">
      <div v-if="isLoading">
        <div class="w-[150px] h-[150px] rounded-full bg-[var(--grey)] opacity-30"></div>
      </div>
      <div v-else>
        <div class="relative">
          <img
            :src="previewImg || profile.user?.image || profile.user?.avatar_url"
            alt="사용자 프로필"
            class="w-[150px] h-[150px] rounded-full"
          />

          <button class="absolute right-0 bottom-0 w-[45px] h-[45px]" @click="clickImg">
            <img :src="editProfileIcon" alt="사진 편집" class="block dark:hidden" />
            <img :src="darkEditProfileIcon" alt="사진 편집" class="hidden dark:block" />
          </button>

          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            class="hidden"
            @change="handleImage"
          />
        </div>
      </div>

      <p class="pt-[40px] font-bold text-[20px] dark:text-white">{{ profile.user?.username }}</p>

      <input
        v-model="username"
        type="text"
        placeholder="변경할 닉네임을 입력해주세요"
        class="w-full max-w-[400px] h-[60px] border border-[var(--primary)] rounded-[5px] mt-[100px] pl-[25px] focus:outline-none dark:bg-[#121212] dark:border-[#ffffff]/30 dark:text-white dark:placeholder-[#ffffff]/30"
      />

      <button
        @click="save"
        :disabled="isSaving"
        :class="[
          'w-full max-w-[400px] h-[60px] rounded-[5px] mt-[200px] text-[var(--white)]',
          isSaving
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-[#515151] dark:text-gray-400'
            : 'bg-[var(--primary)] dark:bg-[#3A3A3A]',
        ]"
      >
        {{ isSaving ? '저장 중...' : '저장하기' }}
      </button>
    </div>
  </div>
</template>
