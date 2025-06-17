<script setup>
const props = defineProps({
  label: String,
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
<template>
  <button
    @click="toggle"
    class="h-[30px] text-[12px] text-center rounded-[5px] px-[8px] border"
    :class="
      modelValue
        ? 'bg-[--primary] text-[--white] border-[--primary] dark:bg-[#3A3A3A] dark:border-[#3A3A3A]'
        : 'bg-[--white] text-[--black] border-[#E0E0E0] dark:bg-[#212121] dark:text-[--white] dark:border-[#3A3A3A]'
    "
  >
    {{ label }}
  </button>
</template>
<style scoped></style>
