Vue.component("restaurantDetails", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   restaurant: null,
			   status: ""
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);padding: 10px 115px 25px 45px; max-width: 1200px;margin: auto;">
	<h1 style="font-size:45px">{{this.restaurant.name}}</h1>
    <table style=" width: 100%;">
	<tr>
	<td> <div class="txtimg">
	<img  v-bind:src="this.restaurant.imagePath" alt="Restaurant" width="600" height="480"/>
	</div>
	</td>
	<td style=" width: 100%;">
	<span style="font-size:25px">
	Lokacija: {{this.restaurant.location.address}} <br><br>
	Tip restorana: {{this.restaurant.type}} <br><br>
	Status restorana: {{this.status}} <br><br>
	Prosečna ocena: {{this.restaurant.averageGrade}} <br><br>
	</span>
	</td>
	</tr>
	</table>
	<button v-on:click="logIn">AAA</button>
</div>		  
`
	, 
	methods : {
		logIn : function () {
			event.preventDefault();
			axios
			.post('rest/user/login', this.user)
			.then(response => {
				if(response.data==="ERROR"){
					 this.error="Uneli ste neodgovarajuće korisničko ime ili lozinku.";
				}
				else{
					this.$root.$emit('prijavljivanje', 0);
					router.push(`/`)
				}
			})
		}
	},
	mounted () {
		var s='/rest/restaurant/'+ this.$route.params.id
        axios
          .get(s)
          .then(response => {this.restaurant = response.data
				if(this.restaurant.status=="OPEN")
				this.status="Radi";
				else this.status="Ne radi"
			})
    },
});