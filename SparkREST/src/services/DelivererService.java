package services;

import java.util.ArrayList;

import beans.Deliverer;
import beans.Deliverers;
import beans.Order;
import beans.User;


public class DelivererService {
	private Deliverers deliverers=new Deliverers();
	
	public Deliverer getDeliverer(String username) {
		return this.deliverers.getDeliverer(username);
	}
	
	public void addOrder(String username, Order order) {
		this.deliverers.addOrder(username, order);
	}
	
	public void changeOrder(String username,Order newOrder) {
		this.deliverers.changeOrder(username, newOrder);
	}
	
	public ArrayList<Deliverer> getAll(){
		return this.deliverers.getAll();
	}
	
	public void blockDeliverer(String username) {
		this.deliverers.blockDeliverer(username);
	}
	
	public void editDeliverer(User user) {
		this.deliverers.editDeliverer(user);
	}
	
	public void addDeliverer(Deliverer deliverer) {
		this.deliverers.addDeliverer(deliverer);
	}
}
