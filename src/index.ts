import {createApp} from 'vue';
import App from './App.vue';
import './index.scss';

new Promise((resolve) => {
	const app = createApp(App);
	app.mount('#app');
	resolve(app);
}).then(async(app) => {
	if(innerWidth >= 768) {
		const win = new (await import('./utils/windows')).default('.window');
		win.initListeners();
	}
});