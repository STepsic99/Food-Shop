const FoodShop = { template: '<food-shop></food-shop>' }
const Registration = { template: '<registration></registration>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: FoodShop},
	   { path: '/r', component: Registration }
	  ]
});

var app = new Vue({
	router,
	el: '#foodShop'
});
