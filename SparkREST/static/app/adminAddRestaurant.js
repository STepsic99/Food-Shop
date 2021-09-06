Vue.component("adminAddRestaurant", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			   newRestaurant:{name:null,type:null,location:null},
			   freeManagers:[],
			    error: null,
			   newUser:{}
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Dodaj restoran</h1>
	<label>Naziv:</label>
	<input type="text" v-model="newRestaurant.name">
	<br><br>
	<label>Lokacija:</label>
	<input type="text" v-model="newRestaurant.location">
	<br><br>
	<label>Tip:</label>
	<select v-model ="newRestaurant.type">
    <option value="Primorski">Primorski</option>
    <option value="Italijanski">Italijanski</option>
    <option value="Kineski">Kineski</option>
  	</select><br><br>
	<label v-if="freeManagers.length!=0">Raspoloživi menadžeri:</label>
	<select v-if="freeManagers.length!=0">
	<option v-for="m in freeManagers">
    {{ m.username }}
  </option>
	</select>
	<div v-else>
	<h3>Dodavanje menadžera restorana</h3><br>
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
	<label>Korisničko ime:</label>
	<input type = "text" v-model = "newUser.username">
	</p>
	<p>
	<label>Lozinka:</label>
	<input type = "password" v-model = "newUser.password">
	</p><br>
	</form>
	</div>
	<br><br>
	<button v-on:click="addRestaurant">Dodaj restoran</button>
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
	addRestaurant : function(){
		console.log("A")
	}
	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))

	 axios
		.get('/rest/user/freeManagers')
		.then(response => (this.freeManagers=response.data))
    },
});