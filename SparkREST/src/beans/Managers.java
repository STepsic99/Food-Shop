package beans;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Managers {
	
	private ArrayList<Manager> managerList=new ArrayList<Manager>();
	private HashMap<String, Manager> managers = new HashMap<String, Manager>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").setPrettyPrinting().create();
	
	public Managers() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\managers.json"));
			managerList= new ArrayList<Manager>(Arrays.asList(gson.fromJson(fileReader, Manager[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Manager manager : managerList) {
			managers.put(manager.username, manager);
		}
	}
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\managers.json"));
			gson.toJson(managerList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	public Manager getManager(String username) {
		Manager manager=managers.get(username);
		if(manager.isBlocked()) return null;
		return manager;
	}
	
	public Manager getManagerByRestaurant(String id) {
		for(Manager manager:managerList) {
			if(manager.getRestaurant().getId().equals(id)) return manager;
		}
		return null;
	}
	
	public ArrayList<Manager> getAll(){
		return managerList;
	}
	
	public void blockManager(String username) {
		Manager manager=managers.get(username);
		manager.setBlocked(true);
		Serialization();
	}
	
	public void editManager(User user) {
		Manager manager = managers.get(user.username);
		manager.name=user.name;
		manager.surname=user.surname;
		manager.gender=user.gender;
		manager.date=user.date;
		manager.password=user.password;
		Serialization();
	}
	
	public void addManager(Manager manager) {
		managerList.add(manager);
		managers.put(manager.username,manager);
		Serialization();
	}
	
	public ArrayList<Manager> getFreeManagers(){
		ArrayList<Manager>retVal=new ArrayList<Manager>();
		for(Manager manager : managerList) {
			if(manager.getRestaurant()==null) retVal.add(manager);
		}
		return retVal;
	}
	
	public void addRestaurantToManager(Manager resManager) {
		Manager manager=managers.get(resManager.username);
		manager.setRestaurant(new Restaurant(resManager.getRestaurant().getId()));
		Serialization();
	}
	
}
