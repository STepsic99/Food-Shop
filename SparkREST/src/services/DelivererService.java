package services;

import beans.Deliverer;
import beans.Deliverers;


public class DelivererService {
	private Deliverers deliverers=new Deliverers();
	
	public Deliverer getDeliverer(String username) {
		return this.deliverers.getDeliverer(username);
	}
}
