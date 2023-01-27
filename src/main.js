import '@/assets/css/main.css';
import 'vue-toastification/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import Toast from 'vue-toastification';
import moment from 'moment';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$moment = moment;

app.use(router).use(Toast).mount('#app');
