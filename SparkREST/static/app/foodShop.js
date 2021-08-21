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
			  status:"SVI",
			  chineseTicked:true,
			  italianTicked:true,
			  seasideTicked:true,
			  sortBy:1,
			  sortInOrder:1	
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
<div v-if="showFilters">
	<p>Sortiraj po:
	<select style="margin-left:3%" v-model="sortBy">
    <option value="1">Nazivu restorana</option>
    <option value="2">Lokaciji</option>
    <option value="3">Prosečnoj oceni</option>
  	</select>
	<select style="margin-left:3%" v-model="sortInOrder">
    <option value="1">Rastućem</option>
    <option value="2">Opadajućem</option>
  	</select><br><br>
	Status restorana:
  <input v-model="status" type="radio" name="status" value="SVI">
  <label>SVI</label>
  <input v-model="status" type="radio" name="status" value="OTVORENI">
  <label>OTVORENI</label><br><br>  
  Tip restorana:
<input type="checkbox" value="Kineski" v-model="chineseTicked" v-bind:disabled="this.searchedType!=='Prikaži sve'">
  <label> Kineski</label>
  <input type="checkbox" value="Italijanski" v-model="italianTicked" v-bind:disabled="this.searchedType!=='Prikaži sve'">
  <label> Italijanski</label>
  <input type="checkbox" value="Primorski" v-model="seasideTicked" v-bind:disabled="this.searchedType!=='Prikaži sve'">
  <label> Primorski</label><br><br>
	</p>
	</div>
	     <p style="text-align:left;"><img src="/../resources/filter.png" style="position:relative;top:5px;right:15px" width="5%" height="2%"><a href="" v-on:click="openFilters">Filteri</a></p>
    <input type = "submit" v-on:click = "searchBy" value = "PRETRAŽI"><br><br>

	
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
											
									else if(this.status==="OTVORENI" && this.restaurants[i].status==="CLOSED"){
										this.restaurants.splice(i,1);
											control=0;
											break;
									}else if(!this.chineseTicked && this.restaurants[i].type==="Kineski"){
										this.restaurants.splice(i,1);
											control=0;
											break;
									}else if(!this.italianTicked && this.restaurants[i].type==="Italijanski"){
										this.restaurants.splice(i,1);
											control=0;
											break;
									}else if(!this.seasideTicked && this.restaurants[i].type==="Primorski"){
										this.restaurants.splice(i,1);
											control=0;
											break;
									}
								
												
											
							}
						}
						if(this.showFilters && this.sortBy=="3" && this.sortInOrder=="1"){
										this.restaurants.sort(function (a, b) {
											  return a.averageGrade - b.averageGrade;
												});
									} else if(this.showFilters && this.sortBy=="3" && this.sortInOrder=="2"){
										this.restaurants.sort(function (a, b) {
											  return b.averageGrade - a.averageGrade;
												});
									}  else if(this.showFilters && this.sortBy==1 && this.sortInOrder==1){
										this.restaurants.sort(function (a, b) {
											  return a.name.replace(/\s+/g, '').localeCompare(b.name.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy=="1" && this.sortInOrder=="2"){
										this.restaurants.sort(function (a, b) {
											  return b.name.replace(/\s+/g, '').localeCompare(a.name.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy==2 && this.sortInOrder==1){
										this.restaurants.sort(function (a, b) {
											  return a.location.address.split(',')[1].replace(/\s+/g, '').localeCompare(b.location.address.split(',')[1].replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy=="2" && this.sortInOrder=="2"){
										this.restaurants.sort(function (a, b) {
											 return b.location.address.split(',')[1].replace(/\s+/g, '').localeCompare(a.location.address.split(',')[1].replace(/\s+/g, ''))
												});
									}
			
		},
		openFilters : function(){
			event.preventDefault();
			this.showFilters=!this.showFilters;
		},
		openFirst : function(dat){
			this.restaurants = dat
				var resLength = this.restaurants.length;
			for (var i = 0; i < resLength; i++) {
    				if(this.restaurants[i].status==="OPEN"){
								let restaurantBackup=this.restaurants[i]
								this.restaurants.splice(i,1);
								this.restaurants.unshift(restaurantBackup);
								i++;
									
									} 
							}
						
			
		}
		 
	},
	mounted () {
        axios
          .get('/rest/restaurants/getJustRestaurants')
          .then(response => (this.openFirst(response.data)))
		
		 axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
		
    },
});