Vue.component("food-shop", {
	data: function () {
		    return {
		      restaurants: null,
			  loggedin: false,
			  notloggedin: false,
			  user: null,
			  searchedName: null,
			  searchedType: "Prikaži sve",
			  searchedLocation: null,
			  searchedGrade:1,
			  showFilters:false,
			  status:"SVI"	
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
     <p style="text-align:left;"><img src="/../resources/filter.png" style="position:relative;top:5px;right:15px" width="5%" height="2%"><a href="" v-on:click="openFilters">Filteri</a></p>
	<div v-if="showFilters">
	<p style="text-align:left;">Sortiraj po:
	<select style="margin-left:3%">
    <option value="1">Nazivu restorana</option>
    <option value="2">Lokaciji</option>
    <option value="3">Prosečnoj oceni</option>
  	</select>
	<select style="margin-left:3%">
    <option value="1">Rastućem</option>
    <option value="2">Opadajućem</option>
  	</select><br><br>
	Status restorana:
  <input v-model="status" type="radio" name="status" value="SVI">
  <label>SVI</label>
  <input v-model="status" type="radio" name="status" value="OTVORENI">
  <label>OTVORENI</label><br>  
	</p>
	</div>
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
			while(control===0){
				control=1;
				resLength = this.restaurants.length;
			for (var i = 0; i < resLength; i++) {
				var loc=this.restaurants[i].location.address.split(',');
    				if(this.searchedName && !this.restaurants[i].name.toLowerCase().includes(this.searchedName.toLowerCase())){
								this.restaurants.splice(i,1);
								control=0;
								break;	
									} else if(this.restaurants[i].averageGrade<this.searchedGrade){
											this.restaurants.splice(i,1);
											control=0;
											break;	
									}else if(this.searchedType!=="Prikaži sve" && this.restaurants[i].type!==this.searchedType){
											this.restaurants.splice(i,1);
											control=0;
											break;	
									}else if(this.searchedLocation && !loc[1].trim().toLowerCase().includes(this.searchedLocation.toLowerCase())){
											this.restaurants.splice(i,1);
											control=0;
											break;	}
							}
						}
			
		},
		openFilters : function(){
			event.preventDefault();
			this.showFilters=!this.showFilters;
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