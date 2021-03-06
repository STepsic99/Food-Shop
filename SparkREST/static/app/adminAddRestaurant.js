Vue.component("adminAddRestaurant", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			   newRestaurant:{name:null,type:null,location:{address:null,longitude:null,latitude:null},imagePath:null},
			   freeManagers:[],
			    error: null,
			   newUser:{username:null, password:null, name:null, surname:null, gender:null, date:null, role: null, restaurant:{id:null},isBlocked:null},
				image:null,
				selectedManager:null,
				newID:null,
				chosenManager:{username:null, password:null, name:null, surname:null, gender:null, date:null, role: null, restaurant:{id:null},isBlocked:null},
				testPic:null,
				placesAutocomplete:null,
				houseNumber:null
				
				
				
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Dodaj restoran</h1>
	<p v-if="error">
      <div style="color:red">{{ error }}</div>
  </p>
	<label>Naziv:</label>
	<input type="text" v-model="newRestaurant.name">
	<br><br>
	<label>Unesite ulicu:</label>
	<input type="search" id="searchedAddress" style="height:30px"/>
	<br><br>
	Ulica:<input type="text"  id="street" > Broj:<input type="text" v-model="houseNumber"><br><br>
	Mesto:<input type="text"  id="town"> Poštanski broj:<input type="text" id="postCode"><br><br>
	Geografska širina:<input type="text" id="ltd" style="width:50px"> Geografska dužina:<input type="text" id="lng"  style="width:50px"><br><br>
	<br>
	<label>Tip:</label>
	<select v-model ="newRestaurant.type">
    <option value="Primorski">Primorski</option>
    <option value="Italijanski">Italijanski</option>
    <option value="Kineski">Kineski</option>
  	</select><br><br>
	<label>Slika:</label>
	<input type="file" v-on:change="addImage" v-model="testPic">
	<br><br>
	<label v-if="freeManagers.length!=0">Raspoloživi menadžeri:</label>
	<select v-if="freeManagers.length!=0" v-model="selectedManager">
	<option v-for="m in freeManagers">
    {{ m.username }}
  </option>
	</select>
	<div v-else>
	<h3>Dodavanje menadžera restorana</h3><br>
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
		addRestaurant : function(){
			
			if(!document.querySelector('#street').value || !this.houseNumber || !document.querySelector('#town').value || !document.querySelector('#postCode').value || !document.querySelector('#lng').value || !document.querySelector('#ltd').value || !this.newRestaurant.name || !this.newRestaurant.type || !this.image){
				this.error="Nisu sva polja popunjena.";
				return;
			}
			
			
			
			this.newRestaurant.location.address=document.querySelector('#street').value+" "+this.houseNumber+", "+document.querySelector('#town').value+", "+document.querySelector('#postCode').value; 
			this.newRestaurant.location.longitude=document.querySelector('#lng').value;
			this.newRestaurant.location.latitude=document.querySelector('#ltd').value;
			
			this.newRestaurant.imagePath=this.image;
			var isNew=false;
		if(this.newUser.username)	{isNew=true;
										this.newUser.restaurant.id=this.newID;
											}
		else{
			
			if(!this.selectedManager){
				this.error="Niste odabrali menadžera.";
				return;
			}
			
			for(let i=0;i<this.freeManagers.length;i++){
				if(this.freeManagers[i].username==this.selectedManager){
					this.chosenManager.username=this.freeManagers[i].username;
					this.chosenManager.password=this.freeManagers[i].password;
					this.chosenManager.name=this.freeManagers[i].name;
					this.chosenManager.surname=this.freeManagers[i].surname;
					this.chosenManager.gender=this.freeManagers[i].gender;
					this.chosenManager.date=this.freeManagers[i].date;
					this.chosenManager.role=this.freeManagers[i].role;
					this.chosenManager.isBlocked=this.freeManagers[i].isBlocked;
					this.chosenManager.restaurant.id=this.newID;
				}
			}
		}
		
		if(isNew && (!this.newUser.username || !this.newUser.password || !this.newUser.name || !this.newUser.surname || !this.newUser.gender || !this.newUser.date)){
				this.error="Nisu sva polja popunjena.";
				return;
			}
		
		if(isNew){
			axios
			.post('/rest/username/exists',this.newUser)
			.then(response=>{
				if(response.data==="USERNAMEERROR"){
					 this.error="Korisničko ime je zauzeto.";
				return;
						}
						
						
						axios
		.post('rest/restaurant/add',this.newRestaurant)
		.then(response=>{
				if(!isNew){
					axios
					.post('rest/manager/addRestaurant',this.chosenManager)
					.then(response=>{
						toast("Uspešno kreiran restoran.");
						this.newRestaurant={name:null,type:null,location:{address:null},imagePath:null};
						this.selectedManager=null;
						this.testPic=null;
						this.error=null;
						axios
		.get('/rest/user/freeManagers')
		.then(response => (this.freeManagers=response.data))
		
	axios
		.get('/rest/manager/resId')
		.then(response=>(this.newID=response.data))	
					})
				}else{
					axios
					.post('rest/manager/addManagerWithRestaurant',this.newUser)
					.then(response=>{
						
						toast("Uspešno kreiran restoran.");
						this.newRestaurant={name:null,type:null,location:{address:null},imagePath:null};
						this.newUser={username:null, password:null, name:null, surname:null, gender:null, date:null, role: null, restaurant:{id:null},isBlocked:null};
						this.testPic=null;
						this.error=null;
						axios
		.get('/rest/user/freeManagers')
		.then(response => (this.freeManagers=response.data))
		
	axios
		.get('/rest/manager/resId')
		.then(response=>(this.newID=response.data))	
					
					
					})
				}
		})	
						
						
						
						
						
						
						
			})
			
		}else{
			
			
			
			axios
		.post('rest/restaurant/add',this.newRestaurant)
		.then(response=>{
				
					axios
					.post('rest/manager/addRestaurant',this.chosenManager)
					.then(response=>{
						toast("Uspešno kreiran restoran.");
						this.newRestaurant={name:null,type:null,location:{address:null},imagePath:null};
						this.selectedManager=null;
						this.testPic=null;
						this.error=null;
						axios
		.get('/rest/user/freeManagers')
		.then(response => (this.freeManagers=response.data))
		
	axios
		.get('/rest/manager/resId')
		.then(response=>(this.newID=response.data))	
					})
				
		})	
						
			
			
			
		}
	
	}
	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))

	 axios
		.get('/rest/user/freeManagers')
		.then(response => (this.freeManagers=response.data))
		
	axios
		.get('/rest/manager/resId')
		.then(response=>(this.newID=response.data))	
		
	  this.placesAutocomplete = places({
      appId: 'plQ4P1ZY8JUZ',
      apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
      container: document.querySelector('#searchedAddress'),
      templates: {
        value: function(suggestion) {
          return suggestion.name;
        }
      }
    }).configure({
	countries: ['rs'],
      type: 'address'
    });
    this.placesAutocomplete.on('change', function resultSelected(e) {
	document.querySelector('#street').value = e.suggestion.value || '';
	document.querySelector('#town').value = e.suggestion.city || '';
	document.querySelector('#postCode').value = e.suggestion.postcode || '';
	document.querySelector('#lng').value = e.suggestion.latlng.lng || '';
	document.querySelector('#ltd').value = e.suggestion.latlng.lat || '';
    });
    },
});