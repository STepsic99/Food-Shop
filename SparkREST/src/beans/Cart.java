package beans;

import java.util.ArrayList;

public class Cart {
	private ArrayList<Article>articles;
	private User user;
	private double price;
	
	public Cart() {
	
	}

	public Cart(ArrayList<Article> articles, User user, double price) {
		super();
		this.articles = articles;
		this.user = user;
		this.price = price;
	}

	public ArrayList<Article> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	public void addArticle(Article article) {
		for(Article a:articles) {
			if(a.getName().equals(article.getName()) && a.getRestaurant().getId().equals(article.getRestaurant().getId())) {
				price+=article.getPrice()*article.getCounter();
				a.setCounter(a.getCounter()+article.getCounter());
				return;
			}
		}
		articles.add(article);
		price+=article.getPrice()*article.getCounter();
	}
	
	public void removeArticle(Article article) {
		for(Article a:articles) {
			if(a.getName().equals(article.getName()) && a.getRestaurant().getId().equals(article.getRestaurant().getId())) {
				articles.remove(a);
				price-=a.getPrice()*a.getCounter();
				break;
			}
		}
	}
	
	public void changeArticle(Article article) {
		int i=0;
		for(Article a:articles) {
			if(a.getName().equals(article.getName()) && a.getRestaurant().getId().equals(article.getRestaurant().getId())) {
				price-=articles.get(i).getPrice()*articles.get(i).getCounter();
				articles.remove(i);
				articles.add(i, article);
				price+=article.getPrice()*article.getCounter();
				break;
			}
			i++;
		}
	}
}
