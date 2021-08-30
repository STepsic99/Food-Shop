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

public class Managers {
	
	private ArrayList<Manager> managerList=new ArrayList<Manager>();
	private HashMap<String, Manager> managers = new HashMap<String, Manager>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	public Managers() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\managers.json"));
			managerList= new ArrayList<Manager>(Arrays.asList(gson.fromJson(fileReader, Manager[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Manager manager : managerList) {
			managers.put(manager.username, manager);
		}
	}
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\managers.json"));
			gson.toJson(managerList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	public Manager getManager(String username) {
		return managers.get(username);
	}
}
