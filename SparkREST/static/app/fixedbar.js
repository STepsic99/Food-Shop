Vue.component("fixedbar", {
	data: function () {
		    return {
			  user: {},
			   error: null,
			   selectedLink: 0,
			   visibleLogin: true,
			   visibleLogout: false
		    }
	},
	template: ` 	
<div class="topmenu">
<ul>
  <li><a href="/" v-bind:class="{active : this.selectedLink===0}" v-on:click="openStarterPage">Početna</a></li>
  <li v-if="visibleLogout  && user.role=='MANAGER'" v-on:click="showManagerRestaurant"><a v-bind:class="{active : this.selectedLink===8}" href="/managerRestaurant">Moj Restoran</a></li>
  <li v-if="visibleLogout  && user.role=='MANAGER'" v-on:click="showManagerOrders"><a v-bind:class="{active : this.selectedLink===9}" href="/managerOrders">Porudžbine restorana</a></li>
  <li v-if="visibleLogout  && user.role=='MANAGER'" v-on:click="showManagerShoppers"><a v-bind:class="{active : this.selectedLink===10}" href="/managerShoppers">Kupci restorana</a></li>
  <li v-if="visibleLogout  && user.role=='DELIVERER'" v-on:click="showDelivererOrders"><a v-bind:class="{active : this.selectedLink===6}" href="/delivererOrder">Moje porudžbine</a></li>
  <li v-if="visibleLogout  && user.role=='DELIVERER'" v-on:click="showUnassignedOrders"><a v-bind:class="{active : this.selectedLink===7}" href="/unassignedOrder">Nedodeljene porudžbine</a></li>
  <li v-if="visibleLogout  && user.role=='SHOPPER'" v-on:click="showOrders"><a v-bind:class="{active : this.selectedLink===5}" href="/myOrder">Porudžbine</a></li>
  <li id="points" v-if="visibleLogout  && user.role=='SHOPPER'"><a style="pointer-events: none;cursor: default; color:red" href="/myOrder">&nbsp;&nbsp;&nbsp;&nbsp;Rang : {{this.user.type.name}}, {{this.user.points.toFixed(2)}} bodova
	<span v-if="user.type.name!=='Zlato'">({{this.user.type.requiredPoints.toFixed(2)}} bodova do sledećeg)</span>
</a></li>
  <li v-if="visibleLogin" style="float:right" v-on:click="openRegistration"><a href="/r" v-bind:class="{active : this.selectedLink===2}">Registruj se</a></li>
  <li v-if="visibleLogin" style="float:right" v-on:click="openLogin"><a  v-bind:class="{active : this.selectedLink===1}" href="/l">Prijavi se</a></li>
  <li v-if="visibleLogout" style="float:right" v-on:click="logOut"><a  href="/">Odjavi se</a></li>
  <li v-if="visibleLogout" style="float:right" v-on:click="checkProfile"><a v-bind:class="{active : this.selectedLink===3}" href="/p">Profil</a></li>
 <li v-if="visibleLogout && user.role=='SHOPPER'" style="float:right;" class="probna" v-on:click="showCart"><a v-bind:class="{active : this.selectedLink===4}" href="/cart">
 <span class="icon-button__badge">{{this.user.cart.numberOfItems}}</span>
 </a></li>
<li v-if="visibleLogout && user.role=='MANAGER'" style="float:right" v-on:click="showManagerRequests"><a v-bind:class="{active : this.selectedLink===11}" href="/managerRequests">Zahtevi</a></li>
</ul>
</div>		  
`
	, 
	methods : {
		openRegistration : function() {
			event.preventDefault();
			this.selectedLink=2;
    		router.push(`/r`);
    	},
		openLogin : function() {
			event.preventDefault();
			this.selectedLink=1;
    		router.push(`/l`);
    	},
		openStarterPage : function() {
			event.preventDefault();
			this.selectedLink=0;
    		router.push(`/`);
    	},
		logOut : function(){
			axios.get('/rest/user/logout')
			this.visibleLogout= false
			this.visibleLogin= true	
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
		checkProfile : function(){
			event.preventDefault();
			this.selectedLink=3;
			router.push(`/p`);
		},
		showCart : function(){
		event.preventDefault();
		this.selectedLink=4;
		router.push(`/cart`);
		},
		showOrders : function(){
			event.preventDefault();
			this.selectedLink=5;
			router.push(`/myOrder`);
		},
		showDelivererOrders : function(){
			event.preventDefault();
			this.selectedLink=6;
			router.push(`/delivererOrder`);
		},
		showUnassignedOrders : function(){
			event.preventDefault();
			this.selectedLink=7;
			router.push(`/unassignedOrder`);
		},
		showManagerRestaurant : function(){
			event.preventDefault();
			this.selectedLink=8;
			router.push(`/managerRestaurant`);
		},
		showManagerOrders : function(){
			event.preventDefault();
			this.selectedLink=9;
			router.push(`/managerOrders`);
		},
		showManagerShoppers : function(){
			event.preventDefault();
			this.selectedLink=10;
			router.push(`/managerShoppers`);
		},
		showManagerRequests : function(){
			event.preventDefault();
			this.selectedLink=11;
			router.push(`/managerRequests`);
		}
	},
	mounted () {
		axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))

       this.$root.$on('prijavljivanje', (text) => {
        axios
          .get('/rest/user/getUser')
          .then(response => {this.user=response.data
			this.selectedLink = text;
			this.visibleLogin = false;
			this.visibleLogout = true;
			})
			
		});
		
		 this.$root.$on('promenaKorpe', (text) => {
			this.user.cart.numberOfItems += parseInt(text);
		});
		
		this.$root.$on('removeItem', (text) => {
			this.user.cart.numberOfItems -= parseInt(text);
		});
		
		this.$root.$on('counterChangeFirst', (text) => {
			//this.user.cart.numberOfItems -= parseInt(text);
			axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
		});
		
		this.$root.$on('counterChangeSecond', (text) => {
			this.user.cart.numberOfItems += parseInt(text);
		});
		
		this.$root.$on('counterZero', (text) => {
			this.user.cart.numberOfItems = parseInt(text);
			axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
		});
		
		
    },
});