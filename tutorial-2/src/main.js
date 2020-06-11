 import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Svelte Tutorial 2'
	}
});

export default app;