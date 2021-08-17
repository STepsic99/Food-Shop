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
import spark.Session;




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
			if(shopperService.IsThereEmptyField(shopper)) return "EMPTYERROR";
			if(userService.usernameExists(shopper.getUsername())) return "USERNAMEERROR";
			shopperService.addShopper(shopper);
			userService.addUser(new User(shopper.getUsername(),shopper.getPassword(),Role.SHOPPER));
			Session session=req.session(true);
			User sessionUser = session.attribute("user");
			if(sessionUser == null) {
				sessionUser = shopper;
				session.attribute("user", sessionUser);
			}
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
			Session session=req.session(true);
			User sessionUser = session.attribute("user");
			if(sessionUser == null) {
				sessionUser = us;
				session.attribute("user", sessionUser);
			}
			return "SUCCESS";
		});
		
		get("/rest/user/logout", (req,res) -> {
			res.type("application/json");
			Session session = req.session(true);
			User user = session.attribute("user");
			if(user != null) {
				session.invalidate();
			}
			return true;
		});
		
		get("/rest/user/getUser", (req,res) -> {
			res.type("application/json");
			Session session = req.session(true);
			User user = session.attribute("user");
		/*	if(user != null) {
				return gg.toJson(user);
			}
			return null;*/
			return gg.toJson(user);
		});
		
		get("/rest/user/isLoggedIn", (req,res) -> {
			res.type("application/json");
			Session session = req.session(true);
			User user = session.attribute("user");
			if(user != null) {
				return true;
			}
			return null;
		});
	}
}
