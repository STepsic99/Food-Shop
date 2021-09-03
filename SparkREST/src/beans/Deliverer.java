package beans;

import java.util.ArrayList;

public class Deliverer extends User{
	private ArrayList<Order>orders=new ArrayList<Order>();
	private boolean isBlocked;

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}

	public boolean isBlocked() {
		return isBlocked;
	}

	public void setBlocked(boolean isBlocked) {
		this.isBlocked = isBlocked;
	}
	
	
}
