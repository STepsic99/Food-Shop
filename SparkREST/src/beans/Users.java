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

public class Users {
	private HashMap<String, User> users = new HashMap<String, User>();
	private ArrayList<User> userList=new ArrayList<User>();
	private Gson gson =new GsonBuilder().setDateFormat("yyyy-mm-dd").create();
	
	public Users() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\users.json"));
			userList= new ArrayList<User>(Arrays.asList(gson.fromJson(fileReader, User[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(User user : userList) {
			users.put(user.username, user);
		}
	}
	
	public User userExists(String username, String password) {
		if(users.containsKey(username) && users.get(username).password.equals(password)) {
			return users.get(username);
		} else {
			return null;
		}
	}
	
	public void addUser(User newUser) {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\users.json"));
			userList.add(newUser);
			users.put(newUser.username, newUser);
			gson.toJson(userList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public Boolean usernameExists(String username) {
		if(users.containsKey(username)) return true;
		else return false;
	}
}
