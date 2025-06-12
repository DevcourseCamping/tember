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
    class="h-[30px] text-[12px] text-center rounded-[5px] px-[10px] border"
    :class="
      modelValue
        ? 'bg-[#4B3C2F] text-[#FFFFFF] border-[#4B3C2F]'
        : 'bg-[#FFFFFF] text-[#222222] border-[#E0E0E0]'
    "
  >
    {{ label }}
  </button>
</template>
<style scoped></style>
