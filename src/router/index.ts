import { createRouter, createWebHistory } from 'vue-router';

import Home from '/src/views/Home.vue';
import Withdraw from '/src/views/Withdraw.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/withdraw/:coin/:type',
		name: 'Withdraw',
		component: Withdraw,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
