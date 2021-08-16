package beans;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

public class Order {
	private String id;
	private ArrayList<Article>articles;
	private Restaurant restaurant;
	private Date dateTime;
	private double price;
	//Buyer
	private OrderStatus status;
	
	public Order() {
		super();
	}

	public Order(String id, ArrayList<Article> articles, Restaurant restaurant, Date dateTime, double price,
			OrderStatus status) {
		super();
		this.id = id;
		this.articles = articles;
		this.restaurant = restaurant;
		this.dateTime = dateTime;
		this.price = price;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ArrayList<Article> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	
	
	
	
	
	
}
