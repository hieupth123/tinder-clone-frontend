import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
installElementPlus(app)
app.use(Notifications)
app.use(router).mount('#app')
