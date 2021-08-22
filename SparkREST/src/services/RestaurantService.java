package services;

import java.util.Collection;

import beans.Restaurant;
import beans.Restaurants;

public class RestaurantService {
	private Restaurants restaurants=new Restaurants();
	
	public Collection<Restaurant> getRestaurants() {
		return this.restaurants.getRestaurantList();
	}
	
	public Restaurant getRestaurant(String id) {
		return this.restaurants.getRestaurant(id);
	}
}
