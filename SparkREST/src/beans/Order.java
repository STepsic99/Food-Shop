package beans;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

public class Order {
	private String id;
	private ArrayList<Article>articles;
	private Restaurant restaurant;
	private Date dateTime;
	private double price;
	private Shopper shopper;
	private OrderStatus status;
	
	public Order() {
		super();
	}

	public Order(String id, ArrayList<Article> articles, Restaurant restaurant, Date dateTime, double price,
			OrderStatus status, Shopper shopper) {
		super();
		this.id = id;
		this.articles = articles;
		this.restaurant = restaurant;
		this.dateTime = dateTime;
		this.price = price;
		this.status = status;
		this.shopper = shopper;
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
		/*SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-DD'T'HH:mm:ss.sss'Z'");
		try {
			this.dateTime=simpleDateFormat.parse(dateTime.toString());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
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

	public Shopper getShopper() {
		return shopper;
	}

	public void setShopper(Shopper shopper) {
		this.shopper = shopper;
	}
	
	
	
	
	
	
}
