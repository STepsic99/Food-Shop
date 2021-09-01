package beans;

public class Comment {
	private String id;
	private Shopper shopper;
	private Restaurant restaurant;
	private String content;
	private int grade;
	private CommentStatus status;
	
	
	public Comment(String id, Shopper shopper, Restaurant restaurant, String content, int grade, CommentStatus status) {
		super();
		this.id = id;
		this.shopper = shopper;
		this.restaurant = restaurant;
		this.content = content;
		this.grade = grade;
		this.status = status;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public Shopper getShopper() {
		return shopper;
	}


	public void setShopper(Shopper shopper) {
		this.shopper = shopper;
	}


	public Restaurant getRestaurant() {
		return restaurant;
	}


	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public int getGrade() {
		return grade;
	}


	public void setGrade(int grade) {
		this.grade = grade;
	}


	public CommentStatus getStatus() {
		return status;
	}


	public void setStatus(CommentStatus status) {
		this.status = status;
	}
	
	
	
}
