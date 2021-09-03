Vue.component("profile", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			   dateModified: null,
			   dateM:new Date()
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Podaci o profilu</h1>
	<label>Ime:
	
	<span v-if="isViewing"> {{user.name}} </span>
	<span v-if="isEditing"> 
	<input type="text" v-model="user.name">
	 </span>
	</label><br><br>
	<label>Prezime:
	<span v-if="isViewing">
	 {{user.surname}}
	</span>
	<span v-if="isEditing"> 
	<input type="text" v-model="user.surname">
	 </span>
	</label><br><br>
	<label>Pol: 
	<span v-if="isViewing">
	{{user.gender}}
	</span>
	<span v-if="isEditing"> 
	<select v-model ="user.gender">
    <option value="Ženski">Ženski</option>
    <option value="Muški">Muški</option>
    <option value="Ne bih da navedem">Ne bih da navedem</option>
  	</select>
	 </span>
	</label><br><br>
	<label>
	Datum rođenja: 
	<span v-if="isViewing">
	{{dateM.getDate()}}.{{dateM.getMonth()+1}}.{{dateM.getFullYear()}}.
	</span>
	<span v-if="isEditing"> 
	<input type = "date" v-model = "dateModified">
	 </span>
	</label><br><br>
	<label>Korisničko ime: {{user.username}}</label><br><br>
	<button v-if="isViewing" v-on:click = "changeMode">Izmeni profil</button><br><br>
	<button v-if="isViewing" v-on:click = "changePassword">Promeni lozinku</button>
	<button v-if="isEditing" v-on:click = "saveChanges">Sačuvaj izmene</button>
	<button v-if="isEditing" v-on:click = "cancelChanges">Odustani</button>
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
			 this.dateM=new Date(this.user.date)
       		 month = '' + (this.dateM.getMonth() + 1),
       		 day = '' + this.dateM.getDate(),
       		 year = this.dateM.getFullYear();

			if (month.length < 2) 
       		 month = '0' + month;
   			 if (day.length < 2) 
        	 day = '0' + day;
			
			this.dateModified= [year, month, day].join('-');
		}
		},
	changeMode : function(){
		this.isEditing=true;
		this.isViewing=false;
		this.backup = [this.user.username, this.user.password, this.user.name, this.user.surname, this.user.gender, this.user.date, this.user.role];
	},
	saveChanges : function(){
		this.user.date=this.dateModified;
		axios
			.put('/rest/user/change', this.user)
			.then(response=>{
				 axios
          .get('/rest/user/getUser')
          .then(response => {this.isLogged(response.data)
					this.isEditing=false;
		this.isViewing=true;
				})
				
			})
			
		
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
    },
});