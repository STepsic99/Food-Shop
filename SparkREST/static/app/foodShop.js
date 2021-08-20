Vue.component("food-shop", {
	data: function () {
		    return {
		      restaurants: null,
			  loggedin: false,
			  notloggedin: false,
			  user: null,
			  searchedName: null,
			  searchedType: null,
			  searchedLocation: null,
			  searchedGrade:null	
		    }
	},
	template: ` 
<div>
	<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px; margin-bottom: 25px;">
	<label>Naziv restorana:</label>
  <input type="text" name="rname" v-model="searchedName"><br><br>
  <label>Lokacija restorana:</label>
  <input type="text" name="rlocation" v-model="searchedLocation"><br><br>
  <label>Tip restorana:</label>
  <select v-model="searchedType">
    <option value="Prikaži sve">Prikaži sve</option>
    <option value="Kineski">Kineski</option>
    <option value="Italijanski">Italijanski</option>
    <option value="Primorski">Primorski</option>
  	</select><br><br>
   <label>Ocena:</label>
  <select v-model="searchedGrade">
    <option value="1">Prikaži sve</option>
    <option value="2">&gt;2</option>
    <option value="3">&gt;3</option>
    <option value="4">&gt;4</option>
    <option value="5">5</option>
  	</select><br><br>
    <input type = "submit" v-on:click = "searchBy" value = "PRETRAŽI"><br><br>
     <p style="text-align:left;">Filteri</p>
	</div>
	<table style="margin-left: auto;
  margin-right: auto;background: rgba(255, 255, 255, 0.8); padding: 10px 515px 25px 45px;">
	<tr v-for="r in restaurants">
	<td> <div class="txtimg">
	<h2>{{r.name}}</h2>
	<img  v-bind:src="r.imagePath" alt="Restaurant" width="400" height="280"/>
	</div>
	</td>
	<td>
	Lokacija: {{r.location.address}} <br><br>
	Tip restorana: {{r.type}} <br><br>
	Prosečna ocena: {{r.averageGrade}}
	</td>
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
		},
		searchBy : function(){
			event.preventDefault();
			axios
          .get('/rest/restaurants/getJustRestaurants')
          .then(response => (this.searchByAgain(response.data)))
		},
		searchByAgain : function(res){
			this.restaurants = res
				var resLength = this.restaurants.length;
			var control=0
		/*	var tempArray=[]
			for (var i = 0; i < resLength; i++) {
    				if(this.restaurants[i].name.includes(this.searchedName)){
								tempArray.push(this.restaurants[i]);	
									}
					}
			this.restaurants=tempArray;		*/
			while(control===0){
				control=1;
				resLength = this.restaurants.length;
			for (var i = 0; i < resLength; i++) {
    				if(!this.restaurants[i].name.includes(this.searchedName)){
								this.restaurants.splice(i,1);
								control=0;
								break;	
									}
							}
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