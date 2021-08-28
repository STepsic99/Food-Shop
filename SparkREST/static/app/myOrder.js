Vue.component("myOrder", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   orders: [],
			   dates: [],
				xx:null
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
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
			</table>
	<a href="">Više o artiklima</a>
	</td>
	<td style="padding-top:105px">
	<button style="margin-left:90px" v-if="o.status==='Obrada'">Otkaži porudžbinu</button>
<p>	Restoran: {{o.restaurant.name}}</p>
	<p>Vreme: {{o.dateTime.getDate()}}.{{o.dateTime.getMonth()+1}}.{{o.dateTime.getFullYear()}} {{o.dateTime.getHours()}}:{{o.dateTime.getMinutes()}}:{{o.dateTime.getSeconds()}} 
	</p>
</p>	Status: {{o.status}} </p>
	Cena: {{o.price}}
	</td>
	</tr>
	</table>
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