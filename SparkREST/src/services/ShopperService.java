package services;

import beans.Shopper;
import beans.Shoppers;

public class ShopperService {
	private Shoppers shoppers=new Shoppers();
	
	public Shopper getShopper(String username) {
		return this.shoppers.getShopper(username);
	}
	
	public void addShopper(Shopper shopper) {
		 this.shoppers.addShopper(shopper);
	}
	
	public Boolean IsThereEmptyField(Shopper shopper) {
		return this.shoppers.IsThereEmptyField(shopper);
	}
}
