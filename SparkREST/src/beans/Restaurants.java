package beans;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Restaurants {
	
	private ArrayList<Restaurant> restaurantList=new ArrayList<Restaurant>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-mm-dd").create();
	
	public Restaurants() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\restaurants.json"));
			restaurantList= new ArrayList<Restaurant>(Arrays.asList(gson.fromJson(fileReader, Restaurant[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public ArrayList<Restaurant> getRestaurantList() {
		return restaurantList;
	}
}
