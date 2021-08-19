const FoodShop = { template: '<food-shop></food-shop>' }
const Registration = { template: '<registration></registration>' }
const Login = { template: '<login></login>' }
const Profile = { template: '<profile></profile>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: FoodShop},
	   { path: '/r', component: Registration },
	   { path: '/l', component: Login },
	   { path: '/p', component: Profile }
	  ]
});

var app = new Vue({
	router,
	el: '#foodShop'
});
