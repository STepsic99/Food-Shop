package services;

import java.util.ArrayList;

import beans.Manager;
import beans.Managers;
import beans.User;

public class ManagerService {
	private Managers managers=new Managers();
	
	public Manager getManager(String username) {
		return this.managers.getManager(username);
	}
	
	public ArrayList<Manager> getAll(){
		return this.managers.getAll();
	}
	
	public void blockManager(String username) {
		this.managers.blockManager(username);
	}
	
	public void editManager(User user) {
		this.managers.editManager(user);
	}
	
	public void addManager(Manager manager) {
		this.managers.addManager(manager);
	}
	
	public ArrayList<Manager> getFreeManagers(){
		return this.managers.getFreeManagers();
	}
	
	public void addRestaurantToManager(Manager resManager) {
		this.managers.addRestaurantToManager(resManager);
	}
}
