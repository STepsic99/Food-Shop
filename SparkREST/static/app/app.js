const FoodShop = { template: '<food-shop></food-shop>' }
const ShoppingCart = { template: '<shopping-cart></shopping-cart>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: FoodShop},
	    { path: '/sc', component: ShoppingCart }
	  ]
});

var app = new Vue({
	router,
	el: '#foodShop'
});
/**
 * 
 */