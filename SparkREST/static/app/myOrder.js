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
  	<table style="margin-bottom:50px">
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
	
	</td>
	<td>
	{{o.restaurant.name}}
	{{o.dateTime.getDate()}}.{{o.dateTime.getMonth()+1}}.{{o.dateTime.getFullYear()}} {{o.dateTime.getHours()}}:{{o.dateTime.getMinutes()}}:{{o.dateTime.getSeconds()}}  
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
			}
		})
    },
});