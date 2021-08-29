package beans;

import java.util.ArrayList;

public class Cart {
	private ArrayList<Article>articles;
	private User user;
	private double price;
	private int numberOfItems;
	private double discountPrice;
	
	public Cart() {
	
	}

	public Cart(ArrayList<Article> articles, User user, double price, int numberOfItems, double discountPrice) {
		super();
		this.articles = articles;
		this.user = user;
		this.price = price;
		this.numberOfItems = numberOfItems;
		this.discountPrice = discountPrice;
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
	
	
	public int getNumberOfItems() {
		return numberOfItems;
	}

	public void setNumberOfItems(int numberOfItems) {
		this.numberOfItems = numberOfItems;
	}
	

	public double getDiscountPrice() {
		return discountPrice;
	}

	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}

	public void addArticle(Article article) {
		for(Article a:articles) {
			if(a.getName().equals(article.getName()) && a.getRestaurant().getId().equals(article.getRestaurant().getId())) {
				price+=article.getPrice()*article.getCounter();
				numberOfItems+=article.getCounter();
				a.setCounter(a.getCounter()+article.getCounter());
				return;
			}
		}
		articles.add(article);
		price+=article.getPrice()*article.getCounter();
		numberOfItems+=article.getCounter();
	}
	
	public void removeArticle(Article article) {
		for(Article a:articles) {
			if(a.getName().equals(article.getName()) && a.getRestaurant().getId().equals(article.getRestaurant().getId())) {
				articles.remove(a);
				numberOfItems-=a.getCounter();
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
				numberOfItems-=articles.get(i).getCounter();
				articles.remove(i);
				articles.add(i, article);
				price+=article.getPrice()*article.getCounter();
				numberOfItems+=article.getCounter();
				break;
			}
			i++;
		}
	}
	
	public void clearCart() {
		articles.clear();
		numberOfItems=0;
		price=0.0;
		discountPrice=0.0;
	}
}
