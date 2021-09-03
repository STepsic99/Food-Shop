package beans;

public class Manager extends User{
	private Restaurant restaurant;
	private boolean isBlocked;

	public Manager(User user) {
		super(user.username,user.password,user.name,user.surname,user.gender,user.date,user.role);
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public boolean isBlocked() {
		return isBlocked;
	}

	public void setBlocked(boolean isBlocked) {
		this.isBlocked = isBlocked;
	}
	
	
}
