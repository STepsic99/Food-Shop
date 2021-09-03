package beans;

import java.util.ArrayList;
import java.util.Date;

public class Shopper extends User{
	private ArrayList<Order>orders;
	private Cart cart;
	private double points;
	private ShopperType type;
	private ArrayList<Date>cancelDates=new ArrayList<Date>();
	private boolean isShady=false;
	
	public Shopper() {
		super();
	}

	public Shopper(String username, String name, String surname) {
		super(username,name,surname);
	}
	
	public Shopper(ArrayList<Order> orders, Cart cart, double points, ShopperType type) {
		super();
		this.orders = orders;
		this.cart = cart;
		this.points = points;
		this.type = type;
	}

	public Shopper(ArrayList<Order> orders, Cart cart, double points, ShopperType type, ArrayList<Date> cancelDates,
			boolean isShady) {
		super();
		this.orders = orders;
		this.cart = cart;
		this.points = points;
		this.type = type;
		this.cancelDates = cancelDates;
		this.isShady = isShady;
	}

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	public ShopperType getType() {
		return type;
	}

	public void setType(ShopperType type) {
		this.type = type;
	}

	public ArrayList<Date> getCancelDates() {
		return cancelDates;
	}

	public void setCancelDates(ArrayList<Date> cancelDates) {
		this.cancelDates = cancelDates;
	}

	public boolean isShady() {
		return isShady;
	}

	public void setShady(boolean isShady) {
		this.isShady = isShady;
	}
	
	
}
