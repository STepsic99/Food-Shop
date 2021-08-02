package beans;

import java.awt.image.BufferedImage;
import java.util.ArrayList;

public class Restaurant {

	private String name;
	private String type;
	private ArrayList<Article>articles;
	private RestaurantStatus status;
	private Location location;
	private BufferedImage image;
	
	public Restaurant() {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ArrayList<Article> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}

	public RestaurantStatus getStatus() {
		return status;
	}

	public void setStatus(RestaurantStatus status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public BufferedImage getImage() {
		return image;
	}

	public void setImage(BufferedImage image) {
		this.image = image;
	}
	
	
	
}
