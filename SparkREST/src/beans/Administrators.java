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

public class Administrators {

	private ArrayList<Administrator> administratorList=new ArrayList<Administrator>();
	private HashMap<String, Administrator> administrators = new HashMap<String, Administrator>();
	private Gson gson =new GsonBuilder().registerTypeAdapter(Date.class, new DateDeserializer()).setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").setPrettyPrinting().create();

	public Administrators() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\administrators.json"));
			administratorList= new ArrayList<Administrator>(Arrays.asList(gson.fromJson(fileReader, Administrator[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Administrator administrator : administratorList) {
			administrators.put(administrator.username, administrator);
		}
	}
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\administrators.json"));
			gson.toJson(administratorList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	public Administrator getAdministrator(String username) {
		return administrators.get(username);
	}
	
	public void editAdministrator(User user) {
		Administrator administrator = administrators.get(user.username);
		administrator.name=user.name;
		administrator.surname=user.surname;
		administrator.gender=user.gender;
		administrator.date=user.date;
		administrator.password=user.password;
		Serialization();
	}
	
}
