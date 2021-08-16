package beans;

import java.util.ArrayList;

public class Shopper extends User{
	private ArrayList<Order>orders;
	private Cart cart;
	private double points;
	private ShopperType type;
	
	public Shopper() {
		super();
	}

	public Shopper(ArrayList<Order> orders, Cart cart, double points, ShopperType type) {
		super();
		this.orders = orders;
		this.cart = cart;
		this.points = points;
		this.type = type;
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
	
	
}
