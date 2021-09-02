Vue.component("adminUsers", {
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
	<h1>Registrovani korisnici</h1>
	<table style="margin-left: auto;
  margin-right: auto;width:500px;margin-top:4em">
	<tr v-for="u in users">
	<td style="padding-bottom: 4em;text-align:left">Korisničko ime: {{u.username}}<br>
	Ime: {{u.name}}<br>
	Prezime: {{u.surname}}<br>
	<span v-if="u.role=='SHOPPER'">Poeni: {{u.points.toFixed(2)}}</span>
	<span v-if="u.role=='MANAGER'">Restoran: {{u.restaurant.name}}</span>
	</td>
	<td style="padding-bottom: 4em;text-align:left">
	Datum rođenja: {{u.date.getDate()}}.{{u.date.getMonth()+1}}.{{u.date.getFullYear()}}<br>
	Pol: {{u.gender}}<br>
	Uloga: {{u.role}}<br>
	<span v-if="u.role=='SHOPPER'">Tip: {{u.type.name}}</span></td>
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
		.get('/rest/users/registredUsers')
		.then(response=>{this.users=response.data
			for(let i=0;i<this.users.length;i++){
				this.users[i].date=new Date(this.users[i].date)
			}
		
		
		})
    },
});