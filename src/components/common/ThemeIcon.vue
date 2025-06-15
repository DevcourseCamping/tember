<script setup>
import { computed } from 'vue'
import { useDark } from '@vueuse/core'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const isDark = useDark()

const ICON_MAP = {
  autoCamping: 'auto-camping-button',
  glamping:    'glamping-button',
  caravan:     'caravan-button',
  pet:         'pet-button',
  search:      'search',
  filter:      'filter',
  chatbot:     'chatbot-button',
  'like-outline': 'like-outline',
  'comment': 'comment'
}

const lightIcons = import.meta.glob('@/assets/icons/light/*.svg', { eager: true })
const darkIcons  = import.meta.glob('@/assets/icons/dark/*.svg',  { eager: true })

const iconSrc = computed(() => {
  const baseName = ICON_MAP[props.name] || props.name

  const lightKey = `/src/assets/icons/light/light-${baseName}.svg`
  const darkKey = `/src/assets/icons/dark/dark-${baseName}.svg`

  const lightIconModule = lightIcons[lightKey]
  const darkIconModule = darkIcons[darkKey]

  if (isDark.value && darkIconModule) {
    return darkIconModule.default
  }
  
  if (lightIconModule) {
    return lightIconModule.default
  }

  return ''
})
</script>

<template>
  <img
    v-if="iconSrc"
    :src="iconSrc"
    :alt="props.name + ' icon'"
    v-bind="$attrs"
  />
</template>