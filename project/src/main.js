import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import '/node_modules/primeflex/primeflex.css'
import Aura from '@primeuix/themes/aura';

createApp(App).use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).mount('#app')
