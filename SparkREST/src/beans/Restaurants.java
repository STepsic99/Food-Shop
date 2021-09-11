package beans;

import java.io.File;
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

public class Restaurants {
	
	private ArrayList<Restaurant> restaurantList=new ArrayList<Restaurant>();
	private HashMap<String, Restaurant> restaurants = new HashMap<String, Restaurant>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	public Restaurants() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\restaurants.json"));
			restaurantList= new ArrayList<Restaurant>(Arrays.asList(gson.fromJson(fileReader, Restaurant[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Restaurant restaurant : restaurantList) {
			restaurants.put(restaurant.getId(), restaurant);
		}
	}
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\restaurants.json"));
			gson.toJson(restaurantList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	public ArrayList<Restaurant> getRestaurantList() {
		return restaurantList;
	}
	
	public Restaurant getRestaurant(String id) {
		return restaurants.get(id);
	}
	
	public void addRestaurant(Restaurant restaurant) {
		restaurantList.add(restaurant);
		restaurants.put(restaurant.getId(),restaurant);
		Serialization();
	}
	
	public void addArticle(Article article,String id) {
		Restaurant restaurant=restaurants.get(id);
		restaurant.getArticles().add(article);
		Serialization();
	}
	
	public void changeArticle(Article article,String id) {
		Restaurant restaurant=restaurants.get(id);
		//for(Article a: restaurant.getArticles()) {
		//	if(a.getName().equals(article.getName())) {
		//		a=article;
		//	}
	//	}
		for(int i=0;i<restaurant.getArticles().size();i++) {
			if(restaurant.getArticles().get(i).getName().equals(article.getName())) {
				restaurant.getArticles().add(i,article);
				restaurant.getArticles().remove(i+1);
				break;
			}
		}
		Serialization();
	}
	
	public void updateGrade(String id,double newGrade) {
		Restaurant restaurant=restaurants.get(id);
		restaurant.setAverageGrade(newGrade);
		Serialization();
	}
}
