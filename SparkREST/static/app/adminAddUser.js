Vue.component("adminAddUser", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			   error: null,
			   newUser:{}
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Dodaj korisnika</h1>
	<p v-if="error">
    <b>Molim Vas, ispravite navedeno:</b>
      <div style="color:red">{{ error }}</div>
  </p>
	<form class="formUser">
	<p>
	<label>Ime:</label>
	<input type = "text" v-model = "newUser.name">
	</p>
	<p>
	<label>Prezime:</label>
	<input type = "text" v-model = "newUser.surname">
	</p>
	<p>
	<label>Pol:</label>
	<select v-model ="newUser.gender">
    <option value="Ženski">Ženski</option>
    <option value="Muški">Muški</option>
    <option value="Ne bih da navedem">Ne bih da navedem</option>
  	</select>
	</p>
	<p>
	<label>Datum rodjenja:</label>
	<input type = "date" v-model = "newUser.date">
	</p>
	<p>
	<label>Uloga: </label>
	<select v-model ="newUser.role">
	<option value="MANAGER">Menadžer</option>
	<option value="DELIVERER">Dostavljač</option>
	</select>
	</p>
	<p>
	<label>Korisničko ime:</label>
	<input type = "text" v-model = "newUser.username">
	</p>
	<p>
	<label>Lozinka:</label>
	<input type = "password" v-model = "newUser.password">
	</p><br>
	<input type = "submit" v-on:click="addUser" value = "Dodaj korisnika">
	</form>
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
	
	addUser : function(){
		event.preventDefault();
		if(!this.newUser.name || !this.newUser.surname || !this.newUser.username || !this.newUser.password || !this.newUser.gender || !this.newUser.date || !this.newUser.role ){
			this.error="";
		    this.error='Nisu sva polja popunjena.';
			return;
		}
		axios
			.post('rest/user/addByAdmin', this.newUser)
			.then(response => {
				if(response.data==="USERNAMEERROR"){
					this.error="";
					this.error='Korisnicko ime je zauzeto. Izaberite drugo.';
				}else{
					toast("Korisnik je uspešno kreiran.");
					this.newUser={};
					this.error=null;
				}
				
			})
	}

	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
    },
});