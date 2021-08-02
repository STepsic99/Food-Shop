Vue.component("food-shop", {
	data: function () {
		    return {
		      restaurants: null
		    }
	},
	template: ` 
<div>
	Neki tekst
</div>		  
`
	, 
	methods : {
	//	addToCart : function (product) {
	//		axios
	//		.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
		//	.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		//}
	},
	mounted () {
       // axios
       //   .get('rest/restaurants/getJustRestaurants')
         // .then(response => (this.products = response.data))
    },
});