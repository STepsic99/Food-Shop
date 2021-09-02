package services;

import beans.Administrator;
import beans.Administrators;

public class AdministratorService {
	
	private Administrators administrators=new Administrators();
	
	public Administrator getAdministrator(String username) {
		return this.administrators.getAdministrator(username);
	}
}
