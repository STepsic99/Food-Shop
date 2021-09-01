Vue.component("managerRequests", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			   requests:[],
			   commentRequests:[]
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 900px;">
	<h1>Zahtevi za dostavu</h1>
	<table style="width:600px; border: 1px solid black; margin-left: auto;
  margin-right: auto; border-collapse: collapse;">
	<tr >
    <th>Porudžbina</th>
    <th>Dostavljač</th>
    <th></th>
  </tr>
	<tr style="border-bottom: 1px solid black;" v-for="r in requests">
	<td style="padding-bottom:10px;padding-top:10px">#{{r.idOrder}}</td>
	<td style="padding-bottom:10px;padding-top:10px">{{r.deliverer.name}} {{r.deliverer.surname}} ({{r.deliverer.username}})</td>
	<td style="padding-bottom:10px;padding-top:10px"><button style="margin-right:30px" v-on:click="approveRequest(r)">Odobri zahtev</button><button v-on:click="refuseRequest(r)">Odbij zahtev</button></td>
	</tr>
	</table>
	<br><br>
	<h1>Zahtevi za komentarisanje</h1>
	<table style="width:900px; border: 1px solid black; border-collapse: collapse;">
	<tr >
    <th>Komentar</th>
    <th>Ocena</th>
    <th>Korisnik</th>
    <th></th>
  </tr>
	<tr style="border-bottom: 1px solid black;" v-for="cr in commentRequests">
	<td style="max-width:300px;padding-bottom:10px;padding-top:10px">{{cr.content}}</td>
	<td style="padding-bottom:10px;padding-top:10px">{{cr.grade}}</td>
	<td style="padding-bottom:10px;padding-top:10px">{{cr.shopper.name}} {{cr.shopper.surname}} ({{cr.shopper.username}})</td>
	<td style="padding-bottom:10px;padding-top:10px"><button style="margin-right:30px;" v-on:click="approveCommRequest(cr)">Odobri zahtev</button></td>
	<td style="padding-bottom:10px;padding-top:10px"><button v-on:click="refuseCommRequest(cr)">Odbij zahtev</button></td>
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
	},
	approveCommRequest : function(request){
		request.status="APPROVED";
		axios
			.put('/rest/comment/changeStatus', request)
			.then(response => {
				axios
          .get('/rest/comment/getCommentRequests')
          .then(response => (this.commentRequests=response.data))
			})
	},
	refuseCommRequest : function(request){
		request.status="REJECTED";
		axios
			.put('/rest/comment/changeStatus', request)
			.then(response => {
				axios
          .get('/rest/comment/getCommentRequests')
          .then(response => (this.commentRequests=response.data))
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
		
		 axios
          .get('/rest/comment/getCommentRequests')
          .then(response => (this.commentRequests=response.data))		
		
    },
});