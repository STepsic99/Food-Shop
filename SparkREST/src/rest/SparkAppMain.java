package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;
import static spark.Spark.put;
import static spark.Spark.delete;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Base64;
import java.io.OutputStream;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Article;
import beans.Cart;
import beans.Comment;
import beans.Deliverer;
import beans.DeliveryRequests;
import beans.Manager;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.Role;
import beans.Shopper;
import beans.User;
import services.AdministratorService;
import services.CommentService;
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
	private static CommentService commentService = new CommentService();
	private static AdministratorService administratorService = new AdministratorService();
	private static Gson gg=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
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
			case ADMINISTRATOR:
				us=administratorService.getAdministrator(us.getUsername());
				break;
			}
			if(us==null) return "BLOCKED";
			Session session=req.session(true);
			User sessionUser = session.attribute("user");
			if(sessionUser == null) {
				sessionUser = us;
				session.attribute("user", sessionUser);
			}else {
				
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
			if(user!=null && user.getRole()!=null && user.getRole().equals(Role.MANAGER)) {
				Manager manager=(Manager)user;
				manager.setRestaurant(restaurantService.getRestaurant(manager.getRestaurant().getId()));
				return gson1.toJson(manager);
			}
		/*	if(user != null) {
				return gg.toJson(user);
			}
			return null;*/
			return gson1.toJson(user);
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
			case MANAGER:
				managerService.editManager(us);
				break;
			case ADMINISTRATOR:
				administratorService.editAdministrator(us);
				break;
			case DELIVERER:
				delivererService.editDeliverer(us);
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
			shopper.getCancelDates().add(new Date());
			shopperService.updateCancellationTime(shopper);
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
		
		put("/rest/order/changeManager", (req,res) -> {
			res.type("application/json");
			Order order = gg.fromJson(req.body(), Order.class);	
			orderService.changeOrder(order);
			return "SUCCESS";
		});
		
		get("/rest/order/getUsersByRestaurant", (req, res) -> {
			res.type("application/json");
			Manager manager=(Manager)getUser(req);
			return gson1.toJson(orderService.getUsersByRestaurant(manager.getRestaurant().getId()));
		});
		
		put("/rest/order/requestOrder", (req,res) -> {
			res.type("application/json");
			Order order = gg.fromJson(req.body(), Order.class);
			order.getRequests().add(getUser(req).getUsername());
			orderService.changeOrder(order);
			return "SUCCESS";
		});
		
		get("/rest/order/requestedOrders", (req, res) -> {
			res.type("application/json");
			Manager manager=(Manager)getUser(req);
			ArrayList<DeliveryRequests>deliveryRequests=new ArrayList<DeliveryRequests>();
			ArrayList<Order>orders=orderService.getRequestedOrdersByRestaurant(manager.getRestaurant().getId());
			for(Order order:orders) {
				for(String username:order.getRequests()) {
					deliveryRequests.add(new DeliveryRequests(delivererService.getDeliverer(username), order.getId()));
				}
			}
			return gson1.toJson(deliveryRequests);
		});
		
		post("/rest/order/approveRequest", (req, res) -> {
			res.type("application/json");
			DeliveryRequests deliveryRequest = gson1.fromJson(req.body(), DeliveryRequests.class);
			Order order=orderService.getOrder(deliveryRequest.getIdOrder());
			order.setStatus(OrderStatus.IN_TRANSPORT);
			order.setRequests(new ArrayList<String>());
			orderService.changeOrder(order);
			delivererService.addOrder(deliveryRequest.getDeliverer().getUsername(), order);
			return "OK";
		});
		
		post("/rest/order/refuseRequest", (req, res) -> {
			res.type("application/json");
			DeliveryRequests deliveryRequest = gg.fromJson(req.body(), DeliveryRequests.class);
			Order order=orderService.getOrder(deliveryRequest.getIdOrder());
			order.setRequests(new ArrayList<String>());
			orderService.changeOrder(order);
			return "OK";
		});
		
		put("/rest/order/changeDeliverer", (req,res) -> {
			res.type("application/json");
			Order order = gg.fromJson(req.body(), Order.class);	
			orderService.changeOrder(order);
			delivererService.changeOrder(getUser(req).getUsername(), order);
			return "SUCCESS";
		});
		
		get("/rest/restaurant/canComment/:id", (req, res) -> {
			
			String id = req.params("id");
			return orderService.canUserComment(getUser(req).getUsername(), id);
		});
		
		post("/rest/comment/addComment", (req, res) -> {
			res.type("application/json");
			Comment comment = gg.fromJson(req.body(), Comment.class);
			comment.setShopper((Shopper)getUser(req));
			commentService.addComment(comment);
			return "OK";
		});
		
		get("/rest/comment/getCommentRequests", (req, res) -> {
			res.type("application/json");
			Manager manager=(Manager)getUser(req);
			return gson1.toJson(commentService.getCommentRequests(manager.getRestaurant().getId()));
		});
		
		put("/rest/comment/changeStatus", (req,res) -> {
			res.type("application/json");
			Comment comment = gg.fromJson(req.body(), Comment.class);
			commentService.changeStatus(comment);
			return "SUCCESS";
		});
		
		get("/rest/restaurant/comments/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params("id");
			return gson1.toJson(commentService.getComments(id));
		});
		
		get("/rest/users/registredUsers", (req, res) -> {
			res.type("application/json");
			ArrayList<User>registeredUsers=new ArrayList<User>();
			registeredUsers.addAll(shopperService.getAll());
			registeredUsers.addAll(managerService.getAll());
			registeredUsers.addAll(delivererService.getAll());
			return gson1.toJson(registeredUsers);
		});
		
		get("/rest/users/getShadyUsers", (req, res) -> {
			res.type("application/json");
			return gson1.toJson(shopperService.getShadyShoppers());
		});
		
		post("/rest/user/block", (req, res) -> {
			res.type("application/json");
			User us = gg.fromJson(req.body(), User.class);
			switch(us.getRole()) {
			case SHOPPER:
				shopperService.blockShopper(us.getUsername());
				break;
			case DELIVERER:
				delivererService.blockDeliverer(us.getUsername());
				break;
			case MANAGER:
				managerService.blockManager(us.getUsername());
				break;
			}
			return "OK";
		});
		
		post("rest/user/addByAdmin", (req, res) -> {
			res.type("application/json");
			User us = gg.fromJson(req.body(), User.class);
			if(userService.usernameExists(us.getUsername())) return "USERNAMEERROR";
			switch(us.getRole()) {
			case DELIVERER:
				delivererService.addDeliverer(new Deliverer(us));
				break;
			case MANAGER:
				managerService.addManager(new Manager(us));
				break;
			default:
					break;
			}
			userService.addUser(new User(us.getUsername(),us.getPassword(),us.getRole()));
			
			return "SUCCESS";
		});
		
		get("/rest/user/freeManagers", (req, res) -> {
			res.type("application/json");
			return gson1.toJson(managerService.getFreeManagers());
		});
		
		post("rest/restaurant/add", (req, res) -> {
			res.type("application/json");
			
			Restaurant restaurant=gg.fromJson(req.body(),Restaurant.class);
			restaurant.setId(generateRestaurantID());
			restaurant.setStatus(RestaurantStatus.OPEN);
			
			String parts[] = restaurant.getImagePath().split(",");
			String path = "./static/resources/res" + restaurant.getId()+".jpg";
			byte[] data = Base64.getDecoder().decode(parts[1]);
			try (OutputStream stream = new FileOutputStream(path)) {
			    stream.write(data);
			}
			
			restaurant.setImagePath("./resources/res" + restaurant.getId()+".jpg");
			restaurantService.addRestaurant(restaurant);
			return "SUCCESS";
		});
		
		get("/rest/manager/resId", (req, res) -> {
			res.type("application/json");
			String s=generateRestaurantID();
			return s;
		});
		
		post("rest/manager/addRestaurant", (req, res) -> {
			res.type("application/json");
			Manager manager=gson1.fromJson(req.body(), Manager.class);
			managerService.addRestaurantToManager(manager);
			return "SUCCESS";
		});
		
		post("rest/manager/addManagerWithRestaurant", (req, res) -> {
			res.type("application/json");
			Manager manager=gg.fromJson(req.body(), Manager.class);
			manager.setRole(Role.MANAGER);
			manager.setBlocked(false);
			if(userService.usernameExists(manager.getUsername())) return "USERNAMEERROR";
				managerService.addManager(manager);
			
			userService.addUser(new User(manager.getUsername(),manager.getPassword(),manager.getRole()));
			return "SUCCESS";
		});
		
		post("rest/manager/addArticle", (req, res) -> {
			res.type("application/json");
			Article article=gson1.fromJson(req.body(), Article.class);
			Manager manager=(Manager)getUser(req);
			Restaurant restaurant=restaurantService.getRestaurant(manager.getRestaurant().getId());
			
			String parts[] = article.getImage().split(",");
			String path = "./static/resources/res" + manager.getRestaurant().getId()+article.getName()+".jpg";
			byte[] data = Base64.getDecoder().decode(parts[1]);
			try (OutputStream stream = new FileOutputStream(path)) {
			    stream.write(data);
			}
			
			article.setRestaurant(new Restaurant(restaurant.getId(),restaurant.getName(),restaurant.getType()));
			article.setCounter(1);
			article.setImage("./resources/res" + manager.getRestaurant().getId()+article.getName()+".jpg");
			
			
			
			restaurantService.addArticle(article, manager.getRestaurant().getId());
			return "SUCCESS";
		});
		
		post("rest/manager/changeArticle", (req, res) -> {
			res.type("application/json");
			Article article=gson1.fromJson(req.body(), Article.class);
			Manager manager=(Manager)getUser(req);
			Restaurant restaurant=restaurantService.getRestaurant(manager.getRestaurant().getId());
			
			String parts[] = article.getImage().split(",");
			if(parts.length>1) {
			String path = "./static/resources/res" + manager.getRestaurant().getId()+article.getName()+".jpg";
			byte[] data = Base64.getDecoder().decode(parts[1]);
			try (OutputStream stream = new FileOutputStream(path)) {
			    stream.write(data);
			}
			article.setImage("./resources/res" + manager.getRestaurant().getId()+article.getName()+".jpg");
			}
			article.setRestaurant(new Restaurant(restaurant.getId(),restaurant.getName(),restaurant.getType()));
			article.setCounter(1);
			
			restaurantService.changeArticle(article, manager.getRestaurant().getId());
			return "SUCCESS";
		});
		
	}
	
	private static String generateRestaurantID() {
		String id="1";
		boolean con=true;
		ArrayList<Restaurant>restaurants=(ArrayList<Restaurant>) restaurantService.getRestaurants();
		while(con) {
			con=false;
		for(int i=0;i<restaurants.size();i++) {
			if(restaurants.get(i).getId().equals(id)) {
				int x=Integer.parseInt(id);
				id=String.valueOf(++x);
				con=true;
				break;
			}
		}
		}
		return id;
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
