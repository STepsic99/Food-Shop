package beans;


import java.util.ArrayList;

public class Restaurant {

	private String id;
	private String name;
	private String type;
	private ArrayList<Article>articles;
	private RestaurantStatus status;
	private Location location;
	private String imagePath;
	private double averageGrade;
	
	public Restaurant() {
		
	}
	
	
	

	public Restaurant(String id, String name, String type) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
	}




	public Restaurant(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	


	public Restaurant(String id) {
		super();
		this.id = id;
	}




	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
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

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}



	public double getAverageGrade() {
		return averageGrade;
	}



	public void setAverageGrade(double averageGrade) {
		this.averageGrade = averageGrade;
	}
	
	
	
	
	
}
