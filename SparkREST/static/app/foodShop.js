Vue.component("food-shop", {
	data: function () {
		    return {
		      restaurants: null,
			  loggedin: false,
			  notloggedin: false,
			  user: null	
		    }
	},
	template: ` 
<div>
	<table style="margin-left: auto;
  margin-right: auto;">
	<tr v-for="r in restaurants">
	<td> {{r.name}}</td>
	<td> <img  v-bind:src="r.imagePath" alt="Restaurant" width="100" height="100"/></td>
	</tr>
	</table>
</div>		  
`
	, 
	methods : {
	//	addToCart : function (product) {
	//		axios
	//		.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
		//	.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		//}
		openRegistration : function() {
    		router.push(`/r`);
    	},
		openLogin : function() {
    		router.push(`/l`);
    	},
		logOut : function(){
			axios.get('/rest/user/logout')
			this.loggedin= false
			this.notloggedin= true	
		},
		isLogged : function(user){
			this.user=user
			if(this.user===null){
			this.loggedin= false
			 this.notloggedin= true	
		}else{
			this.loggedin= true
			 this.notloggedin= false	
		}
		}
	},
	mounted () {
        axios
          .get('/rest/restaurants/getJustRestaurants')
          .then(response => (this.restaurants = response.data))
		
		 axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
		
    },
});