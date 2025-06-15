import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  actions: {
    toggleDark() {
      this.isDark = !this.isDark
      localStorage.setItem('isDark', JSON.stringify(this.isDark))
    },
    loadDarkFromStorage() {
      const saved = localStorage.getItem('isDark')
      if (saved !== null) this.isDark = JSON.parse(saved)
    }
  }
})