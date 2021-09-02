Vue.component("adminUsers", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   isEditing: false,
			   isViewing: true,
			  users:[],
			  searchedName: null,
			  searchedUsername: null,
			  searchedSurname: null,
			  showFilters:false,
			  status:"SVI",
			  shopperTicked:true,
			  managerTicked:true,
			  delivererTicked:true,
			  bronzeTicked:true,
			  silverTicked:true,
			  goldTicked:true,	
			  sortBy:1,
			  sortInOrder:1	
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 50px 25px 45px; max-width: 500px;">
	<h1>Registrovani korisnici</h1>
	
		<label>Ime korisnika:</label>
  <input type="text" v-model="searchedName"><br><br>
  <label>Prezime korisnika:</label>
  <input type="text" v-model="searchedSurname"><br><br>
  <label>Korisničko ime:</label>
  <input type="text" v-model="searchedUsername"><br><br>
<div v-if="showFilters">
	<p>Sortiraj po:
	<select style="margin-left:3%" v-model="sortBy">
    <option value="1">Imenu</option>
    <option value="2">Prezimenu</option>
    <option value="3">Korisničkom imenu</option>
    <option value="4">Broju sakupljenih bodova</option>
  	</select>
	<select style="margin-left:3%" v-model="sortInOrder">
    <option value="1">Rastućem</option>
    <option value="2">Opadajućem</option>
  	</select><br><br>
 Uloga:
<input type="checkbox" value="Kupac" v-model="shopperTicked">
  <label> Kupac</label>
  <input type="checkbox" value="Menadžer" v-model="managerTicked">
  <label> Menadžer</label>
  <input type="checkbox" value="Dostavljač" v-model="delivererTicked">
  <label> Dostavljač</label><br><br>
Rang kupca:
<input type="checkbox" value="Bronza" v-model="bronzeTicked">
  <label> Bronza</label>
  <input type="checkbox" value="Srebro" v-model="silverTicked">
  <label> Srebro</label>
  <input type="checkbox" value="Zlato" v-model="goldTicked">
  <label> Zlato</label><br><br>
	</p>
	</div>
	     <p style="text-align:left;"><img src="/../resources/filter.png" style="position:relative;top:5px;right:15px" width="5%" height="2%"><a href="" v-on:click="openFilters">Filteri</a></p>
    <input type = "submit" v-on:click = "searchBy" value = "PRETRAŽI"><br><br>

	
	<table style="margin-left: auto;
  margin-right: auto;width:500px;margin-top:4em">
	<tr v-for="u in users">
	<td style="padding-bottom: 4em;text-align:left">Korisničko ime: {{u.username}}<br>
	Ime: {{u.name}}<br>
	Prezime: {{u.surname}}<br>
	<span v-if="u.role=='Kupac'">Poeni: {{u.points.toFixed(2)}}</span>
	<span v-if="u.role=='Menadžer'">Restoran: {{u.restaurant.name}}</span>
	</td>
	<td style="padding-bottom: 4em;text-align:left">
	Datum rođenja: {{u.date.getDate()}}.{{u.date.getMonth()+1}}.{{u.date.getFullYear()}}<br>
	Pol: {{u.gender}}<br>
	Uloga: {{u.role}}<br>
	<span v-if="u.role=='Kupac'">Tip: {{u.type.name}}</span></td>
	</td>
	</tr>
	</table>
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
	searchBy : function(){
			event.preventDefault();
			
			  axios
		.get('/rest/users/registredUsers')
		.then(response=>{this.users=response.data
			for(let i=0;i<this.users.length;i++){
				this.users[i].date=new Date(this.users[i].date)
				switch(this.users[i].role){
					case 'SHOPPER':
						this.users[i].role='Kupac';
						break;
					case 'MANAGER':
						this.users[i].role='Menadžer';
						break;
					case 'ADMINISTRATOR':
						this.users[i].role='Administrator';
						break;		
					case 'DELIVERER':
						this.users[i].role='Dostavljač';
						break;			
				}
				switch(this.users[i].gender){
					case 'Male':
						this.users[i].gender='Muški';
						break;
					case 'Female':
						this.users[i].gender='Ženski';
						break;
					case 'Rather not tell':
						this.users[i].gender='Nije naveden';
						break;		
				}	
			}
			
			this.searchByAgain(response.data);
		})
		},
		searchByAgain : function(res){
			this.users = res
			var control=0
			while(control===0){
				control=1;
			var	userLength = this.users.length;
			for (var i = 0; i < userLength; i++) {
				
    					if(this.searchedName && !this.users[i].name.toLowerCase().includes(this.searchedName.toLowerCase())){
								this.users.splice(i,1);
								control=0;
								break;	
									} else if(this.searchedSurname && !this.users[i].surname.toLowerCase().includes(this.searchedSurname.toLowerCase())){
											this.users.splice(i,1);
											control=0;
											break;	
									}else if(this.searchedUsername && !this.users[i].username.toLowerCase().includes(this.searchedUsername.toLowerCase())){
											this.users.splice(i,1);
											control=0;
											break;	
									}else if(!this.bronzeTicked && this.users[i].role=='Kupac' && this.users[i].type.name==="Bronza"){
										this.users.splice(i,1);
											control=0;
											break;
									}else if(!this.silverTicked && this.users[i].role=='Kupac' && this.users[i].type.name==="Srebro"){
										this.users.splice(i,1);
											control=0;
											break;
									}else if(!this.goldTicked && this.users[i].role=='Kupac' && this.users[i].type.name==="Zlato"){
										this.users.splice(i,1);
											control=0;
											break;
									}else if(!this.shopperTicked && this.users[i].role=='Kupac'){
										this.users.splice(i,1);
											control=0;
											break;
									}else if(!this.managerTicked && this.users[i].role=='Menadžer'){
										this.users.splice(i,1);
											control=0;
											break;
									}else if(!this.delivererTicked && this.users[i].role=='Dostavljač'){
										this.users.splice(i,1);
											control=0;
											break;
									}
								
												
											
							}
						}
						if(this.showFilters && this.sortBy=="1" && this.sortInOrder=="1"){
										this.users.sort(function (a, b) {
											 return a.name.replace(/\s+/g, '').localeCompare(b.name.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy=="1" && this.sortInOrder=="2"){
										this.users.sort(function (a, b) {
											  return b.name.replace(/\s+/g, '').localeCompare(a.name.replace(/\s+/g, ''))
												});
									}  else if(this.showFilters && this.sortBy==2 && this.sortInOrder==1){
										this.users.sort(function (a, b) {
											  return a.surname.replace(/\s+/g, '').localeCompare(b.surname.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy=="2" && this.sortInOrder=="2"){
										this.users.sort(function (a, b) {
											  return b.surname.replace(/\s+/g, '').localeCompare(a.surname.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy==3 && this.sortInOrder==1){
										this.users.sort(function (a, b) {
											  return a.username.replace(/\s+/g, '').localeCompare(b.username.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy=="3" && this.sortInOrder=="2"){
										this.users.sort(function (a, b) {
											  return b.username.replace(/\s+/g, '').localeCompare(a.username.replace(/\s+/g, ''))
												});
									} else if(this.showFilters && this.sortBy==4 && this.sortInOrder==1){
										this.users.sort(function (a, b) {
											  return a.points - b.points;
												});
									} else if(this.showFilters && this.sortBy=="4" && this.sortInOrder=="2"){
										this.users.sort(function (a, b) {
											 return b.points - a.points;
												});
									}
			
		},
		openFilters : function(){
			event.preventDefault();
			this.showFilters=!this.showFilters;
		}
	},
	mounted () {
       axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))

	  axios
		.get('/rest/users/registredUsers')
		.then(response=>{this.users=response.data
			for(let i=0;i<this.users.length;i++){
				this.users[i].date=new Date(this.users[i].date)
				switch(this.users[i].role){
					case 'SHOPPER':
						this.users[i].role='Kupac';
						break;
					case 'MANAGER':
						this.users[i].role='Menadžer';
						break;
					case 'ADMINISTRATOR':
						this.users[i].role='Administrator';
						break;		
					case 'DELIVERER':
						this.users[i].role='Dostavljač';
						break;			
				}
				switch(this.users[i].gender){
					case 'Male':
						this.users[i].gender='Muški';
						break;
					case 'Female':
						this.users[i].gender='Ženski';
						break;
					case 'Rather not tell':
						this.users[i].gender='Nije naveden';
						break;		
				}	
			}
		
		
		})
    },
});