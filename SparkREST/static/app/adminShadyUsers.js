Vue.component("adminShadyUsers", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			   shoppers:[]
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Sumnjivi korisnici</h1>
	<table style="margin-left: auto;
  margin-right: auto;width:500px;margin-top:4em">
	<tr v-for="s in shoppers">
	<td style="padding-bottom: 4em;text-align:left">Korisničko ime: {{s.username}}<br>
	Ime: {{s.name}}<br>
	Prezime: {{s.surname}}<br>
	Poeni: {{s.points.toFixed(2)}}
	</td>
	<td style="padding-bottom: 4em;text-align:left">
	Datum rođenja: {{s.date.getDate()}}.{{s.date.getMonth()+1}}.{{s.date.getFullYear()}}<br>
	Pol: {{s.gender}}<br>
	Uloga: {{s.role}}<br>
	Tip: {{s.type.name}}</td>
	</td>
	<td><button style="position: relative;top:-25px" v-on:click="blockUser(s)">BLOKIRAJ</button></td>
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
	},
	blockUser : function(shopper){
		shopper.role='SHOPPER'
		axios
		.post('/rest/user/block',shopper)
		.then(response=>{toast("Korisnik je uspešno blokiran.")
			axios
		  .get('/rest/users/getShadyUsers')
		  .then(response => {this.shoppers=response.data
					for(let i=0;i<this.shoppers.length;i++){
						this.shoppers[i].date=new Date(this.shoppers[i].date);
						this.shoppers[i].role='Kupac';
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
		  .get('/rest/users/getShadyUsers')
		  .then(response => {this.shoppers=response.data
					for(let i=0;i<this.shoppers.length;i++){
						this.shoppers[i].date=new Date(this.shoppers[i].date);
						this.shoppers[i].role='Kupac';
					}
				})
    },
});