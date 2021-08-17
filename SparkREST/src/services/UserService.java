package services;

import beans.Restaurants;
import beans.User;
import beans.Users;

public class UserService {
	private Users users=new Users();
	
	public User userExists(String username, String password) {
		return this.users.userExists(username, password);
	}
	
	public void addUser(User newUser) {
		this.users.addUser(newUser);
	}
	
	public Boolean usernameExists(String username) {
		return this.users.usernameExists(username);
	}
}
