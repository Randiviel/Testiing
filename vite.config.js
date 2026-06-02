import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // WAŻNE: Jeśli Twoje repozytorium to np. github.com/user/moje-statystyki
  // ustaw poniżej: '/moje-statystyki/'
  base: '/Testiing/', 
})
