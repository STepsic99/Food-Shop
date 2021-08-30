Vue.component("managerShoppers", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			  users:[]
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Kupci restorana</h1>
	<table style="width:500px; border: 1px solid black">
	<tr>
    <th>Ime</th>
    <th>Prezime</th>
    <th>Korisničko ime</th>
  </tr>
	<tr v-for="u in users">
	<td>{{u.name}}</td>
	<td>{{u.surname}}</td>
	<td>{{u.username}}</td>
	</tr>
	</table><br><br>
	
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
	changeMode : function(){
		this.isEditing=true;
		this.isViewing=false;
		this.backup = [this.user.username, this.user.password, this.user.name, this.user.surname, this.user.gender, this.user.date, this.user.role];
	},
	saveChanges : function(){
		axios
			.put('/rest/user/change', this.user)
			
		this.isEditing=false;
		this.isViewing=true;
	},
		cancelChanges : function(){
		this.user.username = this.backup[0];
    	this.user.password = this.backup[1];
    	this.user.name = this.backup[2];
    	this.user.surname = this.backup[3];	
		this.user.gender = this.backup[4];
    	this.user.date = this.backup[5];
    	this.user.role = this.backup[6];	
		this.isEditing=false;
		this.isViewing=true;
	},
	changePassword : function(){
		router.push(`/pass`);
	}
	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))

		axios
          .get('/rest/order/getUsersByRestaurant')
          .then(response => (this.users = response.data))
    },
});