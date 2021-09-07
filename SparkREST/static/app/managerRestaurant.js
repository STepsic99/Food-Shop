Vue.component("managerRestaurant", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null,restaurant:{name:null,location:{address:null}}},
			   status: "",
			   showArticles: true,
			   showNewArticle:false,
			   testPic:null,
				newArticle:{name:null,price:null,type:null,quantity:null,description:null,image:null},
				image:null,
				error:null
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
	<h2 style="font-size:30px">Artikli <button style="position:relative;top:-5px;left:500px" v-on:click="newArticleFunc">Dodaj artikl</button></h2> 
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
	<h2>Novi artikl</h2>
	<div v-if="error" style="color:red">{{error}}</div>
	<table style=" margin-left: auto;
  margin-right: auto;">
	<tr>
	<td>Naziv:</td>
	<td><input type="text" v-model="newArticle.name"></td>
	</tr>
	<tr>
	<td>Cena:</td>
	<td><input type="text" v-model="newArticle.price"></td>
	</tr>
	<tr>
	<td>Tip:</td>
	<td><select v-model="newArticle.type">
	<option value="FOOD">Jelo</option>
	<option value="DRINK">Piće</option>
	</select>
	</td>
	</tr>
	<tr>
	<td>Slika:</td>
	<td><input type="file" v-on:change="addImage"></td>
	</tr>
	<tr>
	<td>Opis:</td>
	<td><input type="text" v-model="newArticle.description"></td>
	</tr>
	<tr>
	<td>Količina:</td>
	<td><input type="text" v-model="newArticle.quantity"></td>
	</tr>
	<tr>
	<td colspan="2" style="padding-top:20px"><button style="margin-right:25px" v-on:click="addArticle">Dodaj artikl</button><button v-on:click="goBack">Odustani</button></td>
	</tr>
	</table>
	
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
			this.showArticles=true;
			this.showNewArticle=false;	
		}
		},
	newArticleFunc : function(){
		this.showArticles=false;
		this.showNewArticle=true;
	},
	goBack : function(){
		this.showArticles=true;
		this.showNewArticle=false;
	},
	addImage : function(e){
		  const file = e.target.files[0];
            this.createBase64Image(file);
	},
	createBase64Image(file){
            const reader= new FileReader();
            reader.onload = (e) =>{
            	let img = e.target.result;
                this.image=img
            }
            reader.readAsDataURL(file);
    },
	addArticle : function(){
		for(let i=0;i<this.user.restaurant.articles.length;i++){
			if(this.user.restaurant.articles[i].name==this.newArticle.name){
				this.error="Već postoji artikl sa istim imenom.";
				return;
			}
		}
		this.newArticle.image=this.image;
		axios
		.post('rest/manager/addArticle',this.newArticle)
		.then(response=>{
			toast("Uspešno dodat artikl")
			axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
		})
		
	}	
	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
    },
});