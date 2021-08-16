package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Role;
import beans.Shopper;
import beans.User;
import services.RestaurantService;
import services.ShopperService;
import services.UserService;




public class SparkAppMain {

	private static RestaurantService restaurantService =new RestaurantService();
	private static UserService userService =new UserService();
	private static ShopperService shopperService =new ShopperService();
	private static Gson gg=new GsonBuilder().setDateFormat("yyyy-mm-dd").create();
	
	
	public static void main(String[] args) throws Exception {
		port(8080);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("/rest/restaurants/getJustRestaurants", (req, res) -> {
			res.type("application/json");
			return gg.toJson(restaurantService.getRestaurants());
		});
		
		post("rest/user/add", (req, res) -> {
			res.type("application/json");
			Shopper shopper = gg.fromJson(req.body(), Shopper.class);
			shopperService.addShopper(shopper);
			userService.addUser(new User(shopper.getUsername(),shopper.getPassword(),Role.SHOPPER));
			return "SUCCESS";
		});
		
		
		post("rest/user/login", (req, res) -> {
			res.type("application/json");
			User us = gg.fromJson(req.body(), User.class);
			us=userService.userExists(us.getUsername(), us.getPassword());
			if(us==null) return "ERROR";
			switch(us.getRole()) {
			case SHOPPER:
				us=shopperService.getShopper(us.getUsername());
				break;
			}
			return "SUCCESS";
		});
		
		
	}
}
