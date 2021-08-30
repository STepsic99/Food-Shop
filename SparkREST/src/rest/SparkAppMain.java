package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;
import static spark.Spark.put;
import static spark.Spark.delete;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Article;
import beans.Cart;
import beans.Manager;
import beans.Order;
import beans.Role;
import beans.Shopper;
import beans.User;
import services.DelivererService;
import services.ManagerService;
import services.OrderService;
import services.RestaurantService;
import services.ShopperService;
import services.UserService;
import spark.Request;
import spark.Session;




public class SparkAppMain {

	private static RestaurantService restaurantService =new RestaurantService();
	private static UserService userService =new UserService();
	private static ShopperService shopperService =new ShopperService();
	private static OrderService orderService = new OrderService();
	private static DelivererService delivererService = new DelivererService();
	private static ManagerService managerService = new ManagerService();
	private static Gson gg=new GsonBuilder().setDateFormat("yyyy-mm-dd").create();
	private static Gson gson1=new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").create();
	
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
			if(shopperService.isThereEmptyField(shopper)) return "EMPTYERROR";
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
			case DELIVERER:
				us=delivererService.getDeliverer(us.getUsername());
				break;
			case MANAGER:
				us=managerService.getManager(us.getUsername());
				break;
			}
			Session session=req.session(true);
			User sessionUser = session.attribute("user");
			if(sessionUser == null) {
				sessionUser = us;
				session.attribute("user", sessionUser);
			}
			if(us.getRole()==Role.SHOPPER) {
			Cart sessionCart = session.attribute("cart"); 
			if (sessionCart == null) {
				sessionCart = new Cart();
				sessionCart.setUser(new User(us.getUsername()));
				session.attribute("cart", sessionCart);
			}
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
		
		put("/rest/user/change", (req,res) -> {
			res.type("application/json");
			User us = gg.fromJson(req.body(), User.class);
			switch(us.getRole()) {
			case SHOPPER:
				shopperService.editShopper(us);
				break;
			}
			return "SUCCESS";
		});
		
		post("rest/user/passwordChange", (req, res) -> {
			res.type("application/json");
			User us = gg.fromJson(req.body(), User.class);
			userService.editUser(us);
			switch(us.getRole()) {
			case SHOPPER:
				shopperService.editShopper(us);
				break;
			}
			return "Lozinka uspešno promenjena";
		});
		
		
		get("/rest/restaurant/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			return gg.toJson(restaurantService.getRestaurant(id));
					});
		
		
		get("/rest/user/getCart", (req,res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Cart cart = session.attribute("cart");
		/*	if(user != null) {
				return gg.toJson(user);
			}
			return null;*/
			return gg.toJson(cart);
		});
		
		
		post("/rest/cart/addArticle", (req, res) -> {
			res.type("application/json");
			Article article = gg.fromJson(req.body(), Article.class);
			shopperService.addToCart(getUser(req).getUsername(), article);
			return "OK";
		});
		
		post("/rest/cart/removeArticle", (req, res) -> {
			res.type("application/json");
			Article article = gg.fromJson(req.body(), Article.class);
			shopperService.removeFromCart(getUser(req).getUsername(), article);
			return "OK";
		});
		
		post("/rest/cart/changeArticle", (req, res) -> {
			res.type("application/json");
			Article article = gg.fromJson(req.body(), Article.class);
			shopperService.changeInCart(getUser(req).getUsername(), article);
			return "OK";
		});
		
		post("/rest/order/makeOrder", (req, res) -> {
			res.type("application/json");
			Cart cart = gg.fromJson(req.body(), Cart.class);
			HashMap<String,ArrayList<Article>>orderMap=new HashMap<String, ArrayList<Article>>();
			if(cart.getArticles().isEmpty()) return "OK";
			for(Article a:cart.getArticles()) {
				if(orderMap.containsKey(a.getRestaurant().getId())) {
					orderMap.get(a.getRestaurant().getId()).add(a);
				}else {
					ArrayList<Article>auxiliaryList=new ArrayList<Article>();
					auxiliaryList.add(a);
					orderMap.put(a.getRestaurant().getId(),auxiliaryList);
				}
			}
			Shopper shopper=shopperService.getShopper(cart.getUser().getUsername());
			double pointsToBeAdded=orderService.createOrders(orderMap, shopper);
			shopper.setPoints(shopper.getPoints()+pointsToBeAdded);
			shopperService.editPoints(shopper);
			shopperService.clearCart(shopper);
			return "OK";
		});
		
		get("/rest/order/getOrdersByUser", (req, res) -> {
			res.type("application/json");
			return gson1.toJson(orderService.getOrdersByUser(getUser(req).getUsername()));
		});
		
		put("/rest/order/change", (req,res) -> {
			res.type("application/json");
			Order order = gg.fromJson(req.body(), Order.class);
			Shopper shopper=shopperService.getShopper(order.getShopper().getUsername());
			orderService.changeOrder(order);
			shopper.setPoints(shopper.getPoints()-(order.getPrice()/1000*133*4));
			shopperService.editPoints(shopper);
			return "SUCCESS";
		});
		
		get("/rest/order/getUnassignedOrders", (req, res) -> {
			res.type("application/json");
			return gson1.toJson(orderService.getUnassignedOrders());
		});
		
		get("/rest/order/getOrdersByRestaurant", (req, res) -> {
			res.type("application/json");
			Manager manager=(Manager)getUser(req);
			return gson1.toJson(orderService.getOrdersByRestaurant(manager.getRestaurant().getId()));
		});
		
	}
	
	private static Cart getCart(Request req) {
		Session session = req.session(true);
		Cart sessionCart = session.attribute("cart"); 
		if (sessionCart == null) {
			sessionCart = new Cart();
			sessionCart.setUser(new User(getUser(req).getUsername()));
			session.attribute("cart", sessionCart);
		}
		return sessionCart;
	}
	
	private static User getUser(Request req) {
		Session session = req.session(true);
		User user = session.attribute("user");
		if (user == null) {
			user = new User();
			session.attribute("user", user);
		}
		return user;
	}
}
