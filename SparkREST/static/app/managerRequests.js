Vue.component("managerRequests", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			   requests:[]
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Zahtevi</h1>
	<table style="width:500px; border: 1px solid black">
	<tr>
    <th>Porudžbina</th>
    <th>Dostavljač</th>
    <th></th>
  </tr>
	<tr v-for="r in requests">
	<td>#{{r.idOrder}}</td>
	<td>{{r.deliverer.name}} {{r.deliverer.surname}}</td>
	<td><button style="margin-right:30px" v-on:click="approveRequest(r)">Odobri zahtev</button><button v-on:click="refuseRequest(r)">Odbij zahtev</button></td>
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
		},
	approveRequest : function(request){
		axios
			.post('/rest/order/approveRequest', request)
			.then(response => {
				axios
          .get('/rest/order/requestedOrders')
          .then(response => (this.requests=response.data))
			})
	},
	refuseRequest : function(request){
		axios
			.post('/rest/order/refuseRequest', request)
			.then(response => {
				axios
          .get('/rest/order/requestedOrders')
          .then(response => (this.requests=response.data))
			})
	}
	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))

	   axios
          .get('/rest/order/requestedOrders')
          .then(response => (this.requests=response.data))
    },
});