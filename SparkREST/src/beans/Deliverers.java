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

public class Deliverers {
	
	private ArrayList<Deliverer> delivererList=new ArrayList<Deliverer>();
	private HashMap<String, Deliverer> deliverers = new HashMap<String, Deliverer>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	public Deliverers() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\deliverers.json"));
			delivererList= new ArrayList<Deliverer>(Arrays.asList(gson.fromJson(fileReader, Deliverer[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Deliverer deliverer : delivererList) {
			deliverers.put(deliverer.username, deliverer);
		}
	}
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\deliverers.json"));
			gson.toJson(delivererList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	public Deliverer getDeliverer(String username) {
		return deliverers.get(username);
	}
}
