package services;

import java.util.ArrayList;

import beans.Manager;
import beans.Managers;

public class ManagerService {
	private Managers managers=new Managers();
	
	public Manager getManager(String username) {
		return this.managers.getManager(username);
	}
	
	public ArrayList<Manager> getAll(){
		return this.managers.getAll();
	}
}
