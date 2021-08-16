Vue.component("food-shop", {
	data: function () {
		    return {
		      restaurants: null
		    }
	},
	template: ` 
<div>
	<button v-on:click="openRegistration">Registruj se</button>
	<button v-on:click="openLogin">Prijavi se</button><br>
	<table>
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
    	}
	},
	mounted () {
        axios
          .get('rest/restaurants/getJustRestaurants')
          .then(response => (this.restaurants = response.data))
    },
});