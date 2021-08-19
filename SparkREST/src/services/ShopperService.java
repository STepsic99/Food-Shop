package services;

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
}
