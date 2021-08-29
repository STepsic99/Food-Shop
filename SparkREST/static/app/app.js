const FoodShop = { template: '<food-shop></food-shop>' }
const Registration = { template: '<registration></registration>' }
const Login = { template: '<login></login>' }
const Profile = { template: '<profile></profile>'}
const PasswordChange = { template: '<passwordChange></passwordChange>'}
const RestaurantDetails = { template: '<restaurantDetails></restaurantDetails>' }
const CartContent = { template: '<cartContent></cartContent>' }
const MyOrder = { template: '<myOrder></myOrder>' }
const DelivererOrder = { template: '<delivererOrder></delivererOrder>' }
const UnassignedOrder = { template: '<unassignedOrder></unassignedOrder>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	   { path: '/', component: FoodShop},
	   { path: '/r', component: Registration },
	   { path: '/l', component: Login },
	   { path: '/p', component: Profile },
       { path: '/pass', component: PasswordChange },
       { path: '/details/:id', component: RestaurantDetails },
       { path: '/cart', component: CartContent },
       { path: '/myOrder', component: MyOrder },
	   { path: '/delivererOrder', component: DelivererOrder },
	   { path: '/unassignedOrder', component: UnassignedOrder }	
				  
	  ]
});

var app = new Vue({
	router,
	el: '#foodShop'
});
