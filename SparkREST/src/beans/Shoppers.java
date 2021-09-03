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

public class Shoppers {
	
	private ArrayList<Shopper> shopperList=new ArrayList<Shopper>();
	private HashMap<String, Shopper> shoppers = new HashMap<String, Shopper>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").setPrettyPrinting().create();
	
	public Shoppers() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\shoppers.json"));
			shopperList= new ArrayList<Shopper>(Arrays.asList(gson.fromJson(fileReader, Shopper[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Shopper shopper : shopperList) {
			shoppers.put(shopper.username, shopper);
		}
	}
	
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\shoppers.json"));
			gson.toJson(shopperList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	public void addShopper(Shopper shopper) {	
			shopperList.add(shopper);
			shoppers.put(shopper.username,shopper);
			Serialization();
	}
	
	public Shopper getShopper(String username) {
		return shoppers.get(username);
	}
	
	public void deleteShopper(String username) {
		shoppers.remove(username);
		shopperList=new ArrayList<Shopper>(shoppers.values());
		Serialization();
	}
	
	public Boolean isThereEmptyField(Shopper shopper) {
		if(shopper.name==null || shopper.name.trim().isEmpty()) {
			return true;
		}
		else if(shopper.surname==null || shopper.surname.trim().isEmpty()) {
			return true;
		}
		else if(shopper.gender==null || shopper.gender.trim().isEmpty()) {
			return true;
		}
		else if(shopper.username==null || shopper.username.trim().isEmpty()) {
			return true;
		}
		else if(shopper.password==null || shopper.password.trim().isEmpty()) {
			return true;
		}
		else if(shopper.date==null) {
			return true;
		}else {
			return false;
		}
	}
	
	public void editShopper(User user) {
		Shopper shopper = shoppers.get(user.username);
		shopper.name=user.name;
		shopper.surname=user.surname;
		shopper.gender=user.gender;
		shopper.date=user.date;
		shopper.password=user.password;
		Serialization();
	}
	
	public void addToCart(String username,Article article) {
		Shopper shopper = shoppers.get(username);
		shopper.getCart().addArticle(article);
		shopper.getCart().setDiscountPrice(shopper.getCart().getPrice()*((100-shopper.getType().getDiscount())/100.00));
		Serialization();
	}
	
	public void removeFromCart(String username,Article article) {
		Shopper shopper = shoppers.get(username);
		shopper.getCart().removeArticle(article);
		shopper.getCart().setDiscountPrice(shopper.getCart().getPrice()*((100-shopper.getType().getDiscount())/100.00));
		Serialization();
	}
	
	public void changeInCart(String username,Article article) {
		Shopper shopper = shoppers.get(username);
		shopper.getCart().changeArticle(article);
		shopper.getCart().setDiscountPrice(shopper.getCart().getPrice()*((100-shopper.getType().getDiscount())/100.00));
		Serialization();
	}
	
	public void clearCart(Shopper shopper) {
		shopper.getCart().clearCart();
		Serialization();
	}
	
	public void editPoints(Shopper newShopper) {
		Shopper oldShopper = shoppers.get(newShopper.username);
		oldShopper.setPoints(newShopper.getPoints());
		
			if(oldShopper.getPoints()<3000) {
				oldShopper.getType().setName("Bronza");
				oldShopper.getType().setRequiredPoints(3000-oldShopper.getPoints());
				oldShopper.getType().setDiscount(0);
			} else if(oldShopper.getPoints()<4000) {
				oldShopper.getType().setName("Srebro");
				oldShopper.getType().setDiscount(3);
				oldShopper.getType().setRequiredPoints(4000-oldShopper.getPoints());
			} else {
				oldShopper.getType().setName("Zlato");
				oldShopper.getType().setDiscount(5);
				oldShopper.getType().setRequiredPoints(0);
			}
		
		Serialization();
	}
	
	public ArrayList<Shopper> getAll(){
		return shopperList;
	}
}
