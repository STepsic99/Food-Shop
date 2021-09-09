package services;

import java.util.Collection;

import beans.Article;
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
	
	public void addRestaurant(Restaurant restaurant) {
		this.restaurants.addRestaurant(restaurant);
	}
	
	public void addArticle(Article article,String id) {
		this.restaurants.addArticle(article, id);
	}
	
	public void changeArticle(Article article,String id) {
		this.restaurants.changeArticle(article, id);
	}
}
