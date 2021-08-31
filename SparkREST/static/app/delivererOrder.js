Vue.component("delivererOrder", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   orders: [],
			   dates: [],
				xx:null,
				showArticles:false,
				showOrders:true,
				orderTemp:null,
			  searchedName: null,
			  searchedType: "Prikaži sve",
			  searchedPrice1: null,
			  searchedPrice2: null,
			  searchedGrade:1,
			  showFilters:false,
			  status:"SVE",
			  chineseTicked:true,
			  italianTicked:true,
			  seasideTicked:true,
			  sortBy:1,
			  sortInOrder:1,
			  date1:null,
			  date2:null	
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
<div v-if="showOrders">
	<h1>Moje porudžbine</h1>
	<label>Naziv restorana:</label>
  <input type="text" v-model="searchedName"><br><br>
  <label>Cena porudžbine:</label> 
  <input type="text" style="width:50px" v-model="searchedPrice1"> - <input type="text" style="width:50px" v-model="searchedPrice2"> &nbsp;RSD<br><br>
  <label>Datum porudžbine:</label>
  <input type = "date" v-model="date1"> - <input type = "date" v-model="date2">
  <br><br>
<div v-if="showFilters">
	<p>Sortiraj po:
	<select style="margin-left:3%" v-model="sortBy">
    <option value="1">Nazivu restorana</option>
    <option value="2">Ceni porudžbine</option>
    <option value="3">Datumu porudžbine</option>
  	</select>
	<select style="margin-left:3%" v-model="sortInOrder">
    <option value="1">Rastućem</option>
    <option value="2">Opadajućem</option>
  	</select><br><br>
	Status porudžbine:
  <input v-model="status" type="radio" name="status" value="SVE">
  <label>SVE</label>
  <input v-model="status" type="radio" name="status" value="NEDOSTAVLJENE">
  <label>NEDOSTAVLJENE</label><br><br>  
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

	

  	<table style="margin-bottom:50px;text-align:left">
	<tr v-for="o in orders">
	<td> 
<h2>	Porudžbina #{{o.id}}<button style="position:relative;top:-22px;left:300px" v-on:click="changeStatus(o)" v-if="o.status=='U transportu'">Promeni status na: DOSTAVLJENA</button></h2>
<p>Poručioc: {{o.shopper.name}} {{o.shopper.surname}}</p>
Artikli : 	<table>
			<tr v-for="a in o.articles">
			<td> 
			{{a.name}} x{{a.counter}}
			</td>
			</tr>
			</table><br>
	<a href="" v-on:click="moreOfArticles(o)">Više o artiklima</a>
	</td>
	<td style="padding-top:70px">
<p>	Restoran: {{o.restaurant.name}}</p>
	<p>Vreme: {{o.dateTime.getDate()}}.{{o.dateTime.getMonth()+1}}.{{o.dateTime.getFullYear()}} {{o.dateTime.getHours()}}:{{o.dateTime.getMinutes()}}:{{o.dateTime.getSeconds()}} 
	</p>
</p>	Status: {{o.status}} </p>
	Cena: {{o.price.toFixed(2)}} RSD
	</td>
	</tr>
	</table>
</div>	
<div v-if="showArticles">
<h2>	Porudžbina #{{orderTemp.id}}</h2>
<table style="margin-bottom:50px">
	<tr v-for="a in orderTemp.articles">
	<td> 
	<img  v-bind:src="a.image" alt="Artikl" width="200" height="180"/>
	</td>
	<td style="display: block;
  vertical-align: top; height: 220px; padding-left:60px" >
	<h2>{{a.name}}</h2>
	<p style="font-size:18px">{{a.price}} RSD </p>
	{{a.description}}<br><br>
	Količina:&nbsp;{{a.counter}}
	
	
	</td>
	</tr>
	</table>
<button v-on:click="goBack">Nazad</button>
</div>
</div>		  
`
	, 
	methods : {
	isLogged : function(user){
			this.user=user
			if(this.user===null){
			this.visibleLogout= false
			this.visibleLogin= true	
		}else{
			this.visibleLogin = false;
			this.visibleLogout = true;
		}
		},
	moreOfArticles : function(or){
		event.preventDefault();
			this.showArticles=true;
			this.showOrders=false;
			this.orderTemp=or;
		},
		goBack : function(){
			this.showArticles=false;
			this.showOrders=true;
		},
		changeStatus : function(order){
				order.status="DELIVERED";
			axios
			.put('/rest/order/changeDeliverer', order)
			.then(response => {
				order.status="Dostavljena";
			})
		},
				searchBy : function(){
			event.preventDefault();
			axios
          .get('/rest/user/getUser')
          .then(response => {
			{
				this.user=response.data;
				for (let i = 0; i < this.user.orders.length; i++) {
				this.xx=new Date(this.user.orders[i].dateTime);
				this.user.orders[i].dateTime=this.xx;
				switch(this.user.orders[i].status) {
				  case "PROCESSING":
				    this.user.orders[i].status="Obrada";
				    break;
				  case "IN_PREPARATION":
				    this.user.orders[i].status="U pripremi";
				    break;
 				  case "WAITING_FOR_DELIVERER":
				    this.user.orders[i].status="Čeka dostavljača";
				    break;
				  case "IN_TRANSPORT":
				    this.user.orders[i].status="U transportu";
				    break;
				  case "DELIVERED":
				    this.user.orders[i].status="Dostavljena";
				    break;
				  case "CANCELED":
				    this.user.orders[i].status="Otkazana";
				    break;
				  default:
				}
			}
		}	
	this.searchByAgain(this.user.orders)})
		},
		searchByAgain : function(ords){
			this.orders = ords
				var resLength = this.orders.length;
			var control=0
			while(control===0){
				control=1;
				resLength = this.orders.length;
			for (var i = 0; i < resLength; i++) {
				//var cmpdate1=new Date("this.orders[i].dateTime.getFullYear");
				var date1Cmp=new Date(this.date1)
				var date2Cmp=new Date(this.date2)
    				if(this.searchedName && !this.orders[i].restaurant.name.toLowerCase().includes(this.searchedName.toLowerCase())){
								this.orders.splice(i,1);
								control=0;
								break;	
									} 
									else if(this.searchedPrice1 && this.searchedPrice2 && !(this.searchedPrice1<=this.orders[i].price && this.orders[i].price<=this.searchedPrice2)){
											this.orders.splice(i,1);
											control=0;
											break;	
									}else if(this.searchedPrice1 && !this.searchedPrice2 && !(this.searchedPrice1<=this.orders[i].price)){
											this.orders.splice(i,1);
											control=0;
											break;	
									}else if(!this.searchedPrice1 && this.searchedPrice2 && !(this.orders[i].price<=this.searchedPrice2)){
											this.orders.splice(i,1);
											control=0;
											break;	
									}	else if(this.status==="NEDOSTAVLJENE" && this.orders[i].status==="Dostavljena"){
										this.orders.splice(i,1);
											control=0;
											break;
									} else if(!this.chineseTicked && this.orders[i].articles[0].restaurant.type==="Kineski"){
										this.orders.splice(i,1);
											control=0;
											break;
									}else if(!this.italianTicked && this.orders[i].articles[0].restaurant.type==="Italijanski"){
										this.orders.splice(i,1);
											control=0;
											break;
									}else if(!this.seasideTicked && this.orders[i].articles[0].restaurant.type==="Primorski"){
										this.orders.splice(i,1);
											control=0;
											break;
									}
									else if(this.date1 && this.date2 && !(date1Cmp.getTime()<=this.orders[i].dateTime.getTime() && this.orders[i].dateTime.getTime()<=date2Cmp.getTime())){
											this.orders.splice(i,1);
											control=0;
											break;	
									}else if(this.date1 && !this.date2 && !(date1Cmp.getTime()<=this.orders[i].dateTime.getTime())){
											this.orders.splice(i,1);
											control=0;
											break;	
									}else if(!this.date1 && this.date2 && !(this.orders[i].dateTime.getTime()<=date2Cmp.getTime())){
											this.orders.splice(i,1);
											control=0;
											break;	
									}
								
												
											
							}
						}
						if(this.showFilters && this.sortBy=="2" && this.sortInOrder=="1"){
										this.orders.sort(function (a, b) {
											  return a.price - b.price;
												});
									} else if(this.showFilters && this.sortBy=="2" && this.sortInOrder=="2"){
										this.orders.sort(function (a, b) {
											  return b.price - a.price;
												});
									}  else if(this.showFilters && this.sortBy==1 && this.sortInOrder==1){
										this.orders.sort(function (a, b) {
											  return a.restaurant.name.replace(/\s+/g, '').localeCompare(b.restaurant.name.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy=="1" && this.sortInOrder=="2"){
										this.orders.sort(function (a, b) {
											  return b.restaurant.name.replace(/\s+/g, '').localeCompare(a.restaurant.name.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy==3 && this.sortInOrder==1){
										this.orders.sort(function (a, b) {
											  return a.dateTime.getTime() - b.dateTime.getTime();
												});
									} else if(this.showFilters && this.sortBy=="3" && this.sortInOrder=="2"){
										this.orders.sort(function (a, b) {
											 return b.dateTime.getTime() - a.dateTime.getTime();
												});
									}
			
		},
		openFilters : function(){
			event.preventDefault();
			this.showFilters=!this.showFilters;
		}	
	},
	mounted () {
      axios
          .get('/rest/user/getUser')
          .then(response => {
				this.user=response.data;
				for (let i = 0; i < this.user.orders.length; i++) {
				this.xx=new Date(this.user.orders[i].dateTime);
				this.user.orders[i].dateTime=this.xx;
				switch(this.user.orders[i].status) {
				  case "PROCESSING":
				    this.user.orders[i].status="Obrada";
				    break;
				  case "IN_PREPARATION":
				    this.user.orders[i].status="U pripremi";
				    break;
 				  case "WAITING_FOR_DELIVERER":
				    this.user.orders[i].status="Čeka dostavljača";
				    break;
				  case "IN_TRANSPORT":
				    this.user.orders[i].status="U transportu";
				    break;
				  case "DELIVERED":
				    this.user.orders[i].status="Dostavljena";
				    break;
				  case "CANCELED":
				    this.user.orders[i].status="Otkazana";
				    break;
				  default:
				}
			}
			this.orders=this.user.orders;
		})	


    },
});