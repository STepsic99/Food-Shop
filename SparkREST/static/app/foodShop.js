Vue.component("food-shop", {
	data: function () {
		    return {
		      restaurants: null
		    }
	},
	template: ` 
<div>
	Neki tekst
	<button v-on:click="openRegistration">Registruj se</button>
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
    	}
	},
	mounted () {
        axios
          .get('rest/restaurants/getJustRestaurants')
          .then(response => (this.products = response.data))
    },
});