package beans;

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

public class Shoppers {
	
	private ArrayList<Shopper> shopperList=new ArrayList<Shopper>();
	private HashMap<String, Shopper> shoppers = new HashMap<String, Shopper>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-mm-dd").create();
	
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
	
	public void addShopper(Shopper shopper) {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\shoppers.json"));
			shopperList.add(shopper);
			gson.toJson(shopperList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public Shopper getShopper(String username) {
		return shoppers.get(username);
	}
}
