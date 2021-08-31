package beans;

import java.util.ArrayList;

public class Deliverer extends User{
	private ArrayList<Order>orders=new ArrayList<Order>();

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}
	
}
