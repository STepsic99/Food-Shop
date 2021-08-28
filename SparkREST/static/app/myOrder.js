Vue.component("myOrder", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   orders: [],
			   dates: [],
				xx:null,
				showArticles:false,
				showOrders:true,
				orderTemp:null
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
<div v-if="showOrders">
	<h1>Moje porudžbine</h1>
  	<table style="margin-bottom:50px;text-align:left">
	<tr v-for="o in orders">
	<td> 
<h2>	Porudžbina #{{o.id}}</h2>
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
	<button style="margin-left:90px;margin-bottom:8px" v-if="o.status==='Obrada'" v-on:click="cancelOrder(o)">Otkaži porudžbinu</button>
<p>	Restoran: {{o.restaurant.name}}</p>
	<p>Vreme: {{o.dateTime.getDate()}}.{{o.dateTime.getMonth()+1}}.{{o.dateTime.getFullYear()}} {{o.dateTime.getHours()}}:{{o.dateTime.getMinutes()}}:{{o.dateTime.getSeconds()}} 
	</p>
</p>	Status: {{o.status}} </p>
	Cena: {{o.price}}
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
		cancelOrder : function(order){
			order.status="CANCELED";
			axios
			.put('/rest/order/change', order)
			.then(response=>{
				
				
							axios
		.get('/rest/order/getOrdersByUser')
		.then(response => {this.orders=response.data
	for (let i = 0; i < this.orders.length; i++) {
				this.xx=new Date(this.orders[i].dateTime);
				this.orders[i].dateTime=this.xx;
				switch(this.orders[i].status) {
				  case "PROCESSING":
				    this.orders[i].status="Obrada";
				    break;
				  case "IN_PREPARATION":
				    this.orders[i].status="U pripremi";
				    break;
 				  case "WAITING_FOR_DELIVERER":
				    this.orders[i].status="Čeka dostavljača";
				    break;
				  case "IN_TRANSPORT":
				    this.orders[i].status="U transportu";
				    break;
				  case "DELIVERED":
				    this.orders[i].status="Dostavljena";
				    break;
				  case "CANCELED":
				    this.orders[i].status="Otkazana";
				    break;
				  default:
				}
			}
		})
				
				
			})
	
		}	
	},
	mounted () {
      axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))	

	axios
		.get('/rest/order/getOrdersByUser')
		.then(response => {this.orders=response.data
	for (let i = 0; i < this.orders.length; i++) {
				this.xx=new Date(this.orders[i].dateTime);
				this.orders[i].dateTime=this.xx;
				switch(this.orders[i].status) {
				  case "PROCESSING":
				    this.orders[i].status="Obrada";
				    break;
				  case "IN_PREPARATION":
				    this.orders[i].status="U pripremi";
				    break;
 				  case "WAITING_FOR_DELIVERER":
				    this.orders[i].status="Čeka dostavljača";
				    break;
				  case "IN_TRANSPORT":
				    this.orders[i].status="U transportu";
				    break;
				  case "DELIVERED":
				    this.orders[i].status="Dostavljena";
				    break;
				  case "CANCELED":
				    this.orders[i].status="Otkazana";
				    break;
				  default:
				}
			}
		})
    },
});