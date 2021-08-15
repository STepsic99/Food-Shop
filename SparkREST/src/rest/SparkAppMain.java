package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import services.RestaurantService;




public class SparkAppMain {

	private static RestaurantService restaurantService =new RestaurantService();
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
			User us = gg.fromJson(req.body(), User.class);
			//shopperService.addShopper(us)
			return "SUCCESS";
		});
		
	}
}
