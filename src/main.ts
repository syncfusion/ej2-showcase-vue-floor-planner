import { createApp, defineComponent } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
 
// ... existing code ...
 
createApp(App as ReturnType<typeof defineComponent>)
  .use(router)
  .use(store)
  .mount('#app');