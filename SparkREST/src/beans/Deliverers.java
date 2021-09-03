package beans;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Deliverers {
	
	private ArrayList<Deliverer> delivererList=new ArrayList<Deliverer>();
	private HashMap<String, Deliverer> deliverers = new HashMap<String, Deliverer>();
	private Gson gson =new GsonBuilder().registerTypeAdapter(Date.class, new DateDeserializer()).setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").setPrettyPrinting().create();
	
	public Deliverers() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\deliverers.json"));
			delivererList= new ArrayList<Deliverer>(Arrays.asList(gson.fromJson(fileReader, Deliverer[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Deliverer deliverer : delivererList) {
			deliverers.put(deliverer.username, deliverer);
		}
	}
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\deliverers.json"));
			gson.toJson(delivererList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	public Deliverer getDeliverer(String username) {
		Deliverer deliverer=deliverers.get(username);
		if(deliverer.isBlocked()) return null;
		return deliverer;
	}
	
	public void addOrder(String username, Order order) {
		Deliverer deliverer=deliverers.get(username);
		deliverer.getOrders().add(order);
		Serialization();
	}
	
	public void changeOrder(String username,Order newOrder) {
		Deliverer deliverer=deliverers.get(username);
		for(int i=0;i<deliverer.getOrders().size();i++) {
			if(deliverer.getOrders().get(i).getId().equals(newOrder.getId())) {
				deliverer.getOrders().get(i).setStatus(OrderStatus.DELIVERED);
				break;	
			}
		}
		Serialization();
	}
	
	public ArrayList<Deliverer> getAll(){
		return delivererList;
	}
	
	public void blockDeliverer(String username) {
		Deliverer deliverer=deliverers.get(username);
		deliverer.setBlocked(true);
		Serialization();
	}
	
	public void editDeliverer(User user) {
		Deliverer deliverer = deliverers.get(user.username);
		deliverer.name=user.name;
		deliverer.surname=user.surname;
		deliverer.gender=user.gender;
		deliverer.date=user.date;
		deliverer.password=user.password;
		Serialization();
	}
	
	public void addDeliverer(Deliverer deliverer) {
		delivererList.add(deliverer);
		deliverers.put(deliverer.username,deliverer);
		Serialization();
	}
}
