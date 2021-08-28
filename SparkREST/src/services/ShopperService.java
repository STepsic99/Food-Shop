package services;

import beans.Article;
import beans.Shopper;
import beans.Shoppers;
import beans.User;

public class ShopperService {
	private Shoppers shoppers=new Shoppers();
	
	public Shopper getShopper(String username) {
		return this.shoppers.getShopper(username);
	}
	
	public void addShopper(Shopper shopper) {
		 this.shoppers.addShopper(shopper);
	}
	
	public Boolean isThereEmptyField(Shopper shopper) {
		return this.shoppers.isThereEmptyField(shopper);
	}
	
	public void editShopper(User user) {
		this.shoppers.editShopper(user);
	}
	
	public void addToCart(String username,Article article) {
		this.shoppers.addToCart(username, article);
	}
	
	public void removeFromCart(String username,Article article) {
		this.shoppers.removeFromCart(username, article);
	}
	
	public void changeInCart(String username,Article article) {
		this.shoppers.changeInCart(username, article);
	}
	
	public void clearCart(Shopper shopper) {
		this.shoppers.clearCart(shopper);
	}
}
