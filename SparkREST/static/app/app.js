const FoodShop = { template: '<food-shop></food-shop>' }
const Registration = { template: '<registration></registration>' }
const Login = { template: '<login></login>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: FoodShop},
	   { path: '/r', component: Registration },
	   { path: '/l', component: Login }
	  ]
});

var app = new Vue({
	router,
	el: '#foodShop'
});
