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

public class Comments {
	
	private ArrayList<Comment> commentList=new ArrayList<Comment>();
	private HashMap<String, Comment> comments = new HashMap<String, Comment>();
	private Gson gson =new GsonBuilder().registerTypeAdapter(Date.class, new DateDeserializer()).setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").setPrettyPrinting().create();

	public Comments() {
		try {
			Reader fileReader = Files.newBufferedReader(Paths.get(".\\comments.json"));
			commentList= new ArrayList<Comment>(Arrays.asList(gson.fromJson(fileReader, Comment[].class)));
			fileReader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(Comment comment : commentList) {
			comments.put(comment.getId(), comment);
		}
	}
	
	public void Serialization() {
		Writer fileWriter;
		try {
			fileWriter = Files.newBufferedWriter(Paths.get(".\\comments.json"));
			gson.toJson(commentList, fileWriter);
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	private String getId() {
		int x=1;
		while(true) {
			if(!comments.containsKey(String.valueOf(x))) break;
			else x++;
		}
		return String.valueOf(x);
	}
	
	public void addComment(Comment comment) {
		comment.setId(getId());
		comment.setStatus(CommentStatus.PENDING);
		commentList.add(comment);
		comments.put(comment.getId(), comment);
		Serialization();
	}
	
	public ArrayList<Comment> getCommentRequests(String restaurantId) {
		ArrayList<Comment>requestedComments=new ArrayList<Comment>();
		for(Comment comment:commentList) {
			if(comment.getRestaurant().getId().equals(restaurantId) && comment.getStatus().equals(CommentStatus.PENDING)) requestedComments.add(comment);
		}
		return requestedComments;
	}
	
	public void changeStatus(Comment comment) {
		Comment oldComment=comments.get(comment.getId());
		oldComment.setStatus(comment.getStatus());
		Serialization();
	}
	
	public ArrayList<Comment> getComments(String restaurantId){
		ArrayList<Comment>restaurantComments=new ArrayList<Comment>();
		for(Comment comment:commentList) {
			if(comment.getRestaurant().getId().equals(restaurantId)) restaurantComments.add(comment);
		}
		return restaurantComments;
	}
	
	public double getAverageGradeForRestaurant(String restaurantId) {
		double retVal=0;
		int cnt=0;
		for(Comment comment:commentList) {
			if(comment.getRestaurant().getId().equals(restaurantId) && comment.getStatus().equals(CommentStatus.APPROVED)) {
				retVal+=comment.getGrade();
				cnt++;
			}
		}
		if(cnt!=0)retVal=retVal/cnt;
		return retVal;
	}
}
