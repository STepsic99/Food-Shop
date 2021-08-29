package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import beans.Article;
import beans.Order;
import beans.Orders;
import beans.Shopper;

public class OrderService {
	private Orders orders=new Orders();
	
	public double createOrders(HashMap<String,ArrayList<Article>>orderMap, Shopper shopper) {
		return this.orders.createOrders(orderMap, shopper);
	}
	
	public Collection<Order> getOrdersByUser(String username){
		return this.orders.getOrdersByUser(username);
	}
	
	public void changeOrder(Order newOrder) {
		this.orders.changeOrder(newOrder);
	}
}
