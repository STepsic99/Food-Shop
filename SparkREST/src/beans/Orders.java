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
import java.util.Map;
import java.util.Random;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Orders {

	private ArrayList<Order> orderList=new ArrayList<Order>();
	private HashMap<String, Order> orders = new HashMap<String, Order>();
	private Gson gson =new GsonBuilder() .registerTypeAdapter(Date.class, new DateDeserializer()).setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").setPrettyPrinting().create();
	
	
	public Orders() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\orders.json"));
			orderList= new ArrayList<Order>(Arrays.asList(gson.fromJson(fileReader, Order[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Order order : orderList) {
			orders.put(order.getId(), order);
		}
	}
	
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\orders.json"));
			gson.toJson(orderList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	private String getId() {
		char[] charsArray = "abcdefghijklmnopqrstuvwxyz0123456789".toCharArray();
		StringBuilder sb = new StringBuilder(10);
		while(0==0) {
		Random random = new Random();
		for (int i = 0; i < 10; i++) {
		    char c = charsArray[random.nextInt(charsArray.length)];
		    sb.append(c);
		}
		if(!orders.containsKey(sb.toString())) break;
		}
		return sb.toString();
	}
	
	private double calculatePrice(ArrayList<Article>articles) {
		double price=0;
		for(Article a:articles) {
			price+=a.getPrice()*a.getCounter();
		}
		return price;
	}
	
	public double createOrders(HashMap<String,ArrayList<Article>>orderMap, Shopper shopper) {
		double totalPoints=0;
		 for (Map.Entry element : orderMap.entrySet()) {
			 Order order=new Order();
	            String idRestaurant = (String)element.getKey();
	             order.setId(getId());
	             order.setArticles((ArrayList<Article>)element.getValue());
	             order.setRestaurant(new Restaurant(idRestaurant,order.getArticles().get(0).getRestaurant().getName()));
	             order.setPrice(calculatePrice(order.getArticles()));
	             order.setDateTime(new Date());
	             order.setShopper(new Shopper(shopper.getUsername(),shopper.getName(),shopper.getSurname()));
	             order.setStatus(OrderStatus.PROCESSING);
	            orderList.add(order);
	            orders.put(order.getId(), order);
	            order.setPrice(order.getPrice()*((100-shopper.getType().getDiscount())/100.00));
	            totalPoints+=(order.getPrice()/1000*133);
	        }
		 Serialization();
		 return totalPoints;
	}
	
	public ArrayList<Order> getOrdersByUser(String username){
		ArrayList<Order>userOrders=new ArrayList<Order>();
		for(Order order : orderList) {
			if(order.getShopper().getUsername().equals(username)) {
				userOrders.add(order);
			}
		}
		return userOrders;
	}
	
	public void changeOrder(Order newOrder) {
		Order oldOrder=orders.get(newOrder.getId());
		oldOrder.setStatus(newOrder.getStatus());
		Serialization();
	}
	
	public ArrayList<Order> getUnassignedOrders(){
		ArrayList<Order>userOrders=new ArrayList<Order>();
		for(Order order : orderList) {
			if(order.getStatus().equals(OrderStatus.WAITING_FOR_DELIVERER)) {
				userOrders.add(order);
			}
		}
		return userOrders;
	}
}
