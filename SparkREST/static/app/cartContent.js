Vue.component("cartContent", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null, "cart":{discountPrice:8}},
			   
			   backup:[]
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);margin: auto;padding: 10px 12px 25px 45px; max-width: 500px;">
	<h1>Sadržaj korpe</h1>
	<p>*srebrni korisnici imaju popust 3%, a zlatni 5%</p>
	<table style="margin-bottom:50px">
	<tr v-for="a in user.cart.articles">
	<td> 
	<img  v-bind:src="a.image" alt="Artikl" width="200" height="180"/>
	</td>
	<td style="display: block;
  vertical-align: top; height: 220px; padding-left:60px" >
	<h2>{{a.name}}</h2>
	<p style="font-size:18px">{{a.price}} RSD </p><br>
	Količina:&nbsp;
	<input type="number" style="width:60px" size="33" min="1" v-on:keydown="proba" v-on:paste="proba" v-model="a.counter" v-on:change="changeQuantity(a)"><br>
	<button style="margin-top:35px" v-on:click="removeArticle(a)">Izbaci artikl iz korpe</button>
	</td>
	</tr>
	</table>
	<span style="font-size:30px; text-align: left;">Ukupna cena: {{user.cart.discountPrice.toFixed(2)}}</span>
    <button style="font-size:25px;margin-left:100px;margin-right:45px" v-on:click="makeOrder">Poruči</button>
</div>		  
`
	, 
	methods : {
		proba : function(e){
			 if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      )) {
        e.preventDefault();
    }
		},
		isLogged : function(user){
			this.user=user
			if(this.user===null){
			this.visibleLogout= false
			this.visibleLogin= true	
		}else{
			this.visibleLogin = false;
			this.visibleLogout = true;
			for (var i = 0; i < this.user.cart.articles.length; i++){
					this.backup.push(this.user.cart.articles[i].counter);
				}
		}
		},
		removeArticle : function(chosenArticle){
		axios
			.post('/rest/cart/removeArticle', chosenArticle)
			.then(response => {
				axios
		        .get('/rest/user/getUser')
		        .then(response => (this.isLogged(response.data)))
				this.$root.$emit('removeItem', chosenArticle.counter);
			})
		
		},
		changeQuantity : function(chosenArticle){
				axios
			.post('/rest/cart/changeArticle', chosenArticle)
			.then(response => {
				this.$root.$emit('counterChangeFirst', 1);
			axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))
			})
			
		},
		
		makeOrder : function(){
			axios
			.post('/rest/order/makeOrder', this.user.cart)	
			.then(response => {this.user.cart.articles=[]
								this.user.cart.price=0;
								this.user.cart.discountPrice=0;
								this.$root.$emit('counterZero', 0);
								toast('Uspešno kreirana porudžbina')
			})
		}
	},
	mounted () {
	 axios
          .get('/rest/user/getUser')
          .then(response => (this.isLogged(response.data)))	
       
    },
});