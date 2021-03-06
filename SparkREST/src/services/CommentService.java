package services;

import java.util.ArrayList;

import beans.Comment;
import beans.Comments;

public class CommentService {
	
	private Comments comments=new Comments();
	
	public void addComment(Comment comment) {
		this.comments.addComment(comment);
	}
	
	public ArrayList<Comment> getCommentRequests(String restaurantId){
		return this.comments.getCommentRequests(restaurantId);
	}
	
	public void changeStatus(Comment comment) {
		this.comments.changeStatus(comment);
	}
	
	public ArrayList<Comment> getComments(String restaurantId){
		return this.comments.getComments(restaurantId);
	}
	
	public double getAverageGradeForRestaurant(String restaurantId) {
		return this.comments.getAverageGradeForRestaurant(restaurantId);
	}
}
