Vue.component("registration", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: "SHOPPER"},
			  emptyName: false,
			  emptySurname: false,
			  emptyGender: false,
			  emptyDate: false,
			  emptyUsername: false,
			  emptyPassword: false,
			  errors: []
		    }
	},
	template: ` 
<div>
	<h3>Registracija</h3>
	<p v-if="errors.length">
    <b>Molim Vas, ispravite navedeno:</b>
    <ul>
      <li v-for="error in errors" style="color:red">{{ error }}</li>
    </ul>
  </p>
	<form>
	<p>
	<label>Ime</label>
	<input type = "text" v-model = "user.name" v-on:blur="nameChange" name = "name"><span v-if="emptyName" style="color:red"> &nbsp;Morate popuniti polje</span>
	</p>
	<p>
	<label>Prezime</label>
	<input type = "text" v-model = "user.surname" v-on:blur="surnameChange" name = "surname"><span v-if="emptySurname" style="color:red"> &nbsp;Morate popuniti polje</span>
	</p>
	<p>
	<label>Pol</label>
	<select v-model ="user.gender" v-on:blur="genderChange" >
    <option value="Female">Ženski</option>
    <option value="Male">Muški</option>
    <option value="Rather not tell">Ne bih da navedem</option>
  	</select><span v-if="emptyGender" style="color:red"> &nbsp;Morate izabrati opciju</span>
	</p>
	<p>
	<label>Datum rodjenja</label>
	<input type = "date" v-model = "user.date" v-on:blur="dateChange" name = "date">
	<span v-if="emptyDate" style="color:red"> &nbsp;Morate izabrati datum</span>
	</p>
	<p>
	<label>Korisničko ime</label>
	<input type = "text" v-model = "user.username" v-on:blur="usernameChange" name = "username">
	<span v-if="emptyUsername" style="color:red"> &nbsp;Morate popuniti polje</span>
	</p>
	<p>
	<label>Lozinka</label>
	<input type = "password" v-model = "user.password" v-on:blur="passwordChange" name = "password">
	<span v-if="emptyPassword" style="color:red"> &nbsp;Morate popuniti polje</span>
	</p>
	<input type = "submit" v-on:click = "addUser" value = "Registruj se">
	</form>
</div>		  
`
	, 
	methods : {
		addUser : function () {
			event.preventDefault();
			axios
			.post('rest/user/add', this.user)
			.then(response => {
				if(response.data==="EMPTYERROR"){
					this.errors=[];
					 this.errors.push('Nisu sva polja popunjena.');
				}
				else if(response.data==="USERNAMEERROR"){
					this.errors=[];
					 this.errors.push('Korisnicko ime je zauzeto. Izaberite drugo.');
				}else{
					router.push(`/`)
				}
				
			})
		},
		nameChange : function(){
			if(!this.user.name){
				this.emptyName=true;
			} else{
				this.emptyName=false;
			}
		},
		surnameChange : function(){
			if(!this.user.surname){
				this.emptySurname=true;
			} else{
				this.emptySurname=false;
			}
		},
		genderChange : function(){
			if(!this.user.gender){
				this.emptyGender=true;
			} else{
				this.emptyGender=false;
			}
		},
		dateChange : function(){
			if(!this.user.date){
				this.emptyDate=true;
			} else{
				this.emptyDate=false;
			}
		},
		usernameChange : function(){
			if(!this.user.username){
				this.emptyUsername=true;
			} else{
				this.emptyUsername=false;
			}
		},
		passwordChange : function(){
			if(!this.user.password){
				this.emptyPassword=true;
			} else{
				this.emptyPassword=false;
			}
		}
	},
	mounted () {
        axios
          .get('rest/restaurants/getJustRestaurants')
          .then(response => (this.products = response.data))
    },
});