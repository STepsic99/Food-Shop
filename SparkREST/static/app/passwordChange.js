Vue.component("passwordChange", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   oldPassword: null,
			   newPassword: null,
			   repeatedPassword: null,
			   error: null
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Promena lozinke</h1>
	 <p v-if="error" style="color:red">{{ error }}</p>
	<label>Trenutna lozinka:</label>
	<input type="password" v-model="oldPassword"><br><br>
	<label>Nova lozinka:</label>
	<input type="password" v-model="newPassword"><br><br>
	<label>Ponovljena lozinka:</label>
	<input type="password" v-model="repeatedPassword"><br><br>
	<button v-on:click="changePassword">Promeni lozinku</button> <button style="margin-left:10%" v-on:click="GoBack">Odustani</button>
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
		GoBack : function () {
					router.push(`/p`)
		},
		changePassword : function(){
			if(!this.oldPassword || !this.newPassword ||  !this.repeatedPassword){
				this.error="Niste popunili sva polja!"
			}
			else if (this.oldPassword!==this.user.password){
				this.error="Neispravna trenutna lozinka!"
			}
			else if(this.newPassword!==this.repeatedPassword){
				this.error="Lozinke se ne poklapaju!"
			}else{
				this.user.password=this.newPassword;
			axios
			.post('rest/user/passwordChange', this.user)
			.then(response => (toast(response.data)))
			router.push(`/p`)
			}
		}
	},
	mounted () {
        axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
    },
});