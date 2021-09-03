package services;

import beans.Administrator;
import beans.Administrators;
import beans.User;

public class AdministratorService {
	
	private Administrators administrators=new Administrators();
	
	public Administrator getAdministrator(String username) {
		return this.administrators.getAdministrator(username);
	}
	
	public void editAdministrator(User user) {
		this.administrators.editAdministrator(user);
	}
}
