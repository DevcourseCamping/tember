<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  show: Boolean
})
const emit  = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <!-- 디머(백드롭) -->
    <div
      v-if="props.show"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="emit('close')"
    />

    <!-- 슬라이드 애니메이션 적용 -->
    <transition
    appear
  enter-from-class="translate-y-20"
  enter-active-class="transition-transform duration-[500ms] ease-out"
  enter-to-class="translate-y-0"
  leave-from-class="translate-y-0"
  leave-active-class="transition-transform duration-[500ms] ease-linear"
  leave-to-class="translate-y-40"
    >
  <div
    v-if="props.show"
    class="fixed bottom-0 left-1/2 -translate-x-1/2
           w-full max-w-[500px] z-50 transform-gpu"
  >
    <slot />
  </div>
</transition>

  </Teleport>
</template>
