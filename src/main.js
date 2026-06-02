import { createApp } from 'vue'
import App from './App.vue'

// Jeśli będziesz używać globalnego pliku CSS (np. z Tailwindem), importujesz go tutaj:
// import './assets/main.css' 

// Tworzymy aplikację Vue i montujemy ją w elemencie <div id="app"> w pliku index.html
createApp(App).mount('#app')
