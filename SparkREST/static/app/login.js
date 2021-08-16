Vue.component("login", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null}
		    }
	},
	template: ` 
<div>
	<h3>Prijava</h3>
	<form>
	<label>Korisničko ime</label>
	<input type = "text" v-model = "user.username" name = "username">
	</br>
	<label>Lozinka</label>
	<input type = "text" v-model = "user.password" name = "password">
	</br>
	<input type = "submit" v-on:click = "logIn" value = "Prijavi se">
	</form>
</div>		  
`
	, 
	methods : {
		logIn : function () {
			event.preventDefault();
			axios
			.post('rest/user/login', this.user)
			.then(response => (router.push(`/`)))
		}
	},
	mounted () {
        axios
          .get('rest/restaurants/getJustRestaurants')
          .then(response => (this.products = response.data))
    },
});