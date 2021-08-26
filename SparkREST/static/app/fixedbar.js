Vue.component("fixedbar", {
	data: function () {
		    return {
			  user: null,
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
  <li v-if="visibleLogin" style="float:right" v-on:click="openRegistration"><a href="/r" v-bind:class="{active : this.selectedLink===2}">Registruj se</a></li>
  <li v-if="visibleLogin" style="float:right" v-on:click="openLogin"><a  v-bind:class="{active : this.selectedLink===1}" href="/l">Prijavi se</a></li>
  <li v-if="visibleLogout" style="float:right" v-on:click="logOut"><a  href="/">Odjavi se</a></li>
  <li v-if="visibleLogout" style="float:right" v-on:click="checkProfile"><a v-bind:class="{active : this.selectedLink===3}" href="/p">Profil</a></li>
 <li v-if="visibleLogout" style="float:right;" class="probna" v-on:click="showCart"><a v-bind:class="{active : this.selectedLink===4}" href="/p">
 <span class="icon-button__badge">{{this.user.cart.numberOfItems}}</span>
 </a></li>
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
		}
	},
	mounted () {
       this.$root.$on('prijavljivanje', (text) => {
        axios
          .get('/rest/user/getUser')
          .then(response => (this.user=response.data))
			this.selectedLink = text;
			this.visibleLogin = false;
			this.visibleLogout = true;
		});
		
		 this.$root.$on('promenaKorpe', (text) => {
			this.user.cart.numberOfItems += parseInt(text);
		});
		
		this.$root.$on('removeItem', (text) => {
			this.user.cart.numberOfItems -= parseInt(text);
		});
		
		this.$root.$on('counterChangeFirst', (text) => {
			this.user.cart.numberOfItems -= parseInt(text);
		});
		
		this.$root.$on('counterChangeSecond', (text) => {
			this.user.cart.numberOfItems += parseInt(text);
		});
		
		axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
    },
});