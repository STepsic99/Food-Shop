package beans;

import java.util.Date;

public class User {
	protected String username;
	protected String password;
	protected String name;
	protected String surname;
	protected String gender;
	protected Date date;
	protected Role role;
	
	
	public User() {
		super();
		
	}
	
	
	
	public User(String username) {
		super();
		this.username = username;
	}



	public User(String username, String name, String surname) {
		super();
		this.username = username;
		this.name = name;
		this.surname = surname;
	}



	public User(String username, String password, String name, String surname, String gender, Date date, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.date = date;
		this.role= role;
	}
	
	


	public User(String username, String password, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.role = role;
	}


	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	} 
	
	
	
}
