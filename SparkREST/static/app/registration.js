Vue.component("registration", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: "SHOPPER"}
		    }
	},
	template: ` 
<div>
	<h3>Registracija</h3>
	<form>
	<label>Ime</label>
	<input type = "text" v-model = "user.name" name = "name">
	</br>
	<label>Prezime</label>
	<input type = "text" v-model = "user.surname" name = "surname">
	</br>
	<label>Pol</label>
	<select v-model ="user.gender" >
    <option value="Female">Ženski</option>
    <option value="Male">Muški</option>
    <option value="Rather not tell">Ne bih da navedem</option>
  	</select>
	</br>
	<label>Datum rodjenja</label>
	<input type = "date" v-model = "user.date" name = "date">
	</br>
	<label>Korisničko ime</label>
	<input type = "text" v-model = "user.username" name = "username">
	</br>
	<label>Lozinka</label>
	<input type = "text" v-model = "user.password" name = "password">
	</br>
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
			.then(response => (router.push(`/`)))
		}
	},
	mounted () {
        axios
          .get('rest/restaurants/getJustRestaurants')
          .then(response => (this.products = response.data))
    },
});