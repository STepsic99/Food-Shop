package services;

import java.util.ArrayList;

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
	
	public void editPoints(Shopper newShopper) {
		this.shoppers.editPoints(newShopper);
	}
	
	public ArrayList<Shopper> getAll(){
		return this.shoppers.getAll();
	}
	
	public void updateCancellationTime(Shopper newShopper) {
		this.shoppers.updateCancellationTime(newShopper);
	}
	
	public ArrayList<Shopper> getShadyShoppers(){
		return this.shoppers.getShadyShoppers();
	}
	
	public void blockShopper(String username) {
		this.shoppers.blockShopper(username);
	}
}
