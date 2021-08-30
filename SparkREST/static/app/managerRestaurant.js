Vue.component("managerRestaurant", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   status: "",
			   showArticles: true,
			   showNewArticle:false
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);padding: 10px 115px 25px 45px; max-width: 1200px;margin: auto;">
	<h1 style="font-size:45px">{{user.restaurant.name}}</h1>
    <table style=" width: 100%;">
	<tr>
	<td> <div class="txtimg">
	<img  v-bind:src="user.restaurant.imagePath" alt="Restaurant" width="600" height="480"/>
	</div>
	</td>
	<td style=" width: 100%;">
	<span style="font-size:25px">
	Lokacija: {{user.restaurant.location.address}} <br><br>
	Tip restorana: {{user.restaurant.type}} <br><br>
	Status restorana: {{status}} <br><br>
	Prosečna ocena: {{user.restaurant.averageGrade}} <br><br>
	</span>
	</td>
	</tr>
	</table>
	<div v-if="showArticles">
	<h2 style="font-size:30px">Artikli <button style="position:relative;top:-5px;left:500px" v-on:click="newArticle">Dodaj artikl</button></h2> 
	<table style="column-count: 2;display: flex;max-width:100px;">
	<tr style="display: grid; grid-template-columns: repeat(4, 1fr)" >
	<td style="padding-left:3em;padding-bottom:5em " v-for="a in user.restaurant.articles">
	 <div class="txtimg">
	<img  v-bind:src="a.image" alt="Article" width="250" height="230"/>
	</div>
	<h2 style="font-size:27px;margin-bottom:0px" >{{a.name}}</h2>
	(<span v-if="a.type==='FOOD'">Hrana</span><span v-if="a.type==='DRINK'">Piće</span>, {{a.quantity}}<span v-if="a.type==='FOOD'"> g</span><span v-if="a.type==='DRINK'"> ml</span>)<br><br>
	
	{{a.description}}<br><br>
	<span style="font-size:20px">{{a.price}} RSD </span><br><br>
	</td>
	</tr>
	</table>
	</div>
	<div v-if="showNewArticle">
	<button v-on:click="goBack">Odustani</button>
	</div>
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
			if(this.user.restaurant.status=="OPEN")
				this.status="Radi";
				else this.status="Ne radi"
		}
		},
	newArticle : function(){
		this.showArticles=false;
		this.showNewArticle=true;
	},
	goBack : function(){
		this.showArticles=true;
		this.showNewArticle=false;
	}	
	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
    },
});