package services;

import java.util.ArrayList;
import java.util.HashMap;

import beans.Article;
import beans.Orders;
import beans.Shopper;

public class OrderService {
	private Orders orders=new Orders();
	
	public void createOrders(HashMap<String,ArrayList<Article>>orderMap, Shopper shopper) {
		this.orders.createOrders(orderMap, shopper);
	}
}
