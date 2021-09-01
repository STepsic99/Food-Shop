Vue.component("restaurantDetails", {
	data: function () {
		    return {
			  user: {},
			   restaurant: {"location":{}},
			   status: "",
			   canComment:null,
			   comment:{content:null,grade:3,restaurant:null}
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
	<h2 style="font-size:30px">Artikli</h2>
	<table style="column-count: 2;display: flex;max-width:100px;">
	<tr style="display: grid; grid-template-columns: repeat(4, 1fr)" >
	<td style="padding-left:3em;padding-bottom:5em " v-for="a in restaurant.articles">
	 <div class="txtimg">
	<img  v-bind:src="a.image" alt="Article" width="250" height="230"/>
	</div>
	<h2 style="font-size:27px" >{{a.name}}</h2><br>
	{{a.description}}<br><br>
	<span style="font-size:20px">{{a.price}} RSD </span><br><br>
	<span v-if="user && user.role=='SHOPPER' && status=='Radi'">
	<input type="number" style="width:80px" size="33" min="1" v-model="a.counter">
	<button style="margin-left:10px" v-on:click="addToCart(a)">Dodaj u korpu</button>
	</span>
	</td>
	</tr>
	</table>
	<div style="text-align:left;font-size:1.4em">Komentari:</div><br>
	<div v-if="this.canComment">
	<span style="font-size:1.2em">Ostavite komentar:</span><br><br>
	<textarea v-model="comment.content" style="width:500px;height:100px">
	</textarea><br>
	Ocena:
	<input v-model="comment.grade" type="radio" name="gradeR" value=1>
<label>1</label>
<input v-model="comment.grade" type="radio" name="gradeR" value=2>
<label>2</label>
<input v-model="comment.grade" type="radio" name="gradeR" value=3>
<label>3</label>
<input v-model="comment.grade" type="radio" name="gradeR" value=4>
<label>4</label>
<input v-model="comment.grade" type="radio" name="gradeR" value=5>
<label>5</label>
	<br><br>
	<button v-on:click="sendComment">Pošalji komentar</button>
	</div>
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
		},
		addToCart : function(chosenArticle) {
				axios
			.post('/rest/cart/addArticle', chosenArticle)
			.then(response =>{toast('Artikl ' + chosenArticle.name + " je uspešno dodat u korpu.")
				this.$root.$emit('promenaKorpe', chosenArticle.counter);
			})
		},
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
		sendComment : function(){
			this.comment.restaurant=this.restaurant;
			axios
			.post('/rest/comment/addComment', this.comment)
			.then(response =>{ toast("Komentar je uspešno poslat.")
					this.comment.content=null;
					this.comment.grade=3;
			})
		}
	},
	mounted () {       
	
       
		 axios
          .get('/rest/user/getUser')
          .then(response => {this.isLogged(response.data)
			 axios
          .get('/rest/restaurant/'+ this.$route.params.id)
          .then(response => {this.restaurant = response.data
				if(this.restaurant.status=="OPEN")
				this.status="Radi";
				else this.status="Ne radi"
				 axios
          .get('/rest/restaurant/canComment/'+ this.$route.params.id)
          .then(response => (this.canComment=response.data))
			})
			})	
			
    },
});